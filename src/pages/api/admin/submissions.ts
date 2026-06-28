import type { APIRoute } from 'astro';
import { z } from 'zod';
import { verifySessionSignature, SESSION_COOKIE_NAME } from '@/lib/auth';
import type { ContactSubmission } from '@/types/index';
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

// Get submissions file path
function getSubmissionsPath() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  return join(__dirname, '../../data/submissions.json');
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

// Update schema
const updateSchema = z.object({
  id: z.string(),
  read: z.boolean().optional(),
  action: z.enum(['mark-read', 'mark-unread', 'delete']).optional(),
});

export const GET: APIRoute = async ({ request }) => {
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
    const submissions = await readSubmissions();
    
    // Sort by timestamp (newest first)
    submissions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return new Response(
      JSON.stringify({
        success: true,
        submissions,
      }),
      {
        status: 200,
        headers: { ...headers, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error reading submissions:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Failed to read submissions',
      }),
      {
        status: 500,
        headers: { ...headers, 'Content-Type': 'application/json' },
      }
    );
  }
};

export const POST: APIRoute = async ({ request }) => {
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
          message: 'Invalid request',
        }),
        {
          status: 400,
          headers: { ...headers, 'Content-Type': 'application/json' },
        }
      );
    }

    const { id, read, action } = validationResult.data;
    const submissions = await readSubmissions();
    const index = submissions.findIndex((s) => s.id === id);

    if (index === -1) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Submission not found',
        }),
        {
          status: 404,
          headers: { ...headers, 'Content-Type': 'application/json' },
        }
      );
    }

    // Handle actions
    if (action === 'delete') {
      submissions.splice(index, 1);
    } else if (action === 'mark-read' || action === 'mark-unread') {
      submissions[index].read = action === 'mark-read';
    } else if (read !== undefined) {
      submissions[index].read = read;
    }

    await writeSubmissions(submissions);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Submission updated',
      }),
      {
        status: 200,
        headers: { ...headers, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error updating submission:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Failed to update submission',
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