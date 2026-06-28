import type { APIRoute } from 'astro';
import { SESSION_COOKIE_NAME } from '@/lib/auth';

// Security headers
function getSecurityHeaders() {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  };
}

export const POST: APIRoute = async () => {
  const headers = getSecurityHeaders();

  // Clear session cookie
  const cookieString = `${SESSION_COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; SameSite=strict;`;

  return new Response(
    JSON.stringify({
      success: true,
      message: 'Logged out successfully',
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
};

// Handle OPTIONS for CORS
export const OPTIONS: APIRoute = async () => {
  const headers = getSecurityHeaders();
  return new Response(null, { status: 200, headers });
};