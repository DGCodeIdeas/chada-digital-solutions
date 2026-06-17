import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/sterling/Layout";
import aboutImg from "@/assets/sterling/about.jpg";

export const Route = createFileRoute("/demos/sterling-vale/about")({
  head: () => ({
    meta: [
      { title: "About — Sterling & Vale Construction" },
      { name: "description", content: "Founded in 2007, Sterling & Vale has delivered over 250 commercial, residential and civil projects across Nigeria." },
      { property: "og:title", content: "About Sterling & Vale" },
      { property: "og:description", content: "18 years building Nigeria's skyline." },
    ],
  }),
  component: About,
});

const TIMELINE = [
  { year: "2007", title: "Founded in Lagos", body: "Started as a 6-person residential contractor in Surulere." },
  { year: "2012", title: "First commercial tower", body: "Delivered the 9-storey Ariel House in Ikoyi." },
  { year: "2017", title: "Civil engineering arm", body: "Won the Lagos-Badagry corridor sub-contract." },
  { year: "2021", title: "100th project", body: "Crossed 100 completed projects nationwide." },
  { year: "2026", title: "Today", body: "40+ engineers, 250+ projects, 6 states active." },
];

const LEADERS = [
  { name: "Tunde Akinwale", role: "Founder & CEO", initials: "TA" },
  { name: "Ifeoma Vale", role: "Chief Operating Officer", initials: "IV" },
  { name: "Bashir Mohammed", role: "Director of Engineering", initials: "BM" },
];

function About() {
  return (
    <>
      <section className="px-6 pt-16 md:pt-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="About Sterling & Vale" title="Eighteen years of building things that last." lede="A Lagos-born construction firm with national reach and an obsession with delivering on schedule." />
        </div>
      </section>

      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-[#1C1A17]/10">
            <img src={aboutImg} alt="Sterling & Vale leadership team" width={1280} height={896} className="aspect-[4/3] w-full object-cover" loading="lazy" />
          </div>
          <div>
            <h3 className="text-2xl font-bold md:text-3xl" style={{ fontFamily: "Playfair Display, ui-serif" }}>Our story</h3>
            <p className="mt-4 text-[#1C1A17]/75 leading-relaxed">
              Sterling & Vale was founded in 2007 by Tunde Akinwale with a simple thesis: Nigerian
              construction can match — and often beat — international quality if you combine engineering
              rigor with disciplined project management.
            </p>
            <p className="mt-4 text-[#1C1A17]/75 leading-relaxed">
              Two decades on, we've delivered over 250 projects across six states, from boutique
              residential builds to federal infrastructure. We still answer the same questions: Is it
              safe? Is it on schedule? Will it last 50 years?
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="What we stand for" title="Our values" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { t: "Safety", b: "Zero compromise. Zero excuses. Every site, every shift." },
              { t: "Schedule", b: "We win and lose on dates. Our reputation depends on hitting them." },
              { t: "Stewardship", b: "Of our clients' capital, our crews' wellbeing, and our environment." },
            ].map((v) => (
              <div key={v.t} className="rounded-2xl border border-[#1C1A17]/10 bg-[#F5F1EA] p-7">
                <h3 className="text-xl font-bold text-[#C2410C]" style={{ fontFamily: "Playfair Display, ui-serif" }}>{v.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#1C1A17]/70">{v.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Leadership" title="The people in charge" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {LEADERS.map((p) => (
              <div key={p.name} className="rounded-2xl border border-[#1C1A17]/10 bg-white p-7 text-center">
                <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-[#0F3A2E] text-2xl font-bold text-[#F5F1EA]" style={{ fontFamily: "Playfair Display, ui-serif" }}>
                  {p.initials}
                </div>
                <h3 className="mt-5 text-lg font-bold" style={{ fontFamily: "Playfair Display, ui-serif" }}>{p.name}</h3>
                <p className="text-xs uppercase tracking-widest text-[#C2410C]">{p.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <SectionHeading eyebrow="Milestones" title="Our journey, 2007 → today" />
          <ol className="mt-12 space-y-6">
            {TIMELINE.map((t) => (
              <li key={t.year} className="grid grid-cols-[80px_1fr] gap-6 rounded-xl border-l-2 border-[#C2410C] bg-[#F5F1EA] p-5">
                <span className="text-2xl font-bold text-[#C2410C]" style={{ fontFamily: "Playfair Display, ui-serif" }}>{t.year}</span>
                <div>
                  <h3 className="font-semibold">{t.title}</h3>
                  <p className="mt-1 text-sm text-[#1C1A17]/65">{t.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
