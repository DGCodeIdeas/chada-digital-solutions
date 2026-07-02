import { C as createComponent, S as createAstro, _ as addAttribute, a as renderComponent, b as unescapeHTML, c as renderSlot, d as renderTemplate, g as renderHead } from "./server_TAZ5Bv5Z.mjs";
import "./compiler_B66PZQ5e.mjs";
var site_default = {
	settings: {
		"name": "Chada Digital",
		"url": "https://www.chadadigital.com",
		"logo": "https://www.chadadigital.com/chada-logo-horizontal.png",
		"ogImage": "https://www.chadadigital.com/og-image.jpg",
		"slogan": "Digital Solutions That Scale Businesses",
		"author": "Chada Digital",
		"copyright": "Chada Digital",
		"themeColor": "#0e1b2e",
		"locale": "en_NG",
		"priceRange": "$$$",
		"areaServed": "Worldwide",
		"schema": {
			"address": {
				"locality": "Lagos",
				"country": "NG"
			},
			"openingHours": {
				"days": [
					"Monday",
					"Tuesday",
					"Wednesday",
					"Thursday",
					"Friday"
				],
				"opens": "09:00",
				"closes": "18:00"
			},
			"contact": {
				"type": "Customer Service",
				"language": "English"
			}
		}
	},
	nav: [
		{
			"href": "#hero",
			"text": "Home"
		},
		{
			"href": "#about",
			"text": "About Us"
		},
		{
			"href": "#services",
			"text": "Services"
		},
		{
			"href": "#portfolio",
			"text": "Our Work"
		},
		{
			"href": "#products",
			"text": "Products"
		},
		{
			"href": "#contact",
			"text": "Contact"
		}
	],
	hero: {
		"badge": "Based in Lagos · Serving the World",
		"title": "Digital Solutions That",
		"titleHighlight": "Scale Businesses",
		"description": "We engineer high-performance websites, command-attention brands, and intelligent automation for ambitious teams across Nigeria and beyond.",
		"ctas": [{
			"href": "#contact",
			"text": "Start a Project",
			"primary": true
		}, {
			"href": "#portfolio",
			"text": "View Our Work",
			"primary": false
		}]
	},
	about: {
		"badge": "Trusted Digital Solutions For",
		"clients": [
			{
				"icon": "rocket",
				"title": "Startups",
				"description": "Helping startups build a strong digital foundation and launch with impact."
			},
			{
				"icon": "briefcase",
				"title": "SMEs",
				"description": "Digital systems that improve efficiency and drive sustainable growth."
			},
			{
				"icon": "building-2",
				"title": "Enterprises",
				"description": "Scalable solutions that modernize legacy systems and streamline operations."
			},
			{
				"icon": "users",
				"title": "Agencies",
				"description": "White-label development and design partnerships that expand your capabilities."
			}
		]
	},
	services: {
		"badge": "What We Do",
		"title": "Services That Drive",
		"titleHighlight": "Real Results",
		"description": "From concept to launch, we build digital products that are fast, beautiful, and built to convert.",
		"services": [
			{
				"icon": "code-2",
				"title": "Web Development",
				"description": "Custom websites and web applications built for speed, SEO, and conversion.",
				"link": {
					"href": "#contact",
					"text": "Learn More"
				}
			},
			{
				"icon": "palette",
				"title": "Brand Identity",
				"description": "Strategic branding that tells your story and creates lasting impressions.",
				"link": {
					"href": "#contact",
					"text": "Learn More"
				}
			},
			{
				"icon": "bot",
				"title": "Automation",
				"description": "Smart workflows and AI integrations that save time and reduce manual work.",
				"link": {
					"href": "#contact",
					"text": "Learn More"
				}
			},
			{
				"icon": "smartphone",
				"title": "Digital Strategy",
				"description": "Data-driven roadmaps that align your digital presence with business goals.",
				"link": {
					"href": "#contact",
					"text": "Learn More"
				}
			}
		]
	},
	portfolio: {
		"badge": "Our Work",
		"title": "Featured",
		"titleHighlight": "Projects",
		"description": "A selection of recent work across industries and use cases.",
		"button": {
			"href": "#",
			"text": "View All Projects",
			"id": "view-all-projects-btn"
		},
		"featured": [
			{
				"href": "/demos/sterling-vale",
				"alt": "Sterling & Vale",
				"image": "/assets/images/project-sterling.jpg",
				"title": "Sterling & Vale",
				"description": "Construction Firm — Corporate Website",
				"category": "Construction"
			},
			{
				"href": "/demos/apexflow",
				"alt": "ApexFlow",
				"image": "/assets/images/project-apexflow.jpg",
				"title": "ApexFlow",
				"description": "SaaS Platform — AI Automation",
				"category": "SaaS"
			},
			{
				"href": "/demos/hirebase",
				"alt": "HIREBASE",
				"image": "/assets/images/project-hirebase.jpg",
				"title": "HIREBASE",
				"description": "Recruitment — Job Board Platform",
				"category": "Recruitment"
			}
		]
	},
	products: {
		"badge": "Products & Solutions",
		"title": "Smart Tools That Make",
		"titleHighlight": "Work Easier",
		"description": "Pre-built solutions you can deploy immediately to solve common business challenges.",
		"products": [
			{
				"icon": "file-text",
				"title": "QuoteGen",
				"description": "Instant proposal and quotation generator for service businesses.",
				"link": {
					"href": "#contact",
					"text": "Get QuoteGen"
				}
			},
			{
				"icon": "calendar-check",
				"title": "BookingFlow",
				"description": "Appointment and booking management system for clinics, salons, and consultants.",
				"link": {
					"href": "#contact",
					"text": "Get BookingFlow"
				}
			},
			{
				"icon": "message-square",
				"title": "ChatDesk",
				"description": "AI-powered customer support chatbot that integrates with your website and CRM.",
				"link": {
					"href": "#contact",
					"text": "Get ChatDesk"
				}
			},
			{
				"icon": "bar-chart-3",
				"title": "InsightDash",
				"description": "Business analytics dashboard that connects your data sources for real-time insights.",
				"link": {
					"href": "#contact",
					"text": "Get InsightDash"
				}
			}
		]
	},
	contact: {
		"badge": "Contact",
		"title": "Let's build something that",
		"titleHighlight": "scales.",
		"description": "Ready to transform your digital presence? Tell us about your project and we'll get back to you within 24 hours.",
		"info": [
			{
				"label": "Email",
				"value": "info@chadadigital.com",
				"icon": "mail"
			},
			{
				"label": "Phone",
				"value": "+2349122974778",
				"icon": "phone"
			},
			{
				"label": "Location",
				"value": "Lagos, Nigeria",
				"icon": "map-pin"
			}
		],
		"socials": [
			{
				"href": "https://twitter.com/chadadigital",
				"label": "Twitter",
				"icon": "twitter"
			},
			{
				"href": "https://linkedin.com/company/chadadigital",
				"label": "LinkedIn",
				"icon": "linkedin"
			},
			{
				"href": "https://instagram.com/chadadigital",
				"label": "Instagram",
				"icon": "instagram"
			}
		],
		"form": {
			"action": "#",
			"method": "POST",
			"fields": [
				{
					"name": "name",
					"type": "text",
					"label": "Name",
					"placeholder": "Your name",
					"required": true
				},
				{
					"name": "email",
					"type": "email",
					"label": "Email",
					"placeholder": "your@email.com",
					"required": true
				},
				{
					"name": "message",
					"type": "textarea",
					"label": "Message",
					"placeholder": "Tell us about your project...",
					"required": true,
					"rows": 5
				}
			],
			"submitText": "Send Message"
		}
	},
	footer: {
		"company": "Chada Digital",
		"tagline": "Digital solutions that help businesses grow, automate, and scale.",
		"columns": [
			{
				"title": "Explore",
				"links": [
					{
						"href": "#hero",
						"text": "Home"
					},
					{
						"href": "#about",
						"text": "About"
					},
					{
						"href": "#services",
						"text": "Services"
					},
					{
						"href": "#portfolio",
						"text": "Portfolio"
					}
				]
			},
			{
				"title": "Services",
				"links": [
					{
						"href": "#services",
						"text": "Web Development"
					},
					{
						"href": "#services",
						"text": "Brand Identity"
					},
					{
						"href": "#services",
						"text": "Automation"
					},
					{
						"href": "#services",
						"text": "Digital Strategy"
					}
				]
			},
			{
				"title": "Connect",
				"links": [
					{
						"href": "#contact",
						"text": "Contact"
					},
					{
						"href": "https://twitter.com/chadadigital",
						"text": "Twitter"
					},
					{
						"href": "https://linkedin.com/company/chadadigital",
						"text": "LinkedIn"
					},
					{
						"href": "https://instagram.com/chadadigital",
						"text": "Instagram"
					}
				]
			}
		],
		"copyright": "© {year} Chada Digital · All rights reserved"
	},
	modal: {
		"badge": "Our Work",
		"title": "All Projects",
		"projects": [
			{
				"href": "/demos/sterling-vale",
				"alt": "Sterling & Vale",
				"image": "/assets/images/project-sterling.jpg",
				"title": "Sterling & Vale",
				"description": "Construction Firm — Corporate Website",
				"category": "Construction"
			},
			{
				"href": "/demos/apexflow",
				"alt": "ApexFlow",
				"image": "/assets/images/project-apexflow.jpg",
				"title": "ApexFlow",
				"description": "SaaS Platform — AI Automation",
				"category": "SaaS"
			},
			{
				"href": "/demos/noir",
				"alt": "NOIR",
				"image": "/assets/images/project-noir.jpg",
				"title": "NOIR",
				"description": "E-Commerce — Fashion Store",
				"category": "E-commerce"
			},
			{
				"href": "/demos/elysian",
				"alt": "ELYSIAN",
				"image": "/assets/images/project-elysian.jpg",
				"title": "ELYSIAN",
				"description": "Booking — Hotel & Spa",
				"category": "SaaS"
			},
			{
				"href": "/demos/hirebase",
				"alt": "HIREBASE",
				"image": "/assets/images/project-hirebase.jpg",
				"title": "HIREBASE",
				"description": "Recruitment — Job Board Platform",
				"category": "Recruitment"
			}
		]
	},
	"404": {
		"code": "404",
		"title": "Page Not Found",
		"message": "The page you are looking for doesn't exist or has been moved.",
		"button": {
			"href": "/",
			"text": "Go Back Home"
		}
	}
};
//#endregion
//#region src/components/SEO.astro
createAstro("https://www.chadadigital.com");
var $$SEO = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$SEO;
	const site = site_default;
	const { settings } = site;
	const { title = `${settings.name} — ${settings.slogan}`, description = site.hero.description, canonical = Astro.url.pathname === "/" ? settings.url : `${settings.url.replace(/\/$/, "")}${Astro.url.pathname}`, ogImage = settings.ogImage, noindex = false } = Astro.props;
	const schemaJson = {
		"@context": "https://schema.org",
		"@graph": [{
			"@type": ["Organization", "LocalBusiness"],
			name: settings.name,
			url: settings.url,
			logo: settings.logo,
			image: ogImage,
			description,
			slogan: settings.slogan,
			address: {
				"@type": "PostalAddress",
				addressLocality: settings.schema.address.locality,
				addressCountry: settings.schema.address.country
			},
			areaServed: settings.areaServed,
			priceRange: settings.priceRange,
			openingHoursSpecification: {
				"@type": "OpeningHoursSpecification",
				dayOfWeek: settings.schema.openingHours.days,
				opens: settings.schema.openingHours.opens,
				closes: settings.schema.openingHours.closes
			},
			contactPoint: {
				"@type": "ContactPoint",
				contactType: settings.schema.contact.type,
				availableLanguage: settings.schema.contact.language
			}
		}, {
			"@type": "WebSite",
			name: settings.name,
			url: settings.url,
			publisher: {
				"@type": "Organization",
				name: settings.name
			}
		}]
	};
	return renderTemplate`<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">${noindex ? renderTemplate`<meta name="robots" content="noindex, nofollow">` : renderTemplate`<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">`}<meta name="referrer" content="strict-origin-when-cross-origin"><meta name="author"${addAttribute(settings.author, "content")}><meta name="copyright"${addAttribute(settings.copyright, "content")}><meta name="theme-color"${addAttribute(settings.themeColor, "content")}><title>${title}</title><meta name="description"${addAttribute(description, "content")}><link rel="canonical"${addAttribute(canonical, "href")}><link rel="alternate"${addAttribute(settings.locale, "hreflang")}${addAttribute(canonical, "href")}><link rel="alternate" hreflang="x-default"${addAttribute(canonical, "href")}><meta property="og:url"${addAttribute(canonical, "content")}><meta property="og:site_name"${addAttribute(settings.name, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:type" content="website"><meta property="og:locale"${addAttribute(settings.locale, "content")}><meta property="og:image"${addAttribute(ogImage, "content")}><meta property="og:image:secure_url"${addAttribute(ogImage, "content")}><meta property="og:image:type" content="image/jpeg"><meta property="og:image:width" content="1216"><meta property="og:image:height" content="640"><meta property="og:image:alt"${addAttribute(title, "content")}><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(title, "content")}><meta name="twitter:description"${addAttribute(description, "content")}><meta name="twitter:image"${addAttribute(ogImage, "content")}><link rel="icon" href="/favicon.ico" sizes="any"><link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png"><link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><link rel="mask-icon" href="/safari-pinned-tab.svg"${addAttribute(settings.themeColor, "color")}><link rel="manifest" href="/site.webmanifest"><meta name="msapplication-TileColor"${addAttribute(settings.themeColor, "content")}><meta name="msapplication-config" content="/browserconfig.xml"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="dns-prefetch" href="https://fonts.googleapis.com"><link rel="dns-prefetch" href="https://fonts.gstatic.com"><link rel="preload" href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=Playfair+Display:wght@500;600;700;800&display=swap" as="style"><link rel="preload" href="/assets/css/styles.css" as="style"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=Playfair+Display:wght@500;600;700;800&display=swap"><link rel="stylesheet" href="/assets/css/styles.css"><script type="application/ld+json">${unescapeHTML(JSON.stringify(schemaJson))}<\/script>${renderSlot($$result, $$slots["head"])}`;
}, "/app/src/components/SEO.astro", void 0);
//#endregion
//#region src/layouts/Layout.astro
createAstro("https://www.chadadigital.com");
var $$Layout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Layout;
	const props = Astro.props;
	return renderTemplate`<html lang="en"><head>${renderComponent($$result, "SEO", $$SEO, { ...props })}${renderHead($$result)}</head><body>${renderSlot($$result, $$slots["default"])}<script src="/assets/js/main.js" defer><\/script></body></html>`;
}, "/app/src/layouts/Layout.astro", void 0);
//#endregion
export { site_default as n, $$Layout as t };
