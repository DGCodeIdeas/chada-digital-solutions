import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { a as getSessionCookieOptions, i as generateSessionToken, r as createSessionSignature, s as isPasswordConfigured, t as SESSION_COOKIE_NAME } from "./auth_CozS57ot.mjs";
import { z } from "zod";
import bcrypt from "bcryptjs";
//#region src/pages/api/admin/login.ts
var login_exports = /* @__PURE__ */ __exportAll({
	OPTIONS: () => OPTIONS,
	POST: () => POST
});
var loginSchema = z.object({ password: z.string().min(1, "Password is required") });
function getSecurityHeaders() {
	return {
		"X-Content-Type-Options": "nosniff",
		"X-Frame-Options": "DENY",
		"X-XSS-Protection": "1; mode=block",
		"Referrer-Policy": "strict-origin-when-cross-origin"
	};
}
var POST = async ({ request }) => {
	const headers = getSecurityHeaders();
	try {
		if (!isPasswordConfigured()) return new Response(JSON.stringify({
			success: false,
			message: "Admin authentication not configured"
		}), {
			status: 500,
			headers: {
				...headers,
				"Content-Type": "application/json"
			}
		});
		const body = await request.json();
		const validationResult = loginSchema.safeParse(body);
		if (!validationResult.success) return new Response(JSON.stringify({
			success: false,
			message: "Invalid request"
		}), {
			status: 400,
			headers: {
				...headers,
				"Content-Type": "application/json"
			}
		});
		const { password } = validationResult.data;
		const passwordHash = process.env.ADMIN_PASSWORD_HASH;
		if (!await bcrypt.compare(password, passwordHash)) return new Response(JSON.stringify({
			success: false,
			message: "Invalid credentials"
		}), {
			status: 401,
			headers: {
				...headers,
				"Content-Type": "application/json"
			}
		});
		const token = generateSessionToken();
		const sessionValue = `${token}.${createSessionSignature(token)}`;
		const cookieOptions = getSessionCookieOptions();
		const cookieString = `${SESSION_COOKIE_NAME}=${sessionValue}; HttpOnly; Path=${cookieOptions.path}; Max-Age=${cookieOptions.maxAge}; SameSite=${cookieOptions.sameSite}; ${cookieOptions.secure ? "Secure;" : ""}`;
		return new Response(JSON.stringify({
			success: true,
			message: "Login successful"
		}), {
			status: 200,
			headers: {
				...headers,
				"Content-Type": "application/json",
				"Set-Cookie": cookieString
			}
		});
	} catch (error) {
		console.error("Login error:", error);
		return new Response(JSON.stringify({
			success: false,
			message: "An error occurred"
		}), {
			status: 500,
			headers: {
				...headers,
				"Content-Type": "application/json"
			}
		});
	}
};
var OPTIONS = async () => {
	const headers = getSecurityHeaders();
	return new Response(null, {
		status: 200,
		headers
	});
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/admin/login@_@ts
var page = () => login_exports;
//#endregion
export { page };
