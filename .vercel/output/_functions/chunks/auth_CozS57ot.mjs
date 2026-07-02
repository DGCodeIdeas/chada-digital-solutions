import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { createHmac, randomBytes } from "crypto";
//#region src/lib/auth.ts
var auth_exports = /* @__PURE__ */ __exportAll({
	SESSION_COOKIE_NAME: () => SESSION_COOKIE_NAME,
	createSessionSignature: () => createSessionSignature,
	generateSessionToken: () => generateSessionToken,
	getSessionCookieOptions: () => getSessionCookieOptions,
	getZohoMailConfig: () => getZohoMailConfig,
	isPasswordConfigured: () => isPasswordConfigured,
	verifySessionSignature: () => verifySessionSignature
});
var SESSION_SECRET = process.env.SESSION_SECRET || "default-secret-change-in-production";
var SESSION_EXPIRY = 3600 * 24;
function generateSessionToken() {
	return randomBytes(32).toString("hex");
}
function createSessionSignature(token) {
	return createHmac("sha256", SESSION_SECRET).update(token).digest("hex");
}
function verifySessionSignature(token, signature) {
	return timingSafeEqual(signature, createSessionSignature(token));
}
function timingSafeEqual(a, b) {
	if (a.length !== b.length) return false;
	return createHmac("sha256", SESSION_SECRET).update(a).digest("hex") === b;
}
function getSessionCookieOptions() {
	return {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		path: "/",
		maxAge: SESSION_EXPIRY
	};
}
var SESSION_COOKIE_NAME = "admin_session";
function isPasswordConfigured() {
	return !!process.env.ADMIN_PASSWORD_HASH;
}
function getZohoMailConfig() {
	return {
		host: process.env.ZOHO_MAIL_HOST || "smtp.zoho.com",
		port: parseInt(process.env.ZOHO_MAIL_PORT || "587"),
		user: process.env.ZOHO_MAIL_USER || "",
		fromEmail: process.env.ZOHO_MAIL_FROM_EMAIL || process.env.ZOHO_MAIL_USER || ""
	};
}
//#endregion
export { getSessionCookieOptions as a, verifySessionSignature as c, generateSessionToken as i, auth_exports as n, getZohoMailConfig as o, createSessionSignature as r, isPasswordConfigured as s, SESSION_COOKIE_NAME as t };
