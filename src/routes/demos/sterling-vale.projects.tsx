import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/sterling/Layout";
import p1 from "@/assets/sterling/project-1.jpg";
import p2 from "@/assets/sterling/project-2.jpg";
import p3 from "@/assets/sterling/project-3.jpg";
import p4 from "@/assets/sterling/project-4.jpg";
import p5 from "@/assets/sterling/project-5.jpg";
import p6 from "@/assets/sterling/project-6.jpg";

export const Route = createFileRoute("/demos/sterling-vale/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Sterling & Vale Construction" },
      { name: "description", content: "A selection of Sterling & Vale's completed commercial, residential and civil engineering projects across Nigeria." },
      { property: "og:title", content: "Sterling & Vale — Selected projects" },
      { property: "og:description", content: "Towers, estates, bridges, malls — built across Nigeria." },
    ],
  }),
  component: Projects,
});

const PROJECTS = [
  { img: p1, name: "Meridian Tower", location: "Victoria Island, Lagos", sector: "Commercial", year: "2024" },
  { img: p2, name: "Vale Gardens Estate", location: "Lekki, Lagos", sector: "Residential", year: "2023" },
  { img: p3, name: "Niger Crossing Bridge", location: "Kogi State", sector: "Civil Engineering", year: "2022" },
  { img: p4, name: "Palmview Mall", location: "Abuja", sector: "Commercial", year: "2023" },
  { img: p5, name: "Sterling Industrial Park", location: "Ogun State", sector: "Industrial", year: "2024" },
  { img: p6, name: "Vale Academy Campus", location: "Ibadan", sector: "Education", year: "2025" },
];

function Projects() {
  return (
    <>
      <section className="px-6 pt-16 md:pt-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Past projects"
            title="A selection of our recent work"
            lede="Six landmark builds across commercial, residential, civil and education sectors."
          />
        </div>
      </section>

      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <article key={p.name} className="group overflow-hidden rounded-2xl border border-[#1C1A17]/10 bg-white">
              <div className="overflow-hidden">
                <img src={p.img} alt={p.name} loading="lazy" width={1024} height={768} className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#C2410C]">{p.sector} · {p.year}</p>
                <h3 className="mt-2 text-xl font-bold" style={{ fontFamily: "Playfair Display, ui-serif" }}>{p.name}</h3>
                <p className="mt-1 text-sm text-[#1C1A17]/60">{p.location}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
