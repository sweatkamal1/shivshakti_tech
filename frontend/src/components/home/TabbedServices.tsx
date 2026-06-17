import { useState } from "react";
import { Check } from "lucide-react";
import { FadeIn } from "../motion/FadeIn";

interface TabItem {
  id: string;
  label: string;
  title: string;
  paragraphs: string[];
  items: string[];
}

export function TabbedServices({
  heading,
  subheading,
  tabs,
}: {
  heading: string;
  subheading?: string;
  tabs: TabItem[];
}) {
  const [active, setActive] = useState(tabs[0]?.id ?? "");

  const current = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <FadeIn>
          <div className="mb-10 text-center">
            <h2 className="section-title">{heading}</h2>
            {subheading && <p className="section-subtitle mx-auto">{subheading}</p>}
          </div>
        </FadeIn>

        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(tab.id)}
                className={`shrink-0 rounded-lg px-5 py-3 text-left text-sm font-semibold transition ${
                  active === tab.id
                    ? "bg-[#0052cc] text-white shadow-md"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <FadeIn key={current.id}>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
              <h3 className="mb-4 text-2xl font-bold text-slate-900">{current.title}</h3>
              {current.paragraphs.map((p) => (
                <p key={p.slice(0, 40)} className="mb-4 text-sm leading-relaxed text-slate-600">
                  {p}
                </p>
              ))}
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {current.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                    <Check size={16} className="mt-0.5 shrink-0 text-[#0052cc]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
