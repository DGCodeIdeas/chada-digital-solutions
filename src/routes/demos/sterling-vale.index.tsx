import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, HardHat, Hammer, ShieldCheck, Award, Quote } from "lucide-react";
import { SectionHeading } from "@/components/sterling/Layout";
import heroImg from "@/assets/sterling/hero.jpg";
import p1 from "@/assets/sterling/project-1.jpg";
import p2 from "@/assets/sterling/project-2.jpg";

export const Route = createFileRoute("/demos/sterling-vale/")({
  head: () => ({
    meta: [
      { title: "Sterling & Vale — Building Nigeria's Skyline" },
      {
        name: "description",
        content:
          "Lagos-based construction firm with 18+ years building landmark commercial, residential and civil projects across Nigeria.",
      },
      { property: "og:title", content: "Sterling & Vale — Building Nigeria's Skyline" },
      { property: "og:description", content: "18+ years building landmark projects across Nigeria." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 pb-16 pt-12 md:pb-24 md:pt-20 lg:grid-cols-2">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#C2410C]">
              Lagos · Est. 2007
            </span>
            <h1
              className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl"
              style={{ fontFamily: "Playfair Display, ui-serif, Georgia" }}
            >
              Building Nigeria's Skyline,<br />
              <span className="text-[#C2410C]">One Project at a Time.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#1C1A17]/70 md:text-lg">
              From Victoria Island towers to Lekki estates and federal road corridors, Sterling & Vale
              delivers commercial, residential and civil construction with engineering rigor and on-time
              precision.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/demos/sterling-vale/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#C2410C] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-transform hover:-translate-y-0.5"
              >
                Request a Quote <ArrowRight className="size-3.5" />
              </Link>
              <Link
                to="/demos/sterling-vale/projects"
                className="inline-flex items-center gap-2 rounded-full border border-[#1C1A17]/20 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-[#1C1A17]"
              >
                View Projects
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-[#1C1A17]/10 shadow-2xl shadow-[#1C1A17]/15">
              <img src={heroImg} alt="Sterling & Vale engineers on site" width={1600} height={1024} className="aspect-[4/3] w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-xl bg-white p-5 shadow-xl ring-1 ring-[#1C1A17]/10 md:block">
              <p className="text-3xl font-bold text-[#C2410C]" style={{ fontFamily: "Playfair Display, ui-serif" }}>250+</p>
              <p className="text-xs uppercase tracking-widest text-[#1C1A17]/60">Projects delivered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-[#1C1A17]/10 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-10 md:grid-cols-4">
          {[
            { n: "250+", l: "Completed projects" },
            { n: "18 yrs", l: "In operation" },
            { n: "40+", l: "Engineers on staff" },
            { n: "0", l: "OSHA-class incidents 2025" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <p className="text-3xl font-bold text-[#C2410C] md:text-4xl" style={{ fontFamily: "Playfair Display, ui-serif" }}>{s.n}</p>
              <p className="mt-1 text-[11px] uppercase tracking-widest text-[#1C1A17]/60">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services teaser */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="What we build"
            title="End-to-end construction expertise"
            lede="From design coordination to final handover, our teams cover every layer of modern construction."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { icon: Building2, title: "Commercial Construction", body: "Office towers, malls, and mixed-use developments built to international standards." },
              { icon: HardHat, title: "Residential Builds", body: "Estates, terraces, and luxury homes designed for African families." },
              { icon: Hammer, title: "Civil Engineering", body: "Roads, bridges, and infrastructure that move Nigeria forward." },
            ].map((s) => (
              <article key={s.title} className="rounded-2xl border border-[#1C1A17]/10 bg-white p-7">
                <s.icon className="size-7 text-[#C2410C]" />
                <h3 className="mt-5 text-xl font-bold" style={{ fontFamily: "Playfair Display, ui-serif" }}>{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#1C1A17]/65">{s.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/demos/sterling-vale/services" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C2410C]">
              See all services <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="bg-white px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Selected work" title="Recent landmark projects" />
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {[
              { img: p1, name: "Meridian Tower", category: "Commercial · Victoria Island, Lagos · 2024" },
              { img: p2, name: "Vale Gardens Estate", category: "Residential · Lekki, Lagos · 2023" },
            ].map((p) => (
              <article key={p.name} className="group overflow-hidden rounded-2xl border border-[#1C1A17]/10">
                <div className="overflow-hidden">
                  <img src={p.img} alt={p.name} loading="lazy" width={1024} height={768} className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold" style={{ fontFamily: "Playfair Display, ui-serif" }}>{p.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-widest text-[#1C1A17]/55">{p.category}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#C2410C]">Why Sterling & Vale</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl" style={{ fontFamily: "Playfair Display, ui-serif" }}>
              Engineering rigor. Local craftsmanship.<br />Delivered on schedule.
            </h2>
            <p className="mt-5 text-[#1C1A17]/70">
              We combine international construction standards with deep local know-how — from sourcing
              and labour to navigating Lagos State approvals.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: ShieldCheck, title: "Safety-first sites", body: "OSHA-aligned protocols across every project." },
              { icon: Award, title: "Award-winning teams", body: "Recognized by NIOB and CORBON for delivery." },
              { icon: Building2, title: "Vertical capability", body: "Design coordination through final handover." },
              { icon: HardHat, title: "Skilled crews", body: "In-house artisans, not subcontractor roulette." },
            ].map((w) => (
              <div key={w.title} className="rounded-xl border border-[#1C1A17]/10 bg-white p-5">
                <w.icon className="size-6 text-[#C2410C]" />
                <h3 className="mt-3 text-sm font-bold">{w.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-[#1C1A17]/65">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-[#0F3A2E] px-6 py-20 text-[#F5F1EA] md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <Quote className="mx-auto size-10 text-[#C2410C]" />
          <p className="mt-6 text-2xl leading-relaxed md:text-3xl" style={{ fontFamily: "Playfair Display, ui-serif" }}>
            "Sterling & Vale delivered our 14-storey HQ three weeks ahead of schedule with zero
            variations. That kind of discipline is rare in this market."
          </p>
          <p className="mt-6 text-sm uppercase tracking-widest text-[#F5F1EA]/70">
            Adaeze Okafor — COO, Meridian Holdings
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 rounded-3xl bg-[#1C1A17] px-10 py-16 text-center text-white md:flex-row md:justify-between md:text-left">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl" style={{ fontFamily: "Playfair Display, ui-serif" }}>Have a project in mind?</h2>
            <p className="mt-2 text-white/70">Get a no-obligation feasibility review within 5 business days.</p>
          </div>
          <Link to="/demos/sterling-vale/contact" className="inline-flex items-center gap-2 rounded-full bg-[#C2410C] px-7 py-3.5 text-xs font-semibold uppercase tracking-widest">
            Start a Conversation <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </section>
    </>
  );
}
