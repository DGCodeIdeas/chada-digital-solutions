import type { APIRoute } from 'astro';
import { verifySessionSignature, SESSION_COOKIE_NAME } from '@/lib/auth';

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

export const GET: APIRoute = async ({ request }) => {
  const headers = getSecurityHeaders();
  const session = getSessionFromCookie(request);

  return new Response(
    JSON.stringify({
      authenticated: session.valid,
    }),
    {
      status: 200,
      headers: { ...headers, 'Content-Type': 'application/json' },
    }
  );
};

// Handle OPTIONS for CORS
export const OPTIONS: APIRoute = async () => {
  const headers = getSecurityHeaders();
  return new Response(null, { status: 200, headers });
};