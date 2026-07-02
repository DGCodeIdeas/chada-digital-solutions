import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { C as createComponent, S as createAstro, _ as addAttribute, a as renderComponent, d as renderTemplate, h as maybeRenderHead, n as renderScript } from "./server_TAZ5Bv5Z.mjs";
import "./compiler_B66PZQ5e.mjs";
import { n as site_default, t as $$Layout } from "./Layout_BKxp8tHT.mjs";
import { t as $$Icon } from "./Icon_PV0dPpLb.mjs";
//#region src/pages/admin/settings.astro
var settings_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Settings,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://www.chadadigital.com");
var $$Settings = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Settings;
	const { settings } = site_default;
	const sessionCookie = Astro.request.headers.get("cookie");
	let isAuthenticated = false;
	if (sessionCookie) {
		const session = sessionCookie.split(";").find((c) => c.trim().startsWith("admin_session="));
		if (session) {
			const sessionValue = session.split("=")[1];
			if (sessionValue) {
				const [token, signature] = sessionValue.split(".");
				if (token && signature) {
					const { verifySessionSignature } = await import("./auth_CozS57ot.mjs").then((n) => n.n);
					isAuthenticated = verifySessionSignature(token, signature);
				}
			}
		}
	}
	if (!isAuthenticated) return Astro.redirect("/admin/login");
	let currentSettings = {
		destinationEmail: "hello@chadadigital.com",
		emailProvider: "smtp",
		zohoMail: {
			host: "smtp.zoho.com",
			port: 587,
			user: "",
			fromEmail: ""
		},
		validationRules: {
			name: {
				min: 2,
				max: 100,
				required: true
			},
			email: {
				min: 5,
				max: 255,
				required: true
			},
			message: {
				min: 10,
				max: 2e3,
				required: true
			}
		},
		notifications: {
			emailOnNewSubmission: true,
			dailySummary: false
		}
	};
	try {
		const { readFile } = await import("fs/promises");
		const { fileURLToPath } = await import("url");
		const { dirname, join } = await import("path");
		const data = await readFile(join(dirname(fileURLToPath(import.meta.url)), "../data/settings.json"), "utf-8");
		currentSettings = JSON.parse(data);
	} catch {}
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "Admin Settings",
		"description": "Configure admin settings"
	}, { "default": async ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="min-h-screen bg-background"><!-- Header --><header class="border-b border-border/40 bg-background/85 backdrop-blur-xl"><div class="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6"><div class="flex items-center gap-4"><a href="/" class="inline-flex items-center"><img${addAttribute(settings.name, "alt")} class="h-10 w-auto" src="/chada-mark.png"></a><h1 class="text-xl font-bold text-foreground">Admin Settings</h1></div><div class="flex items-center gap-4"><a href="/admin" class="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:border-primary hover:text-primary">${renderComponent($$result, "Icon", $$Icon, {
		"name": "arrow-left",
		"size": 14,
		"class": "size-3.5"
	})}Dashboard</a><span class="text-sm text-muted-foreground">Welcome, Admin</span><button id="logout-btn" class="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:border-primary hover:text-primary">${renderComponent($$result, "Icon", $$Icon, {
		"name": "log-out",
		"size": 14,
		"class": "size-3.5"
	})}Logout</button></div></div></header><!-- Main Content --><main class="mx-auto max-w-4xl px-6 py-12"><!-- Success/Error Feedback --><div id="feedback" class="hidden mb-6 rounded-2xl border p-4"><p id="feedback-message" class="text-sm"></p></div><form id="settings-form" class="space-y-8"><!-- Email Configuration --><div class="rounded-2xl border border-border bg-card/40 p-6"><h2 class="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">${renderComponent($$result, "Icon", $$Icon, {
		"name": "mail",
		"size": 20,
		"class": "size-5 text-primary"
	})}Email Configuration</h2><div class="space-y-4"><div><label for="destination-email" class="block text-sm font-medium text-foreground mb-2">Destination Email Address</label><input type="email" id="destination-email" name="destinationEmail"${addAttribute(currentSettings.destinationEmail, "value")} placeholder="Enter destination email" required class="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"><p class="mt-2 text-xs text-muted-foreground">Contact form submissions will be sent to this email address</p></div></div></div><!-- Validation Rules --><div class="rounded-2xl border border-border bg-card/40 p-6"><h2 class="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">${renderComponent($$result, "Icon", $$Icon, {
		"name": "shield",
		"size": 20,
		"class": "size-5 text-primary"
	})}Form Validation Rules</h2><div class="space-y-6"><!-- Name Validation --><div><h3 class="text-sm font-medium text-foreground mb-3">Name Field</h3><div class="grid gap-4 sm:grid-cols-3"><div><label for="name-min" class="block text-xs font-medium text-muted-foreground mb-1">Min Length</label><input type="number" id="name-min" name="validationRules.name.min"${addAttribute(currentSettings.validationRules.name.min, "value")} min="1" max="500" class="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"></div><div><label for="name-max" class="block text-xs font-medium text-muted-foreground mb-1">Max Length</label><input type="number" id="name-max" name="validationRules.name.max"${addAttribute(currentSettings.validationRules.name.max, "value")} min="1" max="500" class="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"></div><div class="flex items-center pt-5"><label class="inline-flex items-center gap-2 cursor-pointer"><input type="checkbox" id="name-required" name="validationRules.name.required"${addAttribute(currentSettings.validationRules.name.required, "checked")} class="size-4 rounded border-border text-primary focus:ring-primary"><span class="text-sm text-foreground">Required</span></label></div></div></div><!-- Email Validation --><div><h3 class="text-sm font-medium text-foreground mb-3">Email Field</h3><div class="grid gap-4 sm:grid-cols-3"><div><label for="email-min" class="block text-xs font-medium text-muted-foreground mb-1">Min Length</label><input type="number" id="email-min" name="validationRules.email.min"${addAttribute(currentSettings.validationRules.email.min, "value")} min="1" max="500" class="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"></div><div><label for="email-max" class="block text-xs font-medium text-muted-foreground mb-1">Max Length</label><input type="number" id="email-max" name="validationRules.email.max"${addAttribute(currentSettings.validationRules.email.max, "value")} min="1" max="500" class="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"></div><div class="flex items-center pt-5"><label class="inline-flex items-center gap-2 cursor-pointer"><input type="checkbox" id="email-required" name="validationRules.email.required"${addAttribute(currentSettings.validationRules.email.required, "checked")} class="size-4 rounded border-border text-primary focus:ring-primary"><span class="text-sm text-foreground">Required</span></label></div></div></div><!-- Message Validation --><div><h3 class="text-sm font-medium text-foreground mb-3">Message Field</h3><div class="grid gap-4 sm:grid-cols-3"><div><label for="message-min" class="block text-xs font-medium text-muted-foreground mb-1">Min Length</label><input type="number" id="message-min" name="validationRules.message.min"${addAttribute(currentSettings.validationRules.message.min, "value")} min="1" max="5000" class="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"></div><div><label for="message-max" class="block text-xs font-medium text-muted-foreground mb-1">Max Length</label><input type="number" id="message-max" name="validationRules.message.max"${addAttribute(currentSettings.validationRules.message.max, "value")} min="1" max="5000" class="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"></div><div class="flex items-center pt-5"><label class="inline-flex items-center gap-2 cursor-pointer"><input type="checkbox" id="message-required" name="validationRules.message.required"${addAttribute(currentSettings.validationRules.message.required, "checked")} class="size-4 rounded border-border text-primary focus:ring-primary"><span class="text-sm text-foreground">Required</span></label></div></div></div></div></div><!-- Notification Preferences --><div class="rounded-2xl border border-border bg-card/40 p-6"><h2 class="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">${renderComponent($$result, "Icon", $$Icon, {
		"name": "bell",
		"size": 20,
		"class": "size-5 text-primary"
	})}Notification Preferences</h2><div class="space-y-4"><label class="flex items-center justify-between p-4 rounded-xl border border-border bg-background/50 cursor-pointer hover:bg-background/80 transition-colors"><div><p class="text-sm font-medium text-foreground">Email on New Submission</p><p class="text-xs text-muted-foreground">Receive an email notification when a new contact form submission is received</p></div><div class="relative"><input type="checkbox" id="email-notification" name="notifications.emailOnNewSubmission"${addAttribute(currentSettings.notifications.emailOnNewSubmission, "checked")} class="sr-only peer"><div class="w-11 h-6 bg-border rounded-full peer peer-checked:bg-primary transition-colors"></div><div class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div></div></label><label class="flex items-center justify-between p-4 rounded-xl border border-border bg-background/50 cursor-pointer hover:bg-background/80 transition-colors"><div><p class="text-sm font-medium text-foreground">Daily Summary</p><p class="text-xs text-muted-foreground">Receive a daily summary of all contact form submissions</p></div><div class="relative"><input type="checkbox" id="daily-summary" name="notifications.dailySummary"${addAttribute(currentSettings.notifications.dailySummary, "checked")} class="sr-only peer"><div class="w-11 h-6 bg-border rounded-full peer peer-checked:bg-primary transition-colors"></div><div class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div></div></label></div></div><!-- Save Button --><div class="flex justify-end"><button type="submit" id="save-btn" class="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50">${renderComponent($$result, "Icon", $$Icon, {
		"name": "save",
		"size": 16,
		"class": "size-4"
	})}Save Settings</button></div></form></main></div>${renderScript($$result, "/app/src/pages/admin/settings.astro?astro&type=script&index=0&lang.ts")}` })}`;
}, "/app/src/pages/admin/settings.astro", void 0);
var $$file = "/app/src/pages/admin/settings.astro";
var $$url = "/admin/settings";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/settings@_@astro
var page = () => settings_exports;
//#endregion
export { page };
