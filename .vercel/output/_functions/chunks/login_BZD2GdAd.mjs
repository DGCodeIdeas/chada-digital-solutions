import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { C as createComponent, _ as addAttribute, a as renderComponent, d as renderTemplate, h as maybeRenderHead, n as renderScript } from "./server_TAZ5Bv5Z.mjs";
import "./compiler_B66PZQ5e.mjs";
import { n as site_default, t as $$Layout } from "./Layout_BKxp8tHT.mjs";
import { t as $$Icon } from "./Icon_PV0dPpLb.mjs";
//#region src/pages/admin/login.astro
var login_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Login,
	file: () => $$file,
	url: () => $$url
});
var $$Login = createComponent(($$result, $$props, $$slots) => {
	const { settings } = site_default;
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "Admin Login",
		"description": "Admin dashboard login"
	}, { "default": async ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="min-h-screen bg-background flex items-center justify-center px-6 py-12"><div class="w-full max-w-md"><!-- Logo/Brand --><div class="text-center mb-8"><a href="/" class="inline-flex items-center justify-center"><img${addAttribute(settings.name, "alt")} class="h-12 w-auto" src="/chada-mark.png"></a><h1 class="mt-6 text-2xl font-bold text-foreground">Admin Dashboard</h1><p class="mt-2 text-sm text-muted-foreground">Sign in to manage submissions</p></div><!-- Login Form --><div class="rounded-2xl border border-border bg-card/40 p-8"><form id="admin-login-form" class="space-y-6"><div><label for="password" class="block text-sm font-medium text-foreground mb-2">Password</label><div class="relative"><input id="password" name="password" type="password" required placeholder="Enter your password" class="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors" autocomplete="current-password"><button type="button" id="toggle-password" class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label="Toggle password visibility">${renderComponent($$result, "Icon", $$Icon, {
		"name": "eye",
		"size": 18,
		"class": "size-[18px]"
	})}</button></div><p id="login-error" class="mt-2 text-xs font-medium text-red-500" role="alert"></p></div><button type="submit" id="login-btn" class="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30"><span id="login-label">Sign In</span><svg id="login-spinner" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="size-4 animate-spin" style="display:none;"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg></button></form></div><!-- Back to site link --><div class="mt-6 text-center"><a href="/" class="text-sm text-muted-foreground hover:text-primary transition-colors">← Back to website</a></div></div></div>${renderScript($$result, "/app/src/pages/admin/login.astro?astro&type=script&index=0&lang.ts")}` })}`;
}, "/app/src/pages/admin/login.astro", void 0);
var $$file = "/app/src/pages/admin/login.astro";
var $$url = "/admin/login";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/login@_@astro
var page = () => login_exports;
//#endregion
export { page };
