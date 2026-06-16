import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import {
  ArrowRight,
  Code2,
  Palette,
  Settings,
  TrendingUp,
  Rocket,
  Briefcase,
  Users,
  LineChart,
  Target,
  ShieldCheck,
  Heart,
  Headphones,
  FileText,
  Cog,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Quote,
} from "lucide-react";

import { Toaster } from "@/components/ui/sonner";
import chadaLogo from "@/assets/chada-logo-horizontal.png.asset.json";
import chadaMark from "@/assets/chada-mark.png.asset.json";
import heroDevices from "@/assets/hero-devices.jpg";
import projectRealestate from "@/assets/project-realestate.jpg";
import projectFintech from "@/assets/project-fintech.jpg";
import projectCorporate from "@/assets/project-corporate.jpg";
import projectFood from "@/assets/project-food.jpg";

const SITE_URL = "https://chadadigital.lovable.app";
const SITE_TITLE = "Chada Digital — Digital Solutions That Scale Businesses";
const SITE_DESC =
  "Chada Digital builds high-performance websites, brand identities, and intelligent automation that scale ambitious businesses across Nigeria and beyond.";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESC },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1216" },
      { property: "og:image:height", content: "640" },
      { property: "og:image:alt", content: "Chada Digital — Digital Solutions That Scale Businesses" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESC },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Chada Digital",
          url: SITE_URL,
          logo: `${SITE_URL}/og-image.jpg`,
          description: SITE_DESC,
          slogan: "Digital Solutions That Scale Businesses",
          address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
          areaServed: "Worldwide",
        }),
      },
    ],
  }),
  component: Index,
});


function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 overflow-x-hidden">
      <Nav />
      <main>
        <Hero />
        <TrustedFor />
        <Services />
        <WhyUs />
        <Portfolio />
        <Products />
        <Testimonial />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
      <Toaster theme="dark" position="top-center" />
    </div>
  );
}

const NAV_LINKS = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About Us" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Our Work" },
  { href: "#products", label: "Products" },
  { href: "#contact", label: "Contact" },
];

function Logo({ className = "h-10" }: { className?: string }) {
  return (
    <a href="#hero" className="inline-flex items-center">
      <img src={chadaLogo.url} alt="Chada Digital — Digital Solutions That Scale Businesses" className={`${className} w-auto object-contain`} />
    </a>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6">
        <Logo className="h-12 md:h-14" />
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-transform hover:-translate-y-0.5 md:inline-flex"
        >
          Start a Project <ArrowRight className="size-3.5" />
        </a>
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden inline-flex size-10 items-center justify-center rounded-md border border-border text-foreground"
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
          </div>
        </button>
      </div>
      {open && (
        <div className="border-t border-border/40 bg-background lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-6 py-4">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium text-muted-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground"
            >
              Start a Project <ArrowRight className="size-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden px-6 pb-20 pt-12 md:pt-20">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-primary/20 blur-[140px]" />
      <div aria-hidden className="pointer-events-none absolute -right-32 top-32 h-[520px] w-[520px] rounded-full bg-primary/15 blur-[160px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="mb-5 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Based in Lagos · Serving the World
          </span>
          <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
            Digital Solutions That <br />
            <span className="text-primary">Scale Businesses</span>.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            We engineer high-performance websites, command-attention brands, and intelligent
            automation for ambitious teams across Nigeria and beyond.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30"
            >
              Start a Project <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-primary transition-colors hover:bg-primary/10"
            >
              View Our Work <ArrowRight className="size-4" />
            </a>
          </div>
          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-2">
              {["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981"].map((c) => (
                <span
                  key={c}
                  className="inline-block size-8 rounded-full border-2 border-background"
                  style={{ background: c }}
                />
              ))}
            </div>
            <p className="text-xs leading-tight text-muted-foreground">
              Trusted by startups, SMEs &<br />growing brands across industries.
            </p>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="absolute inset-0 -z-10 rounded-full bg-primary/20 blur-3xl" aria-hidden />
          <img
            src={heroDevices}
            alt="Chada Digital website shown on laptop and phone"
            className="relative w-full mix-blend-screen"
            width={1280}
            height={960}
            style={{
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 65% at 50% 50%, #000 45%, rgba(0,0,0,0.6) 65%, transparent 88%)",
              maskImage:
                "radial-gradient(ellipse 70% 65% at 50% 50%, #000 45%, rgba(0,0,0,0.6) 65%, transparent 88%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}

const AUDIENCES = [
  { icon: Rocket, title: "Startups", body: "Helping startups build a strong digital foundation." },
  { icon: Briefcase, title: "SMEs", body: "Digital systems that improve efficiency and growth." },
  { icon: Users, title: "Agencies", body: "White-label solutions and reliable tech partnerships." },
  { icon: LineChart, title: "Growing Brands", body: "Scalable solutions for brands ready to expand." },
];

function TrustedFor() {
  return (
    <section id="about" className="border-t border-border/40 bg-card/40 px-6 py-16 md:py-20">
      <div className="mx-auto max-w-7xl text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          Trusted Digital Solutions For
        </span>
        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCES.map((a) => (
            <div key={a.title} className="flex flex-col items-center">
              <div className="mb-4 inline-flex size-14 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <a.icon className="size-6" strokeWidth={1.75} />
              </div>
              <h3 className="font-display text-base font-bold">{a.title}</h3>
              <p className="mt-2 max-w-[14rem] text-xs leading-relaxed text-muted-foreground">{a.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  { icon: Code2, title: "Web Development", body: "High-performance websites built for speed, SEO, and conversions." },
  { icon: Palette, title: "Brand Identity", body: "Logos, brand systems, and visual identities that make businesses memorable." },
  { icon: Settings, title: "Automation Solutions", body: "Streamline repetitive tasks and improve efficiency with smart workflows." },
  { icon: TrendingUp, title: "Digital Strategy", body: "Technology-driven strategies that help businesses scale sustainably." },
];

function Services() {
  return (
    <section id="services" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">What We Do</span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-5xl">
            Services That Drive Real Results
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <article
              key={s.title}
              className="group rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-primary/40"
            >
              <div className="mb-6 inline-flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <s.icon className="size-5" strokeWidth={1.75} />
              </div>
              <h3 className="font-display text-lg font-bold tracking-tight">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              <a href="#contact" className="mt-5 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-primary">
                Explore our {s.title.toLowerCase()} services <ArrowRight className="size-3" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const REASONS = [
  { icon: Target, title: "Results-Driven", body: "We focus on solutions that drive measurable growth." },
  { icon: ShieldCheck, title: "Modern & Reliable", body: "We use the latest technology to build future-ready solutions." },
  { icon: Heart, title: "Client-Centered", body: "Your goals are at the center of everything we do." },
  { icon: Headphones, title: "Support That Cares", body: "We're with you, even after the project is done." },
];

function WhyUs() {
  return (
    <section id="why-us" className="border-y border-border/40 bg-card/40 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 grid items-end gap-6 md:grid-cols-[1fr_auto]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Why Choose Chada Digital
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">
              Your Growth Is <br /> Our Mission.
            </h2>
          </div>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((r) => (
            <div key={r.title}>
              <div className="mb-4 inline-flex size-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                <r.icon className="size-5" strokeWidth={1.75} />
              </div>
              <h3 className="font-display text-base font-bold">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const PROJECTS = [
  { image: projectRealestate, name: "Veritas Homes", category: "Real Estate Website" },
  { image: projectFintech, name: "KudaClone", category: "Fintech Website" },
  { image: projectCorporate, name: "Brix & Stone", category: "Corporate Website" },
  { image: projectFood, name: "Foodie Express", category: "Food Delivery Website" },
];

function Portfolio() {
  return (
    <section id="portfolio" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Our Work</span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
              Featured Projects
            </h2>
          </div>
          <a href="#contact" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
            View All Projects <ArrowRight className="size-3.5" />
          </a>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROJECTS.map((p) => (
            <article key={p.name} className="group">
              <div className="overflow-hidden rounded-xl border border-border bg-background">
                <img
                  src={p.image}
                  alt={p.name}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  width={800}
                  height={600}
                />
              </div>
              <h3 className="mt-4 font-display text-base font-bold tracking-tight">{p.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{p.category}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const PRODUCTS = [
  {
    icon: FileText,
    color: "from-violet-500 to-fuchsia-500",
    title: "AI CV Builder",
    body: "Create professional, ATS-friendly CVs in minutes. Stand out and land more opportunities.",
    cta: "Try the AI CV Builder",
  },
  {
    icon: Cog,
    color: "from-sky-500 to-primary",
    title: "Business Automation Systems",
    body: "Custom automation workflows that reduce manual work, save time, and help your business operate efficiently.",
    cta: "Discover our automation solutions",
  },
];

function Products() {
  return (
    <section id="products" className="border-t border-border/40 bg-card/40 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Products & Solutions
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
            Smart Tools That Make Work Easier
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {PRODUCTS.map((p) => (
            <article
              key={p.title}
              className="flex items-start gap-5 rounded-2xl border border-border bg-background p-7"
            >
              <div className={`flex size-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${p.color} text-white`}>
                <p.icon className="size-7" strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-lg font-bold tracking-tight">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                <a href="#contact" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-primary">
                  {p.cta} <ArrowRight className="size-3" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section className="px-6 py-16 md:py-20">
      <div className="mx-auto max-w-5xl rounded-2xl border border-border bg-card p-8 md:p-12">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
          <Quote className="size-10 shrink-0 text-primary/50" />
          <div className="flex-1">
            <p className="font-display text-lg leading-relaxed md:text-xl">
              Chada Digital transformed our ideas into a fast, beautiful website that has helped us
              attract more customers and grow our business.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-violet-500 font-display text-base font-bold text-white">
              TA
            </div>
            <div>
              <p className="font-display text-sm font-bold">Tunde A.</p>
              <p className="text-xs text-muted-foreground">CEO, Veritas Homes</p>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center gap-2">
          <span className="size-1.5 rounded-full bg-primary" />
          <span className="size-1.5 rounded-full bg-muted-foreground/30" />
          <span className="size-1.5 rounded-full bg-muted-foreground/30" />
        </div>
      </div>
    </section>
  );
}

function CtaBanner() {
  return (
    <section className="px-6 pb-20">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/20 via-card to-card p-8 md:p-12">
        <div aria-hidden className="pointer-events-none absolute -right-20 top-0 h-full w-1/2 bg-gradient-to-l from-primary/30 to-transparent blur-3xl" />
        <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto]">
          <div>
            <h3 className="font-display text-2xl font-bold tracking-tight md:text-4xl">
              Ready to Scale Your Business?
            </h3>
            <p className="mt-2 text-sm text-muted-foreground md:text-base">
              Let's build something amazing together.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30"
          >
            Start a Project <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", service: "Web Development", message: "" });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in your name, email, and a quick message.");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    toast.success("Thanks! We'll be in touch within 24 hours.");
    setForm({ name: "", email: "", service: "Web Development", message: "" });
  };

  return (
    <section id="contact" className="border-t border-border/40 px-6 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Contact</span>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">
            Let's build <br /> something that scales.
          </h2>
          <div className="mt-8 space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-3"><Mail className="size-4 text-primary" /> hello@chadadigital.com</div>
            <div className="flex items-center gap-3"><Phone className="size-4 text-primary" /> +234 815 123 4567</div>
            <div className="flex items-center gap-3"><MapPin className="size-4 text-primary" /> Lagos, Nigeria</div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-border bg-card p-7 md:p-9">
          <Field label="Full Name">
            <input
              type="text" required value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Adaeze Okafor"
              className="w-full border-b border-border bg-transparent py-3 text-sm placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
            />
          </Field>
          <Field label="Email Address">
            <input
              type="email" required value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@company.com"
              className="w-full border-b border-border bg-transparent py-3 text-sm placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
            />
          </Field>
          <Field label="Service Interest">
            <select
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
              className="w-full appearance-none border-b border-border bg-transparent py-3 text-sm focus:border-primary focus:outline-none"
            >
              <option className="bg-card">Web Development</option>
              <option className="bg-card">Brand Identity</option>
              <option className="bg-card">Automation</option>
              <option className="bg-card">Digital Strategy</option>
            </select>
          </Field>
          <Field label="Project Scope">
            <textarea
              required rows={4} value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell us a bit about what you're building…"
              className="w-full resize-none border-b border-border bg-transparent py-3 text-sm placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
            />
          </Field>
          <button
            type="submit" disabled={submitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-60"
          >
            {submitting ? "Sending…" : "Send Inquiry"} <ArrowRight className="size-4" />
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

const FOOTER_COLS = [
  { title: "Explore", links: ["About Us", "Services", "Our Work", "Products", "Blog"] },
  { title: "Company", links: ["Careers", "Privacy Policy", "Terms of Service"] },
  { title: "Support", links: ["Contact Us", "FAQ"] },
];

function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/30 px-6 pt-16 pb-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo className="h-14" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Digital solutions that help businesses grow, automate, and scale.
          </p>
          <div className="mt-5 flex gap-3">
            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
              <a key={i} href="#" aria-label="Social link" className="inline-flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
        {FOOTER_COLS.map((col) => (
          <div key={col.title}>
            <h3 className="font-display text-sm font-bold">{col.title}</h3>
            <ul className="mt-4 space-y-3">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h3 className="font-display text-sm font-bold">Let's Talk</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Mail className="size-4 text-primary" /> hello@chadadigital.com</li>
            <li className="flex items-center gap-2"><Phone className="size-4 text-primary" /> +234 815 123 4567</li>
            <li className="flex items-center gap-2"><MapPin className="size-4 text-primary" /> Lagos, Nigeria</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl items-center justify-between border-t border-border/40 pt-6">
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          © {new Date().getFullYear()} Chada Digital · All rights reserved
        </p>
        <img src={chadaMark.url} alt="" aria-hidden className="h-6 w-auto opacity-60" />
      </div>
    </footer>
  );
}
