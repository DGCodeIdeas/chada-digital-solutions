import type { APIRoute } from 'astro';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { generateSessionToken, createSessionSignature, getSessionCookieOptions, SESSION_COOKIE_NAME, isPasswordConfigured } from '@/lib/auth';

// Login schema
const loginSchema = z.object({
  password: z.string().min(1, 'Password is required'),
});

// Security headers
function getSecurityHeaders() {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  };
}

export const POST: APIRoute = async ({ request }) => {
  const headers = getSecurityHeaders();

  try {
    // Check if password is configured
    if (!isPasswordConfigured()) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Admin authentication not configured',
        }),
        {
          status: 500,
          headers: { ...headers, 'Content-Type': 'application/json' },
        }
      );
    }

    // Parse request body
    const body = await request.json();
    const validationResult = loginSchema.safeParse(body);

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

    const { password } = validationResult.data;
    const passwordHash = process.env.ADMIN_PASSWORD_HASH;

    // Verify password
    const isValid = await bcrypt.compare(password, passwordHash!);

    if (!isValid) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Invalid credentials',
        }),
        {
          status: 401,
          headers: { ...headers, 'Content-Type': 'application/json' },
        }
      );
    }

    // Create session
    const token = generateSessionToken();
    const signature = createSessionSignature(token);
    const sessionValue = `${token}.${signature}`;

    // Set session cookie
    const cookieOptions = getSessionCookieOptions();
    const cookieString = `${SESSION_COOKIE_NAME}=${sessionValue}; HttpOnly; Path=${cookieOptions.path}; Max-Age=${cookieOptions.maxAge}; SameSite=${cookieOptions.sameSite}; ${cookieOptions.secure ? 'Secure;' : ''}`;

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Login successful',
      }),
      {
        status: 200,
        headers: {
          ...headers,
          'Content-Type': 'application/json',
          'Set-Cookie': cookieString,
        },
      }
    );
  } catch (error) {
    console.error('Login error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'An error occurred',
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