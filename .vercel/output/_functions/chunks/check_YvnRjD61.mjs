import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { c as verifySessionSignature, t as SESSION_COOKIE_NAME } from "./auth_CozS57ot.mjs";
//#region src/pages/api/admin/check.ts
var check_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	OPTIONS: () => OPTIONS
});
function getSecurityHeaders() {
	return {
		"X-Content-Type-Options": "nosniff",
		"X-Frame-Options": "DENY",
		"X-XSS-Protection": "1; mode=block",
		"Referrer-Policy": "strict-origin-when-cross-origin"
	};
}
function getSessionFromCookie(request) {
	const cookies = request.headers.get("cookie");
	if (!cookies) return { valid: false };
	const sessionCookie = cookies.split(";").find((c) => c.trim().startsWith(`${SESSION_COOKIE_NAME}=`));
	if (!sessionCookie) return { valid: false };
	const sessionValue = sessionCookie.split("=")[1];
	if (!sessionValue) return { valid: false };
	const [token, signature] = sessionValue.split(".");
	if (!token || !signature) return { valid: false };
	return { valid: verifySessionSignature(token, signature) };
}
var GET = async ({ request }) => {
	const headers = getSecurityHeaders();
	const session = getSessionFromCookie(request);
	return new Response(JSON.stringify({ authenticated: session.valid }), {
		status: 200,
		headers: {
			...headers,
			"Content-Type": "application/json"
		}
	});
};
var OPTIONS = async () => {
	const headers = getSecurityHeaders();
	return new Response(null, {
		status: 200,
		headers
	});
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/admin/check@_@ts
var page = () => check_exports;
//#endregion
export { page };
