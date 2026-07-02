import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { o as getZohoMailConfig } from "./auth_CozS57ot.mjs";
import { randomUUID } from "crypto";
import { z } from "zod";
import { readFile, writeFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import * as nodemailer from "nodemailer";
import { RateLimiterMemory } from "rate-limiter-flexible";
//#region src/pages/api/contact.ts
var contact_exports = /* @__PURE__ */ __exportAll({
	OPTIONS: () => OPTIONS,
	POST: () => POST
});
var rateLimiter = new RateLimiterMemory({
	points: 5,
	duration: 60
});
var contactFormSchema = z.object({
	name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters").transform((val) => val.trim()),
	email: z.string().min(1, "Email is required").email("Please enter a valid email address").max(255, "Email must be less than 255 characters").transform((val) => val.trim().toLowerCase()),
	message: z.string().min(10, "Message must be at least 10 characters").max(2e3, "Message must be less than 2000 characters").transform((val) => val.trim()),
	"bot-field": z.string().optional()
});
var ADMIN_EMAIL = process.env.ADMIN_EMAIL || "hello@chadadigital.com";
var ZOHO_MAIL_PASS = process.env.ZOHO_MAIL_PASS || "";
function createZohoMailTransporter() {
	const config = getZohoMailConfig();
	if (!config.user || !ZOHO_MAIL_PASS) {
		console.warn("Zohomail credentials not configured. Email sending will be skipped.");
		return null;
	}
	return nodemailer.createTransport({
		host: config.host,
		port: config.port,
		secure: config.port === 465,
		auth: {
			user: config.user,
			pass: ZOHO_MAIL_PASS
		},
		tls: { rejectUnauthorized: true }
	});
}
async function sendZohoMail(transporter, mailOptions) {
	try {
		await transporter.sendMail(mailOptions);
		return { success: true };
	} catch (error) {
		if (error.code === "EAUTH") {
			console.error("Zohomail authentication failed. Check credentials.");
			return {
				success: false,
				error: "Authentication failed"
			};
		}
		if (error.code === "EENVELOPE") {
			console.error("Invalid email address in Zohomail request.");
			return {
				success: false,
				error: "Invalid email address"
			};
		}
		if (error.responseCode === 421) {
			console.error("Zohomail rate limit exceeded.");
			return {
				success: false,
				error: "Rate limit exceeded"
			};
		}
		console.error("Zohomail send error:", error);
		return {
			success: false,
			error: "Email sending failed"
		};
	}
}
function getSubmissionsPath() {
	return join(dirname(fileURLToPath(import.meta.url)), "../data/submissions.json");
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
function getSecurityHeaders() {
	return {
		"X-Content-Type-Options": "nosniff",
		"X-Frame-Options": "DENY",
		"X-XSS-Protection": "1; mode=block",
		"Referrer-Policy": "strict-origin-when-cross-origin",
		"Content-Security-Policy": "default-src 'self'"
	};
}
function generateEmailHTML(data) {
	const name = escapeHtml(data.name);
	const email = escapeHtml(data.email);
	return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>New Contact Form Submission</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1e293b; background: #f8fafc; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
    <div style="background: #0e1b2e; padding: 24px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">New Contact Form Submission</h1>
    </div>
    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
            <strong style="color: #64748b; display: block; margin-bottom: 4px;">Name</strong>
            <span style="color: #0f172a; font-size: 16px;">${name}</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
            <strong style="color: #64748b; display: block; margin-bottom: 4px;">Email</strong>
            <a href="mailto:${email}" style="color: #0ea5e9; text-decoration: none;">${email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0;">
            <strong style="color: #64748b; display: block; margin-bottom: 4px;">Message</strong>
            <span style="color: #0f172a; white-space: pre-wrap;">${escapeHtml(data.message)}</span>
          </td>
        </tr>
      </table>
    </div>
    <div style="background: #f1f5f9; padding: 16px 24px; text-align: center;">
      <p style="margin: 0; color: #64748b; font-size: 12px;">Chada Digital Contact Form</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}
function escapeHtml(text) {
	const map = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		"\"": "&quot;",
		"'": "&#039;"
	};
	return text.replace(/[&<>"']/g, (char) => map[char]);
}
function parseFormData(body) {
	const params = new URLSearchParams(body);
	return {
		name: params.get("name") || "",
		email: params.get("email") || "",
		message: params.get("message") || "",
		"bot-field": params.get("bot-field") || ""
	};
}
function getClientIP(request) {
	const forwarded = request.headers.get("x-forwarded-for");
	if (forwarded) return forwarded.split(",")[0].trim();
	const realIP = request.headers.get("x-real-ip");
	if (realIP) return realIP;
	return "unknown";
}
var POST = async ({ request }) => {
	const headers = getSecurityHeaders();
	try {
		const clientIP = getClientIP(request);
		try {
			await rateLimiter.consume(clientIP);
		} catch {
			return new Response(JSON.stringify({
				success: false,
				message: "Too many requests. Please try again later."
			}), {
				status: 429,
				headers: {
					...headers,
					"Content-Type": "application/json"
				}
			});
		}
		const formData = parseFormData(await request.text());
		if (formData["bot-field"] && formData["bot-field"].trim() !== "") return new Response(JSON.stringify({
			success: false,
			message: "Spam detected."
		}), {
			status: 400,
			headers: {
				...headers,
				"Content-Type": "application/json"
			}
		});
		const validationResult = contactFormSchema.safeParse(formData);
		if (!validationResult.success) {
			const errors = {};
			for (const error of validationResult.error.issues) {
				const field = error.path[0];
				if (!errors[field]) errors[field] = [];
				errors[field].push(error.message);
			}
			return new Response(JSON.stringify({
				success: false,
				message: "Validation failed",
				errors
			}), {
				status: 400,
				headers: {
					...headers,
					"Content-Type": "application/json"
				}
			});
		}
		const validatedData = validationResult.data;
		const submission = {
			id: randomUUID(),
			name: validatedData.name,
			email: validatedData.email,
			message: validatedData.message,
			timestamp: (/* @__PURE__ */ new Date()).toISOString(),
			ip: clientIP,
			userAgent: request.headers.get("user-agent") || "unknown",
			read: false
		};
		const submissions = await readSubmissions();
		submissions.push(submission);
		await writeSubmissions(submissions);
		const config = getZohoMailConfig();
		const transporter = createZohoMailTransporter();
		if (transporter) {
			const result = await sendZohoMail(transporter, {
				from: `"Chada Digital" <${config.fromEmail || config.user}>`,
				to: ADMIN_EMAIL,
				subject: `New Contact Form: ${validatedData.name}`,
				html: generateEmailHTML(validatedData),
				replyTo: validatedData.email
			});
			if (!result.success) console.error("Zohomail error:", result.error);
		}
		return new Response(JSON.stringify({
			success: true,
			message: "Message sent successfully!"
		}), {
			status: 200,
			headers: {
				...headers,
				"Content-Type": "application/json"
			}
		});
	} catch (error) {
		console.error("Contact form error:", error);
		return new Response(JSON.stringify({
			success: false,
			message: "An error occurred. Please try again."
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
//#region \0virtual:astro:page:src/pages/api/contact@_@ts
var page = () => contact_exports;
//#endregion
export { page };
