import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { C as createComponent, _ as addAttribute, a as renderComponent, d as renderTemplate, h as maybeRenderHead } from "./server_TAZ5Bv5Z.mjs";
import "./compiler_B66PZQ5e.mjs";
import { n as site_default, t as $$Layout } from "./Layout_BKxp8tHT.mjs";
//#region src/pages/showcase.astro
var showcase_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Showcase,
	file: () => $$file,
	url: () => $$url
});
var $$Showcase = createComponent(($$result, $$props, $$slots) => {
	const portfolio = site_default.portfolio;
	const projects = portfolio.featured;
	const categories = ["All", ...new Set(projects.map((p) => p.category))];
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-6felt6qx": true }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<header class="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-sm" data-astro-cid-6felt6qx><nav class="mx-auto max-w-7xl px-6 py-4" data-astro-cid-6felt6qx><ul class="flex flex-wrap items-center justify-center gap-6 text-sm font-medium" data-astro-cid-6felt6qx><li data-astro-cid-6felt6qx><a href="/" class="text-muted-foreground transition-colors hover:text-primary" data-astro-cid-6felt6qx>Home</a></li><li data-astro-cid-6felt6qx><a href="/#about" class="text-muted-foreground transition-colors hover:text-primary" data-astro-cid-6felt6qx>About Us</a></li><li data-astro-cid-6felt6qx><a href="/#services" class="text-muted-foreground transition-colors hover:text-primary" data-astro-cid-6felt6qx>Services</a></li><li data-astro-cid-6felt6qx><a href="/#portfolio" class="text-muted-foreground transition-colors hover:text-primary" data-astro-cid-6felt6qx>Our Work</a></li><li data-astro-cid-6felt6qx><a href="/showcase" class="text-primary" data-astro-cid-6felt6qx>Project Showcase</a></li><li data-astro-cid-6felt6qx><a href="/#products" class="text-muted-foreground transition-colors hover:text-primary" data-astro-cid-6felt6qx>Products</a></li><li data-astro-cid-6felt6qx><a href="/#contact" class="text-muted-foreground transition-colors hover:text-primary" data-astro-cid-6felt6qx>Contact</a></li></ul></nav></header><main class="min-h-screen bg-background" data-astro-cid-6felt6qx><!-- Hero Section --><section class="px-6 py-16 md:py-24" data-astro-cid-6felt6qx><div class="mx-auto max-w-4xl text-center" data-astro-cid-6felt6qx><span class="text-xs font-semibold uppercase tracking-[0.3em] text-primary" data-astro-cid-6felt6qx>${portfolio.badge}</span><h1 class="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl" data-astro-cid-6felt6qx>${portfolio.title} <span class="text-primary" data-astro-cid-6felt6qx>${portfolio.titleHighlight}</span></h1><p class="mt-4 text-base text-muted-foreground" data-astro-cid-6felt6qx>${portfolio.description}</p></div></section><!-- Category Filter --><section class="px-6 pb-8" data-astro-cid-6felt6qx><div class="mx-auto max-w-7xl" data-astro-cid-6felt6qx><div class="flex flex-wrap items-center justify-center gap-3" id="filter-container" data-astro-cid-6felt6qx>${categories.map((category) => renderTemplate`<button type="button"${addAttribute(category === "All" ? "all" : category, "data-category")} class="filter-btn active inline-flex items-center rounded-full border border-border bg-card/50 px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-300 hover:bg-primary/10 hover:text-primary"${addAttribute(category === "All" ? "true" : "false", "data-active")} data-astro-cid-6felt6qx>${category}</button>`)}</div></div></section><!-- Projects Grid --><section class="px-6 pb-20" data-astro-cid-6felt6qx><div class="mx-auto max-w-7xl" data-astro-cid-6felt6qx><div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" id="project-grid" data-astro-cid-6felt6qx>${projects.map((project) => renderTemplate`<div class="project-item animate-fade-in"${addAttribute(project.category, "data-category")} data-astro-cid-6felt6qx><button type="button" class="project-card group block w-full overflow-hidden rounded-2xl border border-border bg-card/40 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"${addAttribute(JSON.stringify(project), "data-project")} data-astro-cid-6felt6qx><div class="relative overflow-hidden" data-astro-cid-6felt6qx><img${addAttribute(project.alt, "alt")} class="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"${addAttribute(project.image, "src")} loading="lazy" data-astro-cid-6felt6qx><div class="absolute inset-0 bg-gradient-to-t from-[#0b1526] via-transparent to-transparent opacity-60" data-astro-cid-6felt6qx></div></div><div class="p-6" data-astro-cid-6felt6qx><h3 class="font-display text-lg font-bold tracking-tight text-foreground" data-astro-cid-6felt6qx>${project.title}</h3><p class="mt-1 text-sm text-muted-foreground" data-astro-cid-6felt6qx>${project.description}</p><div class="mt-3" data-astro-cid-6felt6qx><span class="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary" data-astro-cid-6felt6qx>${project.category}<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-3" data-astro-cid-6felt6qx><rect width="18" height="18" x="3" y="3" rx="2" ry="2" data-astro-cid-6felt6qx></rect><line x1="3" y1="9" x2="21" y2="9" data-astro-cid-6felt6qx></line><line x1="9" y1="21" x2="9" y2="9" data-astro-cid-6felt6qx></line></svg></span></div></div></button></div>`)}</div></div></section></main><div id="project-modal" class="fixed inset-0 z-[100] hidden" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" data-astro-cid-6felt6qx><div class="modal-backdrop absolute inset-0 bg-black/70 transition-all duration-300" style="opacity:0;backdrop-filter:blur(0px)" data-astro-cid-6felt6qx></div><div class="relative flex min-h-full items-center justify-center p-4 sm:p-6" data-astro-cid-6felt6qx><div class="modal-panel relative w-full max-w-4xl max-h-[85dvh] flex flex-col overflow-hidden rounded-2xl border border-border bg-[#0e1b2e] shadow-2xl transition-all duration-300" style="opacity:0;transform:scale(0.95) translateY(1rem)" data-astro-cid-6felt6qx><div class="flex items-center justify-between border-b border-border/50 px-6 py-5 sm:px-8" data-astro-cid-6felt6qx><div data-astro-cid-6felt6qx><span class="text-xs font-semibold uppercase tracking-[0.3em] text-primary" data-astro-cid-6felt6qx>Project Details</span><h2 id="project-modal-title" class="mt-1 font-display text-2xl font-bold tracking-tight sm:text-3xl text-foreground" data-astro-cid-6felt6qx></h2></div><button type="button" id="project-modal-close" class="inline-flex size-10 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-primary hover:text-primary" aria-label="Close project modal" data-astro-cid-6felt6qx><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-5" data-astro-cid-6felt6qx><path d="M18 6 6 18" data-astro-cid-6felt6qx></path><path d="m6 6 12 12" data-astro-cid-6felt6qx></path></svg></button></div><div class="flex-1 overflow-y-auto p-6 sm:p-8" style="-webkit-overflow-scrolling:touch;overscroll-behavior:contain" data-astro-cid-6felt6qx><div class="grid gap-8 md:grid-cols-2" data-astro-cid-6felt6qx><div class="relative overflow-hidden rounded-xl" data-astro-cid-6felt6qx><img id="project-modal-image" alt="" class="aspect-[4/3] w-full object-cover" src="" loading="lazy" data-astro-cid-6felt6qx><div class="absolute inset-0 bg-gradient-to-t from-[#0b1526] via-transparent to-transparent opacity-40" data-astro-cid-6felt6qx></div></div><div data-astro-cid-6felt6qx><span id="project-modal-category" class="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary" data-astro-cid-6felt6qx></span><p id="project-modal-description" class="mt-4 text-base text-muted-foreground" data-astro-cid-6felt6qx></p><a id="project-modal-link" href="" target="_blank" rel="noopener" class="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/40 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-primary transition-all duration-300 hover:bg-primary/10" data-astro-cid-6felt6qx>View Live Project<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-3.5" data-astro-cid-6felt6qx><path d="M7 7h10v10" data-astro-cid-6felt6qx></path><path d="M7 17 17 7" data-astro-cid-6felt6qx></path></svg></a></div></div></div></div></div></div><script>
    // Project filtering functionality
    document.addEventListener('DOMContentLoaded', function() {
      const filterButtons = document.querySelectorAll('.filter-btn');
      const projectItems = document.querySelectorAll('.project-item');

      filterButtons.forEach(function(button) {
        button.addEventListener('click', function() {
          // Update active state
          filterButtons.forEach(function(btn) {
            btn.setAttribute('data-active', 'false');
          });
          button.setAttribute('data-active', 'true');

          const selectedCategory = button.getAttribute('data-category');

          // Filter projects with smooth transitions
          projectItems.forEach(function(item) {
            const itemCategory = item.getAttribute('data-category');
            const shouldShow = selectedCategory === 'all' || itemCategory === selectedCategory;

            if (shouldShow) {
              item.style.display = 'block';
              item.style.animation = 'fadeIn 0.5s ease-out';
            } else {
              item.style.display = 'none';
            }
          });
        });
      });

      // Add click handlers for project cards
      const projectCards = document.querySelectorAll('.project-card');
      projectCards.forEach(function(card) {
        card.addEventListener('click', function() {
          const project = JSON.parse(card.getAttribute('data-project'));
          openProjectModal(project);
        });
      });
    });

    // Modal functionality
    function openProjectModal(project) {
      const modal = document.getElementById('project-modal');
      const backdrop = modal.querySelector('.modal-backdrop');
      const panel = modal.querySelector('.modal-panel');

      // Set modal content
      document.getElementById('project-modal-title').textContent = project.title;
      document.getElementById('project-modal-image').src = project.image;
      document.getElementById('project-modal-image').alt = project.alt;
      document.getElementById('project-modal-category').textContent = project.category;
      document.getElementById('project-modal-description').textContent = project.description;
      document.getElementById('project-modal-link').href = project.href;

      // Show modal with animation
      modal.classList.remove('hidden');
      modal.setAttribute('aria-hidden', 'false');

      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = scrollbarWidth + 'px';

      requestAnimationFrame(function() {
        backdrop.style.opacity = '1';
        backdrop.style.backdropFilter = 'blur(12px)';
        backdrop.style['-webkit-backdrop-filter'] = 'blur(12px)';
        panel.style.opacity = '1';
        panel.style.transform = 'scale(1) translateY(0)';
      });
    }

    function closeProjectModal() {
      const modal = document.getElementById('project-modal');
      const backdrop = modal.querySelector('.modal-backdrop');
      const panel = modal.querySelector('.modal-panel');

      backdrop.style.opacity = '0';
      backdrop.style.backdropFilter = 'blur(0px)';
      backdrop.style['-webkit-backdrop-filter'] = 'blur(0px)';
      panel.style.opacity = '0';
      panel.style.transform = 'scale(0.95) translateY(1rem)';

      setTimeout(function() {
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
      }, 300);
    }

    // Close modal event listeners
    document.getElementById('project-modal-close').addEventListener('click', closeProjectModal);
    document.getElementById('project-modal').addEventListener('click', function(e) {
      if (e.target === e.currentTarget) {
        closeProjectModal();
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        const modal = document.getElementById('project-modal');
        if (modal && !modal.classList.contains('hidden')) {
          closeProjectModal();
        }
      }
    });
  <\/script>` })}`;
}, "/app/src/pages/showcase.astro", void 0);
var $$file = "/app/src/pages/showcase.astro";
var $$url = "/showcase";
//#endregion
//#region \0virtual:astro:page:src/pages/showcase@_@astro
var page = () => showcase_exports;
//#endregion
export { page };
