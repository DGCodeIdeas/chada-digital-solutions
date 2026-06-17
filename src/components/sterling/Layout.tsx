import { Link, Outlet } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X, ArrowRight, Building2, Phone, Mail, MapPin } from "lucide-react";

const NAV: { to: string; label: string; exact?: boolean }[] = [
  { to: "/demos/sterling-vale", label: "Home", exact: true },
  { to: "/demos/sterling-vale/about", label: "About" },
  { to: "/demos/sterling-vale/services", label: "Services" },
  { to: "/demos/sterling-vale/projects", label: "Projects" },
  { to: "/demos/sterling-vale/contact", label: "Contact" },
];

export function SterlingShell({ children }: { children?: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="min-h-screen bg-[#F5F1EA] text-[#1C1A17] antialiased selection:bg-[#C2410C]/20"
      style={{ fontFamily: "Inter, ui-sans-serif, system-ui" }}
    >
      {/* Ribbon back to Chada */}
      <div className="w-full bg-[#0F3A2E] text-[#F5F1EA]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 text-[11px] tracking-wide">
          <span className="opacity-90">
            Live demo site — fictional brand built to showcase Chada Digital's corporate-site capability.
          </span>
          <Link to="/" className="inline-flex items-center gap-1 font-semibold hover:underline">
            ← Back to Chada Digital
          </Link>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-[#1C1A17]/10 bg-[#F5F1EA]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link to="/demos/sterling-vale" className="inline-flex items-center gap-2.5">
            <span className="inline-flex size-10 items-center justify-center rounded-md bg-[#C2410C] text-white">
              <Building2 className="size-5" />
            </span>
            <span
              className="text-lg font-bold tracking-tight"
              style={{ fontFamily: "Playfair Display, ui-serif, Georgia" }}
            >
              Sterling <span className="text-[#C2410C]">&</span> Vale
            </span>
          </Link>
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.exact }}
                activeProps={{ className: "text-[#C2410C]" }}
                className="text-sm font-medium text-[#1C1A17]/70 transition-colors hover:text-[#1C1A17]"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <Link
            to="/demos/sterling-vale/contact"
            className="hidden items-center gap-2 rounded-full bg-[#1C1A17] px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-white transition-transform hover:-translate-y-0.5 md:inline-flex"
          >
            Request a Quote <ArrowRight className="size-3.5" />
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-md border border-[#1C1A17]/15 lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {open && (
          <div className="border-t border-[#1C1A17]/10 bg-[#F5F1EA] lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col px-6 py-3">
              {NAV.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: l.exact }}
                  activeProps={{ className: "text-[#C2410C]" }}
                  className="py-3 text-sm font-medium text-[#1C1A17]/80"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <main>{children ?? <Outlet />}</main>

      <footer className="mt-24 border-t border-[#1C1A17]/10 bg-[#1C1A17] text-[#F5F1EA]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
          <div>
            <div className="inline-flex items-center gap-2.5">
              <span className="inline-flex size-10 items-center justify-center rounded-md bg-[#C2410C]">
                <Building2 className="size-5" />
              </span>
              <span
                className="text-lg font-bold tracking-tight"
                style={{ fontFamily: "Playfair Display, ui-serif, Georgia" }}
              >
                Sterling & Vale
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-[#F5F1EA]/65">
              Building Nigeria's skyline since 2007. Commercial, residential, and civil construction
              delivered on time, on budget, on standard.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#C2410C]">Company</h4>
            <ul className="space-y-2 text-sm text-[#F5F1EA]/70">
              <li><Link to="/demos/sterling-vale/about">About</Link></li>
              <li><Link to="/demos/sterling-vale/services">Services</Link></li>
              <li><Link to="/demos/sterling-vale/projects">Projects</Link></li>
              <li><Link to="/demos/sterling-vale/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#C2410C]">Contact</h4>
            <ul className="space-y-3 text-sm text-[#F5F1EA]/70">
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 size-4 shrink-0" /> 14 Adeola Odeku St, Victoria Island, Lagos</li>
              <li className="flex items-center gap-2"><Phone className="size-4" /> +234 803 000 0000</li>
              <li className="flex items-center gap-2"><Mail className="size-4" /> hello@sterlingvale.demo</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#C2410C]">Hours</h4>
            <ul className="space-y-2 text-sm text-[#F5F1EA]/70">
              <li>Mon–Fri · 8:00 – 18:00</li>
              <li>Sat · 9:00 – 14:00</li>
              <li>Sun · Closed</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-[#F5F1EA]/50 md:flex-row">
            <span>© {new Date().getFullYear()} Sterling & Vale Construction (demo). All rights reserved.</span>
            <span>
              Designed & built by{" "}
              <Link to="/" className="text-[#C2410C] hover:underline">Chada Digital</Link>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function SectionHeading({ eyebrow, title, lede }: { eyebrow: string; title: string; lede?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#C2410C]">{eyebrow}</span>
      <h2
        className="mt-3 text-3xl font-bold tracking-tight md:text-5xl"
        style={{ fontFamily: "Playfair Display, ui-serif, Georgia" }}
      >
        {title}
      </h2>
      {lede && <p className="mt-4 text-base leading-relaxed text-[#1C1A17]/65">{lede}</p>}
    </div>
  );
}
