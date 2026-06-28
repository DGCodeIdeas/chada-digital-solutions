import { randomBytes, createHmac } from 'crypto';
import type { ZohoMailConfig } from '../types/index';

// Session configuration
const SESSION_SECRET = process.env.SESSION_SECRET || 'default-secret-change-in-production';
const SESSION_EXPIRY = 60 * 60 * 24; // 24 hours in seconds

// Generate a secure session token
export function generateSessionToken(): string {
  return randomBytes(32).toString('hex');
}

// Create a session signature
export function createSessionSignature(token: string): string {
  return createHmac('sha256', SESSION_SECRET).update(token).digest('hex');
}

// Verify session signature
export function verifySessionSignature(token: string, signature: string): boolean {
  const expectedSignature = createSessionSignature(token);
  return timingSafeEqual(signature, expectedSignature);
}

// Timing-safe string comparison
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return createHmac('sha256', SESSION_SECRET).update(a).digest('hex') === b;
}

// Get session cookie options
export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    path: '/',
    maxAge: SESSION_EXPIRY,
  };
}

// Session cookie name
export const SESSION_COOKIE_NAME = 'admin_session';

// Check if password hash is configured
export function isPasswordConfigured(): boolean {
  return !!process.env.ADMIN_PASSWORD_HASH;
}

// Zohomail SMTP configuration
export function getZohoMailConfig(): ZohoMailConfig {
  return {
    host: process.env.ZOHO_MAIL_HOST || 'smtp.zoho.com',
    port: parseInt(process.env.ZOHO_MAIL_PORT || '587'),
    user: process.env.ZOHO_MAIL_USER || '',
    fromEmail: process.env.ZOHO_MAIL_FROM_EMAIL || process.env.ZOHO_MAIL_USER || '',
  };
}

// Check if Zohomail is configured
export function isZohoMailConfigured(): boolean {
  const config = getZohoMailConfig();
  return !!(config.user && process.env.ZOHO_MAIL_PASS);
}