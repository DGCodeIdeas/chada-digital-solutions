import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { c as verifySessionSignature, t as SESSION_COOKIE_NAME } from "./auth_CozS57ot.mjs";
import { z } from "zod";
import { readFile, writeFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
//#region src/pages/api/admin/submissions.ts
var submissions_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
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
function getSubmissionsPath() {
	return join(dirname(fileURLToPath(import.meta.url)), "../../data/submissions.json");
}
async function readSubmissions() {
	try {
		const data = await readFile(getSubmissionsPath(), "utf-8");
		return JSON.parse(data);
	} catch {
		return [];
	}
}
async function writeSubmissions(submissions) {
	await writeFile(getSubmissionsPath(), JSON.stringify(submissions, null, 2), "utf-8");
}
var updateSchema = z.object({
	id: z.string(),
	read: z.boolean().optional(),
	action: z.enum([
		"mark-read",
		"mark-unread",
		"delete"
	]).optional()
});
var GET = async ({ request }) => {
	const headers = getSecurityHeaders();
	if (!getSessionFromCookie(request).valid) return new Response(JSON.stringify({
		success: false,
		message: "Unauthorized"
	}), {
		status: 401,
		headers: {
			...headers,
			"Content-Type": "application/json"
		}
	});
	try {
		const submissions = await readSubmissions();
		submissions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
		return new Response(JSON.stringify({
			success: true,
			submissions
		}), {
			status: 200,
			headers: {
				...headers,
				"Content-Type": "application/json"
			}
		});
	} catch (error) {
		console.error("Error reading submissions:", error);
		return new Response(JSON.stringify({
			success: false,
			message: "Failed to read submissions"
		}), {
			status: 500,
			headers: {
				...headers,
				"Content-Type": "application/json"
			}
		});
	}
};
var POST = async ({ request }) => {
	const headers = getSecurityHeaders();
	if (!getSessionFromCookie(request).valid) return new Response(JSON.stringify({
		success: false,
		message: "Unauthorized"
	}), {
		status: 401,
		headers: {
			...headers,
			"Content-Type": "application/json"
		}
	});
	try {
		const body = await request.json();
		const validationResult = updateSchema.safeParse(body);
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
		const { id, read, action } = validationResult.data;
		const submissions = await readSubmissions();
		const index = submissions.findIndex((s) => s.id === id);
		if (index === -1) return new Response(JSON.stringify({
			success: false,
			message: "Submission not found"
		}), {
			status: 404,
			headers: {
				...headers,
				"Content-Type": "application/json"
			}
		});
		if (action === "delete") submissions.splice(index, 1);
		else if (action === "mark-read" || action === "mark-unread") submissions[index].read = action === "mark-read";
		else if (read !== void 0) submissions[index].read = read;
		await writeSubmissions(submissions);
		return new Response(JSON.stringify({
			success: true,
			message: "Submission updated"
		}), {
			status: 200,
			headers: {
				...headers,
				"Content-Type": "application/json"
			}
		});
	} catch (error) {
		console.error("Error updating submission:", error);
		return new Response(JSON.stringify({
			success: false,
			message: "Failed to update submission"
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
//#region \0virtual:astro:page:src/pages/api/admin/submissions@_@ts
var page = () => submissions_exports;
//#endregion
export { page };
