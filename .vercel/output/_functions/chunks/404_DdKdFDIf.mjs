import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { C as createComponent, _ as addAttribute, a as renderComponent, d as renderTemplate, h as maybeRenderHead } from "./server_TAZ5Bv5Z.mjs";
import "./compiler_B66PZQ5e.mjs";
import { n as site_default, t as $$Layout } from "./Layout_BKxp8tHT.mjs";
//#region src/pages/404.astro
var _404_exports = /* @__PURE__ */ __exportAll({
	default: () => $$404,
	file: () => $$file,
	url: () => $$url
});
var $$404 = createComponent(($$result, $$props, $$slots) => {
	const { settings, 404: error404 } = site_default;
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": `${error404.title} — ${settings.name}`,
		"noindex": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="flex min-h-screen items-center justify-center px-6"><div class="text-center"><span class="text-6xl font-extrabold text-primary">${error404.code}</span><h1 class="mt-4 font-display text-2xl font-bold tracking-tight md:text-4xl">${error404.title}</h1><p class="mt-4 max-w-md mx-auto text-muted-foreground">${error404.message}</p><a${addAttribute(error404.button.href, "href")} class="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30">${error404.button.text}</a></div></main>` })}`;
}, "/app/src/pages/404.astro", void 0);
var $$file = "/app/src/pages/404.astro";
var $$url = "/404";
//#endregion
//#region \0virtual:astro:page:src/pages/404@_@astro
var page = () => _404_exports;
//#endregion
export { page };
