import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { t as SESSION_COOKIE_NAME } from "./auth_CozS57ot.mjs";
//#region src/pages/api/admin/logout.ts
var logout_exports = /* @__PURE__ */ __exportAll({
	OPTIONS: () => OPTIONS,
	POST: () => POST
});
function getSecurityHeaders() {
	return {
		"X-Content-Type-Options": "nosniff",
		"X-Frame-Options": "DENY",
		"X-XSS-Protection": "1; mode=block",
		"Referrer-Policy": "strict-origin-when-cross-origin"
	};
}
var POST = async () => {
	const headers = getSecurityHeaders();
	const cookieString = `${SESSION_COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; SameSite=strict;`;
	return new Response(JSON.stringify({
		success: true,
		message: "Logged out successfully"
	}), {
		status: 200,
		headers: {
			...headers,
			"Content-Type": "application/json",
			"Set-Cookie": cookieString
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
//#region \0virtual:astro:page:src/pages/api/admin/logout@_@ts
var page = () => logout_exports;
//#endregion
export { page };
