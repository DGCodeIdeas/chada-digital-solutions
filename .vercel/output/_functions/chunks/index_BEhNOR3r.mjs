import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { C as createComponent, S as createAstro, _ as addAttribute, a as renderComponent, d as renderTemplate, h as maybeRenderHead, n as renderScript } from "./server_WZyIJi8d.mjs";
import "./compiler_C72UIJF5.mjs";
import { n as site_default, t as $$Layout } from "./Layout_DJ9NQoQk.mjs";
import { t as $$Icon } from "./Icon_Bt7POlIg.mjs";
//#region src/pages/admin/index.astro
var admin_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://www.chadadigital.com");
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
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
	let submissions = [];
	try {
		const { readFile } = await import("fs/promises");
		const { fileURLToPath } = await import("url");
		const { dirname, join } = await import("path");
		const data = await readFile(join(dirname(fileURLToPath(import.meta.url)), "../data/submissions.json"), "utf-8");
		submissions = JSON.parse(data);
	} catch {
		submissions = [];
	}
	submissions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "Admin Dashboard",
		"description": "Manage contact form submissions"
	}, { "default": async ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="min-h-screen bg-background"><!-- Header --><header class="border-b border-border/40 bg-background/85 backdrop-blur-xl"><div class="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6"><div class="flex items-center gap-4"><a href="/" class="inline-flex items-center"><img${addAttribute(settings.name, "alt")} class="h-10 w-auto" src="/chada-mark.png"></a><h1 class="text-xl font-bold text-foreground">Admin Dashboard</h1></div><div class="flex items-center gap-4"><a href="/admin/settings" class="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:border-primary hover:text-primary" title="Settings">${renderComponent($$result, "Icon", $$Icon, {
		"name": "settings",
		"size": 14,
		"class": "size-3.5"
	})}Settings</a><span class="text-sm text-muted-foreground">Welcome, Admin</span><button id="logout-btn" class="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:border-primary hover:text-primary">${renderComponent($$result, "Icon", $$Icon, {
		"name": "log-out",
		"size": 14,
		"class": "size-3.5"
	})}Logout</button></div></div></header><!-- Main Content --><main class="mx-auto max-w-7xl px-6 py-12"><!-- Stats --><div class="mb-8 grid gap-6 sm:grid-cols-3"><div class="rounded-2xl border border-border bg-card/40 p-6"><div class="flex items-center gap-4"><div class="inline-flex size-12 items-center justify-center rounded-xl bg-primary/15 text-primary">${renderComponent($$result, "Icon", $$Icon, {
		"name": "mail",
		"size": 20,
		"class": "size-5"
	})}</div><div><p class="text-2xl font-bold text-foreground">${submissions.length}</p><p class="text-sm text-muted-foreground">Total Submissions</p></div></div></div><div class="rounded-2xl border border-border bg-card/40 p-6"><div class="flex items-center gap-4"><div class="inline-flex size-12 items-center justify-center rounded-xl bg-primary/15 text-primary">${renderComponent($$result, "Icon", $$Icon, {
		"name": "mail-open",
		"size": 20,
		"class": "size-5"
	})}</div><div><p class="text-2xl font-bold text-foreground">${submissions.filter((s) => s.read).length}</p><p class="text-sm text-muted-foreground">Read</p></div></div></div><div class="rounded-2xl border border-border bg-card/40 p-6"><div class="flex items-center gap-4"><div class="inline-flex size-12 items-center justify-center rounded-xl bg-primary/15 text-primary">${renderComponent($$result, "Icon", $$Icon, {
		"name": "mail",
		"size": 20,
		"class": "size-5"
	})}</div><div><p class="text-2xl font-bold text-foreground">${submissions.filter((s) => !s.read).length}</p><p class="text-sm text-muted-foreground">Unread</p></div></div></div></div><!-- Search and Filter --><div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div class="relative flex-1 max-w-md"><input id="search-input" type="text" placeholder="Search submissions..." class="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors">${renderComponent($$result, "Icon", $$Icon, {
		"name": "search",
		"size": 18,
		"class": "absolute left-3 top-1/2 -translate-y-1/2 size-[18px] text-muted-foreground"
	})}</div><div class="flex items-center gap-2"><button id="filter-all" class="filter-btn inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary-foreground">All</button><button id="filter-unread" class="filter-btn inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:border-primary hover:text-primary">Unread</button><button id="filter-read" class="filter-btn inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:border-primary hover:text-primary">Read</button></div></div><!-- Submissions List --><div id="submissions-container" class="space-y-4">${submissions.length === 0 ? renderTemplate`<div class="rounded-2xl border border-border bg-card/40 p-12 text-center">${renderComponent($$result, "Icon", $$Icon, {
		"name": "mail",
		"size": 48,
		"class": "mx-auto mb-4 size-12 text-muted-foreground"
	})}<h3 class="text-lg font-semibold text-foreground">No submissions yet</h3><p class="mt-2 text-sm text-muted-foreground">Contact form submissions will appear here</p></div>` : submissions.map((submission) => renderTemplate`<div${addAttribute(`submission-card rounded-2xl border border-border bg-card/40 p-6 transition-all hover:shadow-lg ${!submission.read ? "ring-1 ring-primary/20" : ""}`, "class")}${addAttribute(submission.id, "data-id")}${addAttribute(submission.read, "data-read")}><div class="flex items-start justify-between gap-4"><div class="flex-1 min-w-0"><div class="flex items-center gap-3 mb-2"><h3 class="font-semibold text-foreground">${submission.name}</h3>${!submission.read && renderTemplate`<span class="inline-flex items-center rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary">New</span>`}</div><p class="text-sm text-primary mb-3">${submission.email}</p><p class="text-sm text-muted-foreground line-clamp-2">${submission.message}</p><p class="mt-3 text-xs text-muted-foreground">${new Date(submission.timestamp).toLocaleString()}</p></div><div class="flex items-center gap-2"><button class="view-details-btn inline-flex items-center justify-center size-9 rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"${addAttribute(submission.id, "data-id")} title="View details" aria-label="View details">${renderComponent($$result, "Icon", $$Icon, {
		"name": "eye",
		"size": 16,
		"class": "size-4"
	})}</button><button class="toggle-read-btn inline-flex items-center justify-center size-9 rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"${addAttribute(submission.id, "data-id")}${addAttribute(submission.read, "data-read")}${addAttribute(submission.read ? "Mark as unread" : "Mark as read", "title")}${addAttribute(submission.read ? "Mark as unread" : "Mark as read", "aria-label")}>${renderComponent($$result, "Icon", $$Icon, {
		"name": submission.read ? "mail" : "mail-open",
		"size": 16,
		"class": "size-4"
	})}</button><button class="delete-btn inline-flex items-center justify-center size-9 rounded-lg border border-border text-muted-foreground transition-colors hover:border-red-500 hover:text-red-500"${addAttribute(submission.id, "data-id")} title="Delete" aria-label="Delete">${renderComponent($$result, "Icon", $$Icon, {
		"name": "trash-2",
		"size": 16,
		"class": "size-4"
	})}</button></div></div></div>`)}</div></main><!-- Modal for viewing details --><div id="detail-modal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/50 p-4 backdrop-blur-sm"><div class="w-full max-w-2xl rounded-2xl border border-border bg-card/95 p-8"><div class="flex items-center justify-between mb-6"><h2 class="text-xl font-bold text-foreground">Submission Details</h2><button id="close-modal" class="inline-flex items-center justify-center size-9 rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary" aria-label="Close">${renderComponent($$result, "Icon", $$Icon, {
		"name": "x",
		"size": 18,
		"class": "size-[18px]"
	})}</button></div><div id="modal-content" class="space-y-4"><div><p class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Name</p><p id="detail-name" class="mt-1 text-base text-foreground"></p></div><div><p class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</p><p id="detail-email" class="mt-1 text-base text-primary"></p></div><div><p class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Date</p><p id="detail-date" class="mt-1 text-base text-foreground"></p></div><div><p class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">IP Address</p><p id="detail-ip" class="mt-1 text-base text-foreground font-mono"></p></div><div><p class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">User Agent</p><p id="detail-useragent" class="mt-1 text-sm text-muted-foreground break-all"></p></div><div><p class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message</p><p id="detail-message" class="mt-1 text-base text-foreground whitespace-pre-wrap"></p></div></div></div></div></div>${renderScript($$result, "C:/laragon/www/Chada/src/pages/admin/index.astro?astro&type=script&index=0&lang.ts")}` })}`;
}, "C:/laragon/www/Chada/src/pages/admin/index.astro", void 0);
var $$file = "C:/laragon/www/Chada/src/pages/admin/index.astro";
var $$url = "/admin";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/index@_@astro
var page = () => admin_exports;
//#endregion
export { page };
