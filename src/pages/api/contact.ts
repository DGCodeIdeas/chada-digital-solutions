import type { APIRoute } from 'astro';
import { z } from 'zod';
import * as nodemailer from 'nodemailer';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import type { ContactFormData, ContactSubmission, ContactFormResponse } from '../../types/index';
import { randomUUID } from 'crypto';
import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { getZohoMailConfig } from '../../lib/auth';

// Rate limiter configuration - 5 requests per minute per IP
const rateLimiter = new RateLimiterMemory({
  points: 5,
  duration: 60,
});

// Zod schema for form validation
const contactFormSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters')
    .transform(val => val.trim()),
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters')
    .transform(val => val.trim().toLowerCase()),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters')
    .transform(val => val.trim()),
  'bot-field': z.string().optional(),
});

// Get admin email from environment
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'hello@chadadigital.com';
const ZOHO_MAIL_PASS = process.env.ZOHO_MAIL_PASS || '';

// Create Zohomail transporter
function createZohoMailTransporter() {
  const config = getZohoMailConfig();
  
  if (!config.user || !ZOHO_MAIL_PASS) {
    console.warn('Zohomail credentials not configured. Email sending will be skipped.');
    return null;
  }
  
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465, // true for 465, false for other ports
    auth: {
      user: config.user,
      pass: ZOHO_MAIL_PASS,
    },
    // Zohomail-specific TLS options
    tls: {
      rejectUnauthorized: true,
    },
  });
}

// Send email with Zohomail error handling
async function sendZohoMail(
  transporter: nodemailer.Transporter,
  mailOptions: nodemailer.SendMailOptions
): Promise<{ success: boolean; error?: string }> {
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

// Get submissions file path
function getSubmissionsPath() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  return join(__dirname, '../data/submissions.json');
}

// Read existing submissions
async function readSubmissions(): Promise<ContactSubmission[]> {
  try {
    const path = getSubmissionsPath();
    const data = await readFile(path, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Write submissions to file
async function writeSubmissions(submissions: ContactSubmission[]): Promise<void> {
  const path = getSubmissionsPath();
  await writeFile(path, JSON.stringify(submissions, null, 2), 'utf-8');
}

// Security headers middleware
function getSecurityHeaders() {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Content-Security-Policy': "default-src 'self'",
  };
}

// HTML email template
function generateEmailHTML(data: ContactFormData): string {
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const message = escapeHtml(data.message);
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>New Contact Form Submission</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1e293b; background: #f8fafc; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
    <div style="background: #0e1b2e; padding: 24px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">New Contact Form Submission</h1>
    </div>
    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
            <strong style="color: #64748b; display: block; margin-bottom: 4px;">Name</strong>
            <span style="color: #0f172a; font-size: 16px;">${name}</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
            <strong style="color: #64748b; display: block; margin-bottom: 4px;">Email</strong>
            <a href="mailto:${email}" style="color: #0ea5e9; text-decoration: none;">${email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0;">
            <strong style="color: #64748b; display: block; margin-bottom: 4px;">Message</strong>
            <span style="color: #0f172a; white-space: pre-wrap;">${message}</span>
          </td>
        </tr>
      </table>
    </div>
    <div style="background: #f1f5f9; padding: 16px 24px; text-align: center;">
      <p style="margin: 0; color: #64748b; font-size: 12px;">Chada Digital Contact Form</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

// Escape HTML to prevent XSS
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

// Parse form data from URL-encoded body
function parseFormData(body: string): ContactFormData {
  const params = new URLSearchParams(body);
  return {
    name: params.get('name') || '',
    email: params.get('email') || '',
    message: params.get('message') || '',
    'bot-field': params.get('bot-field') || '',
  };
}

// Get client IP from request
function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  const realIP = request.headers.get('x-real-ip');
  if (realIP) return realIP;
  return 'unknown';
}

export const POST: APIRoute = async ({ request }) => {
  const headers = getSecurityHeaders();
  
  try {
    // Rate limiting
    const clientIP = getClientIP(request);
    try {
      await rateLimiter.consume(clientIP);
    } catch {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Too many requests. Please try again later.',
        } as ContactFormResponse),
        {
          status: 429,
          headers: { ...headers, 'Content-Type': 'application/json' },
        }
      );
    }

    // Parse form data
    const body = await request.text();
    const formData = parseFormData(body);

    // Honeypot validation - reject if bot-field is filled
    if (formData['bot-field'] && formData['bot-field'].trim() !== '') {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Spam detected.',
        } as ContactFormResponse),
        {
          status: 400,
          headers: { ...headers, 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate form data
    const validationResult = contactFormSchema.safeParse(formData);
    
    if (!validationResult.success) {
      const errors: Record<string, string[]> = {};
      for (const error of validationResult.error.issues) {
        const field = error.path[0] as string;
        if (!errors[field]) errors[field] = [];
        errors[field].push(error.message);
      }
      
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Validation failed',
          errors,
        } as ContactFormResponse),
        {
          status: 400,
          headers: { ...headers, 'Content-Type': 'application/json' },
        }
      );
    }

    const validatedData = validationResult.data;

    // Create submission record
    const submission: ContactSubmission = {
      id: randomUUID(),
      name: validatedData.name,
      email: validatedData.email,
      message: validatedData.message,
      timestamp: new Date().toISOString(),
      ip: clientIP,
      userAgent: request.headers.get('user-agent') || 'unknown',
      read: false,
    };

    // Store submission
    const submissions = await readSubmissions();
    submissions.push(submission);
    await writeSubmissions(submissions);

    // Send email notification
        const config = getZohoMailConfig();
        const transporter = createZohoMailTransporter();
        if (transporter) {
          const result = await sendZohoMail(transporter, {
            from: `"Chada Digital" <${config.fromEmail || config.user}>`,
            to: ADMIN_EMAIL,
            subject: `New Contact Form: ${validatedData.name}`,
            html: generateEmailHTML(validatedData),
            replyTo: validatedData.email,
          });
          
          if (!result.success) {
            console.error('Zohomail error:', result.error);
            // Don't fail the request if email fails
          }
        }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Message sent successfully!',
      } as ContactFormResponse),
      {
        status: 200,
        headers: { ...headers, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        message: 'An error occurred. Please try again.',
      } as ContactFormResponse),
      {
        status: 500,
        headers: { ...headers, 'Content-Type': 'application/json' },
      }
    );
  }
};

// Handle OPTIONS for CORS preflight
export const OPTIONS: APIRoute = async () => {
  const headers = getSecurityHeaders();
  return new Response(null, {
    status: 200,
    headers,
  });
};