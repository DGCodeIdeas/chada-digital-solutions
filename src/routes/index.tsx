import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import {
  ArrowRight,
  Code2,
  Palette,
  Workflow,
  Gauge,
  MapPin,
  ShieldCheck,
  MessagesSquare,
  Mail,
} from "lucide-react";

import { Toaster } from "@/components/ui/sonner";
import chadaLogo from "@/assets/chada-logo.png.asset.json";
import chadaMark from "@/assets/chada-mark.png.asset.json";
import portfolioFintech from "@/assets/portfolio-fintech.jpg";
import portfolioEcommerce from "@/assets/portfolio-ecommerce.jpg";
import aboutVisual from "@/assets/about-visual.jpg";

const SITE_TITLE = "Chada Digital — Digital Solutions That Scale Businesses";
const SITE_DESC =
  "Chada Digital is a Nigerian digital agency building web development, branding, and automation solutions that scale ambitious businesses.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESC },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESC },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Chada Digital",
          description: SITE_DESC,
          slogan: "Digital Solutions That Scale Businesses",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Lagos",
            addressCountry: "NG",
          },
          areaServed: "Worldwide",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 selection:text-foreground overflow-x-hidden">
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
      <Toaster theme="dark" position="top-center" />
    </div>
  );
}

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Work" },
  { href: "#why-us", label: "Why Us" },
  { href: "#contact", label: "Contact" },
];

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#hero" className="flex items-center gap-2">
          <img
            src={chadaLogo.url}
            alt="Chada Digital logo"
            className="h-8 w-auto rounded-md"
            width={80}
            height={32}
          />
          <span className="font-display text-base font-bold tracking-tight">
            Chada<span className="text-primary">.</span>
          </span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="hidden rounded-full bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-transform hover:-translate-y-0.5 md:inline-flex"
        >
          Start a Project
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden px-6 pb-32 pt-24 md:pt-32">
      {/* soft brand glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-primary/20 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-60 h-[480px] w-[480px] rounded-full bg-primary/15 blur-[160px]"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <img
            src={chadaLogo.url}
            alt="Chada Digital"
            className="mx-auto mb-10 h-20 w-auto rounded-xl shadow-2xl shadow-primary/20 ring-1 ring-border/60"
            width={300}
            height={80}
          />
          <span className="mb-6 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Based in Lagos · Serving the World
          </span>
          <h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground md:text-7xl">
            Digital Solutions <br className="hidden md:inline" />
            That <span className="text-primary">Scale Businesses</span>.
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            We engineer high-performance websites, command-attention brands, and intelligent
            automation for ambitious teams across Nigeria and beyond.
          </p>
          <div className="mt-10 flex justify-center">
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/30"
            >
              Start a Project
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="border-t border-border/40 bg-card/40 px-6 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-2">
        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl" aria-hidden />
          <img
            src={aboutVisual}
            alt="Architectural detail of a Lagos skyscraper at dusk"
            className="relative aspect-[4/5] w-full rounded-2xl object-cover ring-1 ring-border"
            loading="lazy"
            width={1024}
            height={1280}
          />
        </div>
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            About Chada
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            A Nigerian studio building world-class digital infrastructure.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            Chada Digital partners with founders and operators who refuse to compromise. We
            translate ambition into shipped product — combining local insight with the structural
            polish of the world's best digital teams.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            From custom platforms to brand systems to automated workflows, every engagement is
            measured by one outcome: real growth for the business behind it.
          </p>
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  {
    icon: Code2,
    title: "Web Development",
    body: "Custom websites, web apps, and e-commerce ecosystems engineered for speed, scale, and conversion.",
  },
  {
    icon: Palette,
    title: "Branding & Design",
    body: "Visual identities, UI/UX systems, and creative direction that make your business unmistakable.",
  },
  {
    icon: Workflow,
    title: "Automation",
    body: "Workflow automation, AI integrations, and internal tools that compound your team's output.",
  },
];

function Services() {
  return (
    <section id="services" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Services
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              What we build for you.
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Three core capabilities, working together to remove friction and unlock growth.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <article
              key={s.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:border-primary/40"
            >
              <div className="mb-12 inline-flex size-12 items-center justify-center rounded-xl bg-primary/15 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <s.icon className="size-5" strokeWidth={1.75} />
              </div>
              <span className="mb-3 block font-display text-xs font-semibold tracking-widest text-primary">
                0{i + 1}
              </span>
              <h3 className="font-display text-2xl font-bold tracking-tight">{s.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const PROJECTS = [
  {
    image: portfolioFintech,
    name: "Onyx Pay",
    category: "Fintech · Product & Web",
  },
  {
    image: portfolioEcommerce,
    name: "Zuri Atelier",
    category: "Luxury E-Commerce",
  },
];

function Portfolio() {
  return (
    <section
      id="portfolio"
      className="border-y border-border/40 bg-card/40 px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Portfolio
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Selected work.
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <article
              key={p.name}
              className={`group ${i % 2 === 1 ? "md:mt-24" : ""}`}
            >
              <div className="relative overflow-hidden rounded-2xl border border-border bg-background">
                <img
                  src={p.image}
                  alt={p.name}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  width={1024}
                  height={1280}
                />
              </div>
              <div className="mt-6 flex items-end justify-between">
                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.category}</p>
                </div>
                <span className="text-xs font-mono uppercase tracking-widest text-primary">
                  0{i + 1}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const REASONS = [
  {
    icon: Gauge,
    title: "Hyper-Efficient Builds",
    body: "Lean engineering, no bloat. Production-ready output that loads fast and scales clean.",
  },
  {
    icon: MapPin,
    title: "Local Nuance, Global Standard",
    body: "Built with the Nigerian market in mind, executed against the world's best benchmarks.",
  },
  {
    icon: ShieldCheck,
    title: "Technical Rigor",
    body: "Audited code, battle-tested design systems, resilient automations you can trust.",
  },
  {
    icon: MessagesSquare,
    title: "Transparent Partnership",
    body: "Clear scope, weekly updates, direct access. No agency theatre — just shipped work.",
  },
];

function WhyUs() {
  return (
    <section id="why-us" className="relative overflow-hidden px-6 py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-primary/15 blur-[160px]"
      />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Why Chada
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Built to be the partner you wish you'd hired first.
          </h2>
        </div>

        <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
          {REASONS.map((r) => (
            <div key={r.title} className="flex gap-6">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                <r.icon className="size-5" strokeWidth={1.75} />
              </div>
              <div>
                <h4 className="font-display text-lg font-bold">{r.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "Web Development",
    message: "",
  });

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
    <section
      id="contact"
      className="relative overflow-hidden border-t border-border/40 px-6 py-24 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/15 blur-[180px]"
      />
      <div className="relative mx-auto grid max-w-7xl gap-16 md:grid-cols-2">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Contact
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Let's build <br /> something that scales.
          </h2>
          <p className="mt-6 max-w-md text-muted-foreground">
            Tell us about your project — our team responds within one business day.
          </p>
          <div className="mt-10 flex items-center gap-3 text-sm text-muted-foreground">
            <Mail className="size-4 text-primary" />
            <span>hello@chada.digital</span>
          </div>
          <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
            <MapPin className="size-4 text-primary" />
            <span>Lagos, Nigeria</span>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-3xl border border-border bg-card p-8 md:p-10"
        >
          <Field label="Full Name">
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Adaeze Okafor"
              className="w-full border-b border-border bg-transparent py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
            />
          </Field>
          <Field label="Email Address">
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@company.com"
              className="w-full border-b border-border bg-transparent py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
            />
          </Field>
          <Field label="Service Interest">
            <select
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
              className="w-full appearance-none border-b border-border bg-transparent py-3 text-sm text-foreground focus:border-primary focus:outline-none"
            >
              <option className="bg-card">Web Development</option>
              <option className="bg-card">Branding & Design</option>
              <option className="bg-card">Automation</option>
              <option className="bg-card">Not sure yet</option>
            </select>
          </Field>
          <Field label="Project Scope">
            <textarea
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell us a bit about what you're building…"
              className="w-full resize-none border-b border-border bg-transparent py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
            />
          </Field>
          <button
            type="submit"
            disabled={submitting}
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-60"
          >
            {submitting ? "Sending…" : "Send Inquiry"}
            <ArrowRight className="size-4" />
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

function Footer() {
  return (
    <footer className="border-t border-border/40 px-6 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-2">
          <img
            src={chadaLogo.url}
            alt="Chada Digital"
            className="h-7 w-auto rounded-md"
            width={70}
            height={28}
          />
          <span className="font-display text-sm font-bold tracking-tight">
            Chada<span className="text-primary">.</span>
          </span>
        </div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          © {new Date().getFullYear()} Chada Digital · Lagos, Nigeria
        </p>
        <div className="flex gap-6 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          <a href="#" className="transition-colors hover:text-foreground">
            LinkedIn
          </a>
          <a href="#" className="transition-colors hover:text-foreground">
            Instagram
          </a>
          <a href="#" className="transition-colors hover:text-foreground">
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
}
