import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { publicApi, type Service } from "../api/client";
import { FadeIn, PageHero } from "../components/motion/FadeIn";

export function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    publicApi.services().then((r) => setServices(r.data ?? []));
  }, []);

  return (
    <>
      <PageHero
        title="Our Services"
        subtitle="End-to-end technology services for development, design, marketing, and consulting."
      />
      <section className="section-padding bg-muted">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <FadeIn key={s.id} delay={i}>
                <Link to={`/services/${s.slug}`} className="card group block h-full hover:border-[#0052cc]/40">
                  <h2 className="mb-2 text-xl font-bold text-slate-900 group-hover:text-[#0052cc]">{s.title}</h2>
                  <p className="text-sm text-slate-600">{s.shortDescription}</p>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-[#0052cc]">
                    Learn more <ArrowRight size={14} className="ml-1" />
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
