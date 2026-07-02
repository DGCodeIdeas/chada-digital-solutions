import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { C as createComponent, _ as addAttribute, a as renderComponent, d as renderTemplate, h as maybeRenderHead, n as renderScript } from "./server_TAZ5Bv5Z.mjs";
import "./compiler_B66PZQ5e.mjs";
import { n as site_default, t as $$Layout } from "./Layout_BKxp8tHT.mjs";
import { t as $$Icon } from "./Icon_PV0dPpLb.mjs";
//#region src/components/Header.astro
var $$Header = createComponent(($$result, $$props, $$slots) => {
	const { settings, nav, hero } = site_default;
	const headerCta = hero.ctas[0];
	return renderTemplate`${maybeRenderHead($$result)}<header class="sticky top-0 z-50 border-b border-border/40 bg-background/85 backdrop-blur-xl"><div class="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6"><a class="inline-flex items-center" href="#hero"><img${addAttribute(`${settings.name} — ${settings.slogan}`, "alt")} class="h-12 md:h-14 w-auto object-contain" src="/chada-logo-horizontal.png"></a><nav class="hidden items-center gap-7 lg:flex">${nav.map((item) => renderTemplate`<a class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"${addAttribute(item.href, "href")}>${item.text}</a>`)}</nav><a class="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-transform hover:-translate-y-0.5 md:inline-flex"${addAttribute(headerCta.href, "href")}>${headerCta.text}${renderComponent($$result, "Icon", $$Icon, {
		"name": "arrow-right",
		"size": 14,
		"class": "size-3.5"
	})}</a><button aria-controls="mobile-menu" aria-expanded="false" aria-label="Toggle menu" class="lg:hidden inline-flex size-10 items-center justify-center rounded-md border border-border text-foreground" id="nav-toggle"><div class="space-y-1.5"><span class="block h-0.5 w-5 bg-current"></span><span class="block h-0.5 w-5 bg-current"></span><span class="block h-0.5 w-5 bg-current"></span></div></button></div><div aria-hidden="true" class="hidden" id="mobile-menu"><nav class="flex flex-col gap-4 border-t border-border/40 bg-background/95 px-6 py-6 backdrop-blur-xl">${nav.map((item) => renderTemplate`<a class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"${addAttribute(item.href, "href")}>${item.text}</a>`)}<a class="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-transform hover:-translate-y-0.5"${addAttribute(headerCta.href, "href")}>${headerCta.text}</a></nav></div></header>`;
}, "/app/src/components/Header.astro", void 0);
//#endregion
//#region src/components/Hero.astro
var $$Hero = createComponent(($$result, $$props, $$slots) => {
	const { hero } = site_default;
	return renderTemplate`${maybeRenderHead($$result)}<section class="relative overflow-hidden px-6 pb-20 pt-12 md:pt-20" id="hero"><div aria-hidden="true" class="pointer-events-none absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-primary/20 blur-[140px]"></div><div aria-hidden="true" class="pointer-events-none absolute -right-32 top-32 h-[520px] w-[520px] rounded-full bg-primary/15 blur-[160px]"></div><div class="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2"><div><span class="mb-5 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-primary">${hero.badge}</span><h1 class="font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">${hero.title}<br><span class="text-primary">${hero.titleHighlight}</span>.</h1><p class="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">${hero.description}</p><div class="mt-8 flex flex-wrap gap-4">${hero.ctas.map((cta) => renderTemplate`<a${addAttribute(cta.primary ? "group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30" : "inline-flex items-center gap-2 rounded-full border border-primary/40 px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-primary transition-colors hover:bg-primary/10", "class")}${addAttribute(cta.href, "href")}>${cta.text}${renderComponent($$result, "Icon", $$Icon, {
		"name": "arrow-right",
		"size": 16,
		"class": cta.primary ? "size-4 transition-transform group-hover:translate-x-1" : "size-4"
	})}</a>`)}</div></div></div></section>`;
}, "/app/src/components/Hero.astro", void 0);
//#endregion
//#region src/components/About.astro
var $$About = createComponent(($$result, $$props, $$slots) => {
	const { about } = site_default;
	return renderTemplate`${maybeRenderHead($$result)}<section class="border-t border-border/40 bg-card/40 px-6 py-16 md:py-20" id="about"><div class="mx-auto max-w-7xl text-center"><span class="text-xs font-semibold uppercase tracking-[0.3em] text-primary">${about.badge}</span><div class="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">${about.clients.map((client) => renderTemplate`<div class="flex flex-col items-center"><div class="mb-4 inline-flex size-14 items-center justify-center rounded-2xl bg-primary/15 text-primary">${renderComponent($$result, "Icon", $$Icon, {
		"name": client.icon,
		"size": 24,
		"class": "size-6",
		"strokeWidth": 1.75
	})}</div><h3 class="font-display text-base font-bold">${client.title}</h3><p class="mt-2 max-w-[14rem] text-xs leading-relaxed text-muted-foreground">${client.description}</p></div>`)}</div></div></section>`;
}, "/app/src/components/About.astro", void 0);
//#endregion
//#region src/components/Services.astro
var $$Services = createComponent(($$result, $$props, $$slots) => {
	const { services } = site_default;
	return renderTemplate`${maybeRenderHead($$result)}<section class="px-6 py-20 md:py-28" id="services"><div class="mx-auto max-w-7xl"><div class="mb-14 text-center"><span class="text-xs font-semibold uppercase tracking-[0.3em] text-primary">${services.badge}</span><h2 class="mt-4 font-display text-3xl font-bold tracking-tight md:text-5xl">${services.title} <span class="text-primary">${services.titleHighlight}</span></h2><p class="mt-4 max-w-2xl mx-auto text-base text-muted-foreground">${services.description}</p></div><div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">${services.services.map((service) => renderTemplate`<div class="group rounded-2xl border border-border bg-card/40 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card/60"><div class="mb-5 inline-flex size-12 items-center justify-center rounded-xl bg-primary/15 text-primary">${renderComponent($$result, "Icon", $$Icon, {
		"name": service.icon,
		"size": 24,
		"class": "size-6",
		"strokeWidth": 1.75
	})}</div><h3 class="font-display text-lg font-bold tracking-tight">${service.title}</h3><p class="mt-3 text-sm leading-relaxed text-muted-foreground">${service.description}</p><a class="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary transition-colors group-hover:text-primary-foreground"${addAttribute(service.link.href, "href")}>${service.link.text}${renderComponent($$result, "Icon", $$Icon, {
		"name": "arrow-right",
		"size": 12,
		"class": "size-3 transition-transform group-hover:translate-x-1"
	})}</a></div>`)}</div></div></section>`;
}, "/app/src/components/Services.astro", void 0);
//#endregion
//#region src/components/Portfolio.astro
var $$Portfolio = createComponent(($$result, $$props, $$slots) => {
	const { portfolio } = site_default;
	return renderTemplate`${maybeRenderHead($$result)}<section class="px-6 py-20 md:py-28" id="portfolio"><div class="mx-auto max-w-7xl"><div class="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"><div><span class="text-xs font-semibold uppercase tracking-[0.3em] text-primary">${portfolio.badge}</span><h2 class="mt-4 font-display text-3xl font-bold tracking-tight md:text-5xl">${portfolio.title} <span class="text-primary">${portfolio.titleHighlight}</span></h2><p class="mt-4 max-w-xl text-base text-muted-foreground">${portfolio.description}</p></div><a href="/showcase" class="inline-flex items-center gap-2 rounded-full border border-primary/40 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-primary transition-colors hover:bg-primary/10">${portfolio.button.text}${renderComponent($$result, "Icon", $$Icon, {
		"name": "arrow-right",
		"size": 14,
		"class": "size-3.5"
	})}</a></div><div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">${portfolio.featured.map((project) => renderTemplate`<a${addAttribute(project.href, "href")} rel="noopener" target="_blank" class="group block overflow-hidden rounded-2xl border border-border bg-card/40 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"><div class="relative overflow-hidden"><img${addAttribute(project.alt, "alt")} class="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"${addAttribute(project.image, "src")} loading="lazy"><div class="absolute inset-0 bg-gradient-to-t from-[#0b1526] via-transparent to-transparent opacity-60"></div></div><div class="p-6"><h3 class="font-display text-lg font-bold tracking-tight">${project.title}</h3><p class="mt-1 text-sm text-muted-foreground">${project.description}</p></div></a>`)}</div></div></section>`;
}, "/app/src/components/Portfolio.astro", void 0);
//#endregion
//#region src/components/Products.astro
var $$Products = createComponent(($$result, $$props, $$slots) => {
	const { products } = site_default;
	return renderTemplate`${maybeRenderHead($$result)}<section class="border-t border-border/40 bg-card/40 px-6 py-20 md:py-28" id="products"><div class="mx-auto max-w-7xl"><div class="mb-14 text-center"><span class="text-xs font-semibold uppercase tracking-[0.3em] text-primary">${products.badge}</span><h2 class="mt-4 font-display text-3xl font-bold tracking-tight md:text-5xl">${products.title} <span class="text-primary">${products.titleHighlight}</span></h2><p class="mt-4 max-w-2xl mx-auto text-base text-muted-foreground">${products.description}</p></div><div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">${products.products.map((product) => renderTemplate`<div class="group rounded-2xl border border-border bg-background p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card/40"><div class="mb-5 inline-flex size-12 items-center justify-center rounded-xl bg-primary/15 text-primary">${renderComponent($$result, "Icon", $$Icon, {
		"name": product.icon,
		"size": 24,
		"class": "size-6",
		"strokeWidth": 1.75
	})}</div><h3 class="font-display text-lg font-bold tracking-tight">${product.title}</h3><p class="mt-3 text-sm leading-relaxed text-muted-foreground">${product.description}</p><a class="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary transition-colors group-hover:text-primary-foreground"${addAttribute(product.link.href, "href")}>${product.link.text}${renderComponent($$result, "Icon", $$Icon, {
		"name": "arrow-right",
		"size": 12,
		"class": "size-3 transition-transform group-hover:translate-x-1"
	})}</a></div>`)}</div></div></section>`;
}, "/app/src/components/Products.astro", void 0);
//#endregion
//#region src/components/Contact.astro
var $$Contact = createComponent(($$result, $$props, $$slots) => {
	const { contact } = site_default;
	return renderTemplate`${maybeRenderHead($$result)}<section class="border-t border-border/40 px-6 py-20 md:py-28" id="contact" data-astro-cid-he3spzz3><div class="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2" data-astro-cid-he3spzz3><div data-astro-cid-he3spzz3><span class="text-xs font-semibold uppercase tracking-[0.3em] text-primary" data-astro-cid-he3spzz3>${contact.badge}</span><h2 class="mt-4 font-display text-3xl font-bold tracking-tight md:text-5xl" data-astro-cid-he3spzz3>${contact.title} <span class="text-primary" data-astro-cid-he3spzz3>${contact.titleHighlight}</span></h2><p class="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground" data-astro-cid-he3spzz3>${contact.description}</p><div class="mt-10 space-y-6" data-astro-cid-he3spzz3>${contact.info.map((item) => renderTemplate`<div class="flex items-start gap-4" data-astro-cid-he3spzz3><div class="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary" data-astro-cid-he3spzz3>${renderComponent($$result, "Icon", $$Icon, {
		"name": item.icon,
		"size": 18,
		"class": "size-[18px]",
		"strokeWidth": 1.75,
		"data-astro-cid-he3spzz3": true
	})}</div><div data-astro-cid-he3spzz3><p class="text-sm font-semibold text-muted-foreground" data-astro-cid-he3spzz3>${item.label}</p><p class="font-semibold text-foreground" data-astro-cid-he3spzz3>${item.value}</p></div></div>`)}</div><div class="mt-10 flex gap-4" data-astro-cid-he3spzz3>${contact.socials.map((social) => renderTemplate`<a${addAttribute(social.href, "href")} target="_blank" rel="noopener"${addAttribute(social.label, "aria-label")} class="inline-flex size-10 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary" data-astro-cid-he3spzz3>${renderComponent($$result, "Icon", $$Icon, {
		"name": social.icon,
		"size": 18,
		"class": "size-[18px]",
		"strokeWidth": 1.75,
		"data-astro-cid-he3spzz3": true
	})}</a>`)}</div></div><div class="rounded-2xl border border-border bg-card/40 p-8 md:p-10" data-astro-cid-he3spzz3><!-- Success state --><div id="form-success" style="display:none;" class="flex flex-col items-center justify-center text-center py-12" data-astro-cid-he3spzz3><div class="inline-flex size-16 items-center justify-center rounded-full bg-primary/15 text-primary mb-6" data-astro-cid-he3spzz3>${renderComponent($$result, "Icon", $$Icon, {
		"name": "check",
		"size": 28,
		"class": "size-7",
		"strokeWidth": 2.5,
		"data-astro-cid-he3spzz3": true
	})}</div><h3 class="text-xl font-bold mb-3" data-astro-cid-he3spzz3>Message Sent!</h3><p class="text-muted-foreground max-w-xs" data-astro-cid-he3spzz3>Thank you for reaching out. We'll get back to you within 24 hours.</p></div><!-- Contact form --><form id="chada-contact-form" class="space-y-6" novalidate data-astro-cid-he3spzz3><!-- Honeypot: hidden from humans via CSS, filled by bots --><p class="chada-honeypot" data-astro-cid-he3spzz3><label data-astro-cid-he3spzz3>Don't fill this out: <input name="bot-field" data-astro-cid-he3spzz3></label></p>${contact.form.fields.map((field) => renderTemplate`<div class="chada-form-group" data-astro-cid-he3spzz3><label class="mb-2 block text-sm font-medium"${addAttribute(field.name, "for")} data-astro-cid-he3spzz3>${field.label}${field.required && renderTemplate`<span class="ml-0.5 text-primary" aria-hidden="true" data-astro-cid-he3spzz3>*</span>`}</label>${field.type === "textarea" ? renderTemplate`<textarea${addAttribute(field.name, "id")}${addAttribute(field.name, "name")}${addAttribute(field.rows, "rows")}${addAttribute(field.required, "required")}${addAttribute(field.placeholder, "placeholder")} class="chada-field-input w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors" data-astro-cid-he3spzz3></textarea>` : renderTemplate`<input${addAttribute(field.name, "id")}${addAttribute(field.name, "name")}${addAttribute(field.type, "type")}${addAttribute(field.required, "required")}${addAttribute(field.placeholder, "placeholder")} class="chada-field-input w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors" data-astro-cid-he3spzz3>`}<p class="chada-error-msg mt-1.5 text-xs font-medium text-red-500" role="alert" data-astro-cid-he3spzz3></p></div>`)}<p id="chada-form-error" class="text-sm font-medium text-red-500 text-center" role="alert" aria-live="polite" data-astro-cid-he3spzz3></p><button type="submit" id="chada-submit-btn" class="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30" data-astro-cid-he3spzz3><span id="chada-submit-label" data-astro-cid-he3spzz3>${contact.form.submitText}</span><span id="chada-submit-arrow" data-astro-cid-he3spzz3>${renderComponent($$result, "Icon", $$Icon, {
		"name": "arrow-right",
		"size": 16,
		"class": "size-4",
		"data-astro-cid-he3spzz3": true
	})}</span><svg id="chada-submit-spinner" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="size-4 animate-spin" style="display:none;" aria-hidden="true" data-astro-cid-he3spzz3><path d="M21 12a9 9 0 1 1-6.219-8.56" data-astro-cid-he3spzz3></path></svg></button></form></div></div></section>${renderScript($$result, "/app/src/components/Contact.astro?astro&type=script&index=0&lang.ts")}`;
}, "/app/src/components/Contact.astro", void 0);
//#endregion
//#region src/components/Footer.astro
var $$Footer = createComponent(($$result, $$props, $$slots) => {
	const { settings, footer } = site_default;
	const year = (/* @__PURE__ */ new Date()).getFullYear();
	return renderTemplate`${maybeRenderHead($$result)}<footer class="border-t border-border/40 bg-card/40 px-6 py-16"><div class="mx-auto max-w-7xl"><div class="grid gap-12 sm:grid-cols-2 lg:grid-cols-4"><div class="sm:col-span-2 lg:col-span-1"><img${addAttribute(settings.name, "alt")} class="h-10 w-auto object-contain" src="/chada-logo-horizontal.png"><p class="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">${footer.tagline}</p></div>${footer.columns.map((column) => renderTemplate`<div><h4 class="font-display text-sm font-semibold uppercase tracking-widest">${column.title}</h4><ul class="mt-6 space-y-3">${column.links.map((link) => renderTemplate`<li><a class="text-sm text-muted-foreground transition-colors hover:text-foreground"${addAttribute(link.href, "href")}${addAttribute(link.href.startsWith("http") ? "_blank" : void 0, "target")}${addAttribute(link.href.startsWith("http") ? "noopener" : void 0, "rel")}>${link.text}</a></li>`)}</ul></div>`)}</div><div class="mt-12 border-t border-border/40 pt-8 text-center"><p class="text-sm text-muted-foreground">${footer.copyright.replace("{year}", String(year))}</p></div></div></footer>`;
}, "/app/src/components/Footer.astro", void 0);
//#endregion
//#region src/components/ProjectsModal.astro
var $$ProjectsModal = createComponent(($$result, $$props, $$slots) => {
	const { modal } = site_default;
	return renderTemplate`${maybeRenderHead($$result)}<!-- Projects Modal --><div id="projects-modal" class="fixed inset-0 z-[100] hidden" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="projects-modal-title"><div class="modal-backdrop absolute inset-0 bg-black/70 transition-all duration-300" style="opacity:0;backdrop-filter:blur(0px)"></div><div class="relative flex min-h-full items-center justify-center p-4 sm:p-6"><div class="modal-panel relative w-full max-w-6xl max-h-[85dvh] flex flex-col overflow-hidden rounded-2xl border border-border bg-[#0e1b2e] shadow-2xl transition-all duration-300" style="opacity:0;transform:scale(0.95) translateY(1rem)"><div class="flex items-center justify-between border-b border-border/50 px-6 py-5 sm:px-8"><div><span class="text-xs font-semibold uppercase tracking-[0.3em] text-primary">${modal.badge}</span><h2 id="projects-modal-title" class="mt-1 font-display text-2xl font-bold tracking-tight sm:text-3xl text-foreground">${modal.title}</h2></div><button type="button" id="projects-modal-close" class="inline-flex size-10 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-primary hover:text-primary" aria-label="Close projects modal">${renderComponent($$result, "Icon", $$Icon, {
		"name": "x",
		"size": 20,
		"class": "size-5"
	})}</button></div><div class="flex-1 overflow-y-auto p-6 sm:p-8" style="-webkit-overflow-scrolling:touch;overscroll-behavior:contain"><div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">${modal.projects.map((project) => renderTemplate`<a${addAttribute(project.href, "href")} rel="noopener" target="_blank" class="group block overflow-hidden rounded-xl border border-border bg-[#0b1526] transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"><div class="relative overflow-hidden"><img${addAttribute(project.alt, "alt")} class="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"${addAttribute(project.image, "src")} loading="lazy"><div class="absolute inset-0 bg-gradient-to-t from-[#0b1526] via-transparent to-transparent opacity-60"></div></div><div class="p-5"><h3 class="font-display text-lg font-semibold tracking-tight text-foreground">${project.title}</h3><p class="mt-1 text-sm text-muted-foreground">${project.description}</p><span class="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary transition-colors group-hover:text-primary-foreground">View Site${renderComponent($$result, "Icon", $$Icon, {
		"name": "arrow-right",
		"size": 12,
		"class": "size-3"
	})}</span></div></a>`)}</div></div></div></div></div>`;
}, "/app/src/components/ProjectsModal.astro", void 0);
//#endregion
//#region src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
var POST = async ({ request }) => {
	const apiUrl = new URL("/api/contact", request.url);
	const body = await request.text();
	const response = await fetch(apiUrl.toString(), {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body
	});
	const responseBody = await response.text();
	return new Response(responseBody, {
		status: response.status,
		headers: { "Content-Type": "application/json" }
	});
};
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Header", $$Header, {})}${maybeRenderHead($$result)}<main>${renderComponent($$result, "Hero", $$Hero, {})}${renderComponent($$result, "About", $$About, {})}${renderComponent($$result, "Services", $$Services, {})}${renderComponent($$result, "Portfolio", $$Portfolio, {})}${renderComponent($$result, "Products", $$Products, {})}${renderComponent($$result, "Contact", $$Contact, {})}</main>${renderComponent($$result, "Footer", $$Footer, {})}${renderComponent($$result, "ProjectsModal", $$ProjectsModal, {})}` })}`;
}, "/app/src/pages/index.astro", void 0);
var $$file = "/app/src/pages/index.astro";
//#endregion
//#region \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
//#endregion
export { page };
