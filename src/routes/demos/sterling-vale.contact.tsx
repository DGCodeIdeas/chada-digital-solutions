import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast, Toaster } from "sonner";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/sterling/Layout";

export const Route = createFileRoute("/demos/sterling-vale/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Sterling & Vale Construction" },
      { name: "description", content: "Talk to Sterling & Vale about your construction project. Lagos office, weekday hours, response within one business day." },
      { property: "og:title", content: "Contact Sterling & Vale" },
      { property: "og:description", content: "Request a quote or feasibility review." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Thank you — we'll be in touch within one business day.");
    }, 700);
  };

  return (
    <>
      <Toaster position="top-center" />
      <section className="px-6 pt-16 md:pt-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Get in touch"
            title="Let's talk about your project"
            lede="Tell us what you're building. We respond to every enquiry within one business day."
          />
        </div>
      </section>

      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.4fr_1fr]">
          <form onSubmit={onSubmit} className="rounded-2xl border border-[#1C1A17]/10 bg-white p-8">
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Full name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Phone" name="phone" type="tel" />
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-[#1C1A17]/70">Project type</label>
                <select required name="type" className="h-11 w-full rounded-md border border-[#1C1A17]/15 bg-white px-3 text-sm">
                  <option value="">Select…</option>
                  <option>Commercial</option>
                  <option>Residential</option>
                  <option>Civil Engineering</option>
                  <option>Renovation</option>
                  <option>Project Management</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="mt-5">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-[#1C1A17]/70">Message</label>
              <textarea required name="message" rows={5} className="w-full rounded-md border border-[#1C1A17]/15 bg-white px-3 py-2 text-sm" placeholder="Site location, scope, target timeline…" />
            </div>
            <button
              disabled={submitting}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#C2410C] px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-white disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Send enquiry"} <ArrowRight className="size-3.5" />
            </button>
          </form>

          <aside className="space-y-4">
            <InfoCard icon={MapPin} title="Head office" lines={["14 Adeola Odeku Street", "Victoria Island, Lagos"]} />
            <InfoCard icon={Phone} title="Phone" lines={["+234 803 000 0000", "+234 1 280 0000"]} />
            <InfoCard icon={Mail} title="Email" lines={["hello@sterlingvale.demo", "tenders@sterlingvale.demo"]} />
            <InfoCard icon={Clock} title="Office hours" lines={["Mon–Fri · 8:00 – 18:00", "Sat · 9:00 – 14:00"]} />
          </aside>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-[#1C1A17]/70">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="h-11 w-full rounded-md border border-[#1C1A17]/15 bg-white px-3 text-sm"
      />
    </div>
  );
}

function InfoCard({ icon: Icon, title, lines }: { icon: typeof MapPin; title: string; lines: string[] }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-[#1C1A17]/10 bg-white p-5">
      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-md bg-[#C2410C]/10 text-[#C2410C]">
        <Icon className="size-5" />
      </span>
      <div>
        <h3 className="text-sm font-semibold">{title}</h3>
        {lines.map((l) => (
          <p key={l} className="text-sm text-[#1C1A17]/65">{l}</p>
        ))}
      </div>
    </div>
  );
}
