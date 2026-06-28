# Zohomail Integration Implementation Plan

## Overview
This plan outlines the integration of Zohomail SMTP for email notifications in the Chada Digital admin panel.

## Architecture Diagram

```mermaid
graph TD
    A[Contact Form] --> B[/api/contact]
    B --> C[Validate Form Data]
    C --> D{Valid?}
    D -->|No| E[Return Error]
    D -->|Yes| F[Read Settings]
    F --> G[Create Zohomail Transporter]
    G --> H[Send Email]
    H --> I{Email Sent?}
    I -->|Yes| J[Return Success]
    I -->|No| K[Log Error & Continue]
    J --> L[Store Submission]
    
    M[Admin Settings] --> N[/api/admin/settings]
    N --> O[Update Email Config]
    
    subgraph "Zohomail Integration"
        G
        H
    end
```

## Environment Variables

### Required Variables
```bash
# Zohomail SMTP Configuration
ZOHO_MAIL_HOST=smtp.zoho.com
ZOHO_MAIL_PORT=587
ZOHO_MAIL_USER=your-email@yourdomain.com
ZOHO_MAIL_PASS=your-zoho-password-or-app-password

# Alternative: Zohomail API (if using API instead of SMTP)
ZOHO_MAIL_API_KEY=your-zoho-api-key
ZOHO_MAIL_FROM_EMAIL=your-email@yourdomain.com

# Admin Configuration
ADMIN_EMAIL=hello@chadadigital.com
ADMIN_PASSWORD_HASH=bcrypt-hash-of-admin-password
SESSION_SECRET=your-session-secret
```

## Implementation Steps

### Step 1: Update `src/lib/auth.ts`
Add Zohomail configuration helper functions:

```typescript
// src/lib/auth.ts

// Zohomail SMTP configuration
export function getZohoMailConfig() {
  return {
    host: process.env.ZOHO_MAIL_HOST || 'smtp.zoho.com',
    port: parseInt(process.env.ZOHO_MAIL_PORT || '587'),
    user: process.env.ZOHO_MAIL_USER || '',
    pass: process.env.ZOHO_MAIL_PASS || '',
    from: process.env.ZOHO_MAIL_FROM_EMAIL || process.env.ZOHO_MAIL_USER || '',
  };
}

// Check if Zohomail is configured
export function isZohoMailConfigured(): boolean {
  const config = getZohoMailConfig();
  return !!(config.user && config.pass);
}
```

### Step 2: Update `src/pages/api/admin/settings.ts`
Add Zohomail-specific settings to the schema:

```typescript
// Add to updateSchema in settings.ts
const updateSchema = z.object({
  // ... existing fields ...
  emailProvider: z.enum(['smtp', 'zoho-api']).optional(),
  zohoMail: z.object({
    host: z.string().optional(),
    port: z.number().int().optional(),
    user: z.string().email().optional(),
    fromEmail: z.string().email().optional(),
  }).optional(),
});
```

### Step 3: Update `src/pages/api/contact.ts`
Replace the email transporter with Zohomail-specific implementation:

```typescript
// src/pages/api/contact.ts

// Zohomail-specific transporter
function createZohoMailTransporter() {
  const config = getZohoMailConfig();
  
  if (!config.user || !config.pass) {
    console.warn('Zohomail credentials not configured. Email sending will be skipped.');
    return null;
  }
  
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465, // true for 465, false for other ports
    auth: {
      user: config.user,
      pass: config.pass,
    },
    // Zohomail-specific TLS options
    tls: {
      rejectUnauthorized: true,
    },
  });
}

// Enhanced error handling for Zohomail
async function sendZohoMail(transporter: any, mailOptions: any): Promise<{ success: boolean; error?: string }> {
  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error: any) {
    // Zohomail-specific error handling
    if (error.code === 'EAUTH') {
      console.error('Zohomail authentication failed. Check credentials.');
      return { success: false, error: 'Authentication failed' };
    }
    if (error.code === 'EENVELOPE') {
      console.error('Invalid email address in Zohomail request.');
      return { success: false, error: 'Invalid email address' };
    }
    if (error.responseCode === 421) {
      console.error('Zohomail rate limit exceeded.');
      return { success: false, error: 'Rate limit exceeded' };
    }
    console.error('Zohomail send error:', error);
    return { success: false, error: 'Email sending failed' };
  }
}
```

### Step 4: Update `src/pages/api/admin/submissions.ts`
Add email notification functionality for admin actions:

```typescript
// src/pages/api/admin/submissions.ts

// Send notification for new submission
async function notifyNewSubmission(submission: ContactSubmission): Promise<void> {
  const settings = await readSettings();
  
  if (!settings.notifications?.emailOnNewSubmission) {
    return;
  }
  
  const transporter = createZohoMailTransporter();
  if (!transporter) return;
  
  const config = getZohoMailConfig();
  
  await sendZohoMail(transporter, {
    from: config.from,
    to: settings.destinationEmail,
    subject: `New Contact Form Submission: ${submission.name}`,
    html: generateEmailHTML({
      name: submission.name,
      email: submission.email,
      message: submission.message,
    }),
    replyTo: submission.email,
  });
}
```

### Step 5: Update `src/data/settings.json`
Add Zohomail configuration to default settings:

```json
{
  "destinationEmail": "hello@chadadigital.com",
  "emailProvider": "smtp",
  "zohoMail": {
    "host": "smtp.zoho.com",
    "port": 587,
    "user": "",
    "fromEmail": ""
  },
  "validationRules": {
    "name": { "min": 2, "max": 100, "required": true },
    "email": { "min": 5, "max": 255, "required": true },
    "message": { "min": 10, "max": 2000, "required": true }
  },
  "notifications": {
    "emailOnNewSubmission": true,
    "dailySummary": false
  }
}
```

### Step 6: Update `src/types/index.ts`
Add Zohomail configuration types:

```typescript
// src/types/index.ts

export interface ZohoMailConfig {
  host: string;
  port: number;
  user: string;
  fromEmail: string;
}

export interface AdminSettings {
  destinationEmail: string;
  emailProvider: 'smtp' | 'zoho-api';
  zohoMail: ZohoMailConfig;
  validationRules: ValidationRules;
  notifications: NotificationPreferences;
}
```

### Step 7: Update `src/pages/admin/settings.astro`
Add Zohomail configuration form fields:

```astro
<!-- Add to settings form -->
<div class="space-y-4">
  <h3 class="text-lg font-semibold">Email Provider</h3>
  <select bind:value={emailProvider} class="w-full rounded-lg border border-border bg-background px-4 py-2">
    <option value="smtp">SMTP (Zohomail)</option>
    <option value="zoho-api">Zohomail API</option>
  </select>
  
  {emailProvider === 'smtp' && (
    <div class="grid gap-4">
      <input type="text" placeholder="SMTP Host" bind:value={zohoHost} />
      <input type="number" placeholder="SMTP Port" bind:value={zohoPort} />
      <input type="email" placeholder="Zohomail User" bind:value={zohoUser} />
      <input type="email" placeholder="From Email" bind:value={zohoFrom} />
    </div>
  )}
</div>
```

## Security Best Practices

### 1. Credential Storage
- All credentials stored in environment variables
- Never commit `.env` files to version control
- Use Vercel's Environment Variables UI for production

### 2. Input Validation
- Validate all email addresses with Zod
- Sanitize form inputs before sending
- Rate limit all API endpoints

### 3. Error Handling
- Log errors without exposing sensitive data
- Return generic error messages to clients
- Handle Zohomail-specific errors gracefully

## Zohomail SMTP Configuration

### Standard SMTP Settings
| Setting | Value |
|---------|-------|
| Host | smtp.zoho.com |
| Port (TLS) | 587 |
| Port (SSL) | 465 |
| Username | Your Zohomail email |
| Password | App password (recommended) |

### Common Zohomail Errors
| Error Code | Meaning | Solution |
|------------|---------|----------|
| EAUTH | Authentication failed | Check credentials, use app password |
| EENVELOPE | Invalid email | Validate email format |
| 421 | Rate limit | Implement retry logic |
| 550 | Mailbox unavailable | Check recipient email |

## Testing Checklist

- [ ] Configure Zohomail credentials in `.env`
- [ ] Test contact form submission
- [ ] Verify email received in Zohomail inbox
- [ ] Test admin login with session
- [ ] Test settings save/load
- [ ] Test error handling for invalid credentials
- [ ] Test rate limiting
- [ ] Deploy to Vercel and verify production