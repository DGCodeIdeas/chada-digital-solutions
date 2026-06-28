import type { APIRoute } from 'astro';
import { z } from 'zod';
import { verifySessionSignature, SESSION_COOKIE_NAME } from '@/lib/auth';
import type { AdminSettings } from '@/types/index';
import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Security headers
function getSecurityHeaders() {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  };
}

// Get session from cookie
function getSessionFromCookie(request: Request): { valid: boolean } {
  const cookies = request.headers.get('cookie');
  if (!cookies) return { valid: false };

  const sessionCookie = cookies
    .split(';')
    .find((c) => c.trim().startsWith(`${SESSION_COOKIE_NAME}=`));

  if (!sessionCookie) return { valid: false };

  const sessionValue = sessionCookie.split('=')[1];
  if (!sessionValue) return { valid: false };

  const [token, signature] = sessionValue.split('.');
  if (!token || !signature) return { valid: false };

  return { valid: verifySessionSignature(token, signature) };
}

// Get settings file path
function getSettingsPath() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  return join(__dirname, '../../data/settings.json');
}

// Read existing settings
async function readSettings(): Promise<AdminSettings> {
  try {
    const path = getSettingsPath();
    const data = await readFile(path, 'utf-8');
    return JSON.parse(data);
  } catch {
    // Return default settings if file doesn't exist
    return {
      destinationEmail: 'hello@chadadigital.com',
      emailProvider: 'smtp',
      zohoMail: {
        host: 'smtp.zoho.com',
        port: 587,
        user: '',
        fromEmail: '',
      },
      validationRules: {
        name: { min: 2, max: 100, required: true },
        email: { min: 5, max: 255, required: true },
        message: { min: 10, max: 2000, required: true },
      },
      notifications: {
        emailOnNewSubmission: true,
        dailySummary: false,
      },
    };
  }
}

// Write settings to file
async function writeSettings(settings: AdminSettings): Promise<void> {
  const path = getSettingsPath();
  await writeFile(path, JSON.stringify(settings, null, 2), 'utf-8');
}

// Update schema for settings
const updateSchema = z.object({
  destinationEmail: z.string().email().optional(),
  emailProvider: z.enum(['smtp', 'zoho-api']).optional(),
  zohoMail: z.object({
    host: z.string().optional(),
    port: z.number().int().min(1).max(65535).optional(),
    user: z.string().email().optional(),
    fromEmail: z.string().email().optional(),
  }).optional(),
  validationRules: z.object({
    name: z.object({
      min: z.number().int().min(1).max(500),
      max: z.number().int().min(1).max(500),
      required: z.boolean(),
    }).optional(),
    email: z.object({
      min: z.number().int().min(1).max(500),
      max: z.number().int().min(1).max(500),
      required: z.boolean(),
    }).optional(),
    message: z.object({
      min: z.number().int().min(1).max(5000),
      max: z.number().int().min(1).max(5000),
      required: z.boolean(),
    }).optional(),
  }).optional(),
  notifications: z.object({
    emailOnNewSubmission: z.boolean().optional(),
    dailySummary: z.boolean().optional(),
  }).optional(),
});

// GET - Load settings
export const GET: APIRoute = async ({ request }): Promise<Response> => {
  const headers = getSecurityHeaders();
  const session = getSessionFromCookie(request);

  if (!session.valid) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Unauthorized',
      }),
      {
        status: 401,
        headers: { ...headers, 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    const settings = await readSettings();

    return new Response(
      JSON.stringify({
        success: true,
        settings,
      }),
      {
        status: 200,
        headers: { ...headers, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error reading settings:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Failed to read settings',
      }),
      {
        status: 500,
        headers: { ...headers, 'Content-Type': 'application/json' },
      }
    );
  }
};

// POST - Save settings
export const POST: APIRoute = async ({ request }): Promise<Response> => {
  const headers = getSecurityHeaders();
  const session = getSessionFromCookie(request);

  if (!session.valid) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Unauthorized',
      }),
      {
        status: 401,
        headers: { ...headers, 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    const body = await request.json();
    const validationResult = updateSchema.safeParse(body);

    if (!validationResult.success) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Invalid request data',
          errors: validationResult.error.issues.map((e: { message: string }) => e.message),
        }),
        {
          status: 400,
          headers: { ...headers, 'Content-Type': 'application/json' },
        }
      );
    }

    const currentSettings = await readSettings();
    const updates = validationResult.data;

    // Merge updates with current settings
        const newSettings: AdminSettings = {
          ...currentSettings,
          ...(updates.destinationEmail && { destinationEmail: updates.destinationEmail }),
          ...(updates.emailProvider && { emailProvider: updates.emailProvider }),
          ...(updates.zohoMail && {
            zohoMail: {
              ...currentSettings.zohoMail,
              ...(updates.zohoMail.host && { host: updates.zohoMail.host }),
              ...(updates.zohoMail.port && { port: updates.zohoMail.port }),
              ...(updates.zohoMail.user && { user: updates.zohoMail.user }),
              ...(updates.zohoMail.fromEmail && { fromEmail: updates.zohoMail.fromEmail }),
            },
          }),
          ...(updates.validationRules && {
            validationRules: {
              ...currentSettings.validationRules,
              ...(updates.validationRules.name && { name: updates.validationRules.name }),
              ...(updates.validationRules.email && { email: updates.validationRules.email }),
              ...(updates.validationRules.message && { message: updates.validationRules.message }),
            },
          }),
          ...(updates.notifications && {
            notifications: {
              ...currentSettings.notifications,
              ...(updates.notifications.emailOnNewSubmission !== undefined && {
                emailOnNewSubmission: updates.notifications.emailOnNewSubmission
              }),
              ...(updates.notifications.dailySummary !== undefined && {
                dailySummary: updates.notifications.dailySummary
              }),
            },
          }),
        };

    await writeSettings(newSettings);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Settings saved successfully',
        settings: newSettings,
      }),
      {
        status: 200,
        headers: { ...headers, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error saving settings:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Failed to save settings',
      }),
      {
        status: 500,
        headers: { ...headers, 'Content-Type': 'application/json' },
      }
    );
  }
};

// Handle OPTIONS for CORS
export const OPTIONS: APIRoute = async () => {
  const headers = getSecurityHeaders();
  return new Response(null, { status: 200, headers });
};