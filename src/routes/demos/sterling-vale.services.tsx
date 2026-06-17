import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, HardHat, Hammer, Wrench, ClipboardList, Zap, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/sterling/Layout";

export const Route = createFileRoute("/demos/sterling-vale/services")({
  head: () => ({
    meta: [
      { title: "Services — Sterling & Vale Construction" },
      { name: "description", content: "Commercial construction, residential builds, civil engineering, renovation, project management, and MEP services across Nigeria." },
      { property: "og:title", content: "Construction services across Nigeria" },
      { property: "og:description", content: "Six service lines, one accountable team." },
    ],
  }),
  component: Services,
});

const SERVICES = [
  { icon: Building2, title: "Commercial Construction", body: "Class-A office towers, mixed-use developments, retail centres and hospitality builds.", deliverables: ["Shell & core", "Cat-A fit-out", "Tenant coordination"] },
  { icon: HardHat, title: "Residential Builds", body: "Single-family homes, terraces, and gated estates designed for African climates.", deliverables: ["Custom architecture", "Estate masterplans", "Smart-home wiring"] },
  { icon: Hammer, title: "Civil Engineering", body: "Roads, bridges, drainage and earthworks for federal and state contracts.", deliverables: ["Highways", "Bridge construction", "Storm drainage"] },
  { icon: Wrench, title: "Renovation & Retrofit", body: "Bring tired buildings back to life — structural strengthening to modern fit-out.", deliverables: ["Structural repair", "Facade renewal", "Interior refit"] },
  { icon: ClipboardList, title: "Project Management", body: "Independent owner's-rep PM for clients running their own design and contractor teams.", deliverables: ["Cost control", "Schedule mgmt", "Quality assurance"] },
  { icon: Zap, title: "MEP & Building Systems", body: "Mechanical, electrical, plumbing — designed for Nigerian grid realities.", deliverables: ["Power & solar", "HVAC", "Plumbing & fire"] },
];

function Services() {
  return (
    <>
      <section className="px-6 pt-16 md:pt-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="What we do"
            title="Six service lines. One accountable team."
            lede="Whether you're breaking ground on a 30-storey tower or retrofitting a Surulere office floor, the same project director sees it through."
          />
        </div>
      </section>

      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <article key={s.title} className="rounded-2xl border border-[#1C1A17]/10 bg-white p-7">
              <s.icon className="size-7 text-[#C2410C]" />
              <h3 className="mt-5 text-xl font-bold" style={{ fontFamily: "Playfair Display, ui-serif" }}>{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#1C1A17]/65">{s.body}</p>
              <ul className="mt-5 space-y-1.5 border-t border-[#1C1A17]/10 pt-4 text-xs text-[#1C1A17]/70">
                {s.deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-[#C2410C]" /> {d}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-3xl bg-[#0F3A2E] px-10 py-14 text-center text-[#F5F1EA]">
          <h2 className="text-3xl font-bold md:text-4xl" style={{ fontFamily: "Playfair Display, ui-serif" }}>
            Not sure which service fits?
          </h2>
          <p className="mt-3 text-[#F5F1EA]/75">Tell us about your project — we'll route you to the right team.</p>
          <Link
            to="/demos/sterling-vale/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#C2410C] px-7 py-3.5 text-xs font-semibold uppercase tracking-widest"
          >
            Get in touch <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </section>
    </>
  );
}
