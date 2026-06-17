import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Briefcase, ArrowRight } from "lucide-react";
import { publicApi, type Career } from "../api/client";
import { FadeIn, PageHero } from "../components/motion/FadeIn";

export function CareersPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    publicApi.careers()
      .then((r) => setCareers(r.data ?? []))
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load jobs"));
  }, []);

  return (
    <>
      <PageHero title="Join Our Team" subtitle="Build the future of technology with ShivShakti" />
      <div className="mx-auto max-w-4xl px-4 pb-20">
        {error && <p className="mb-4 text-center text-red-600">{error}</p>}
        {careers.length === 0 && !error ? (
          <p className="text-center text-slate-500">No open positions at the moment. Check back soon!</p>
        ) : (
          <div className="space-y-4">
            {careers.map((c, i) => (
              <FadeIn key={c.id} delay={i}>
                <Link to={`/careers/${c.slug}`} className="card group flex items-center justify-between gap-4 hover:border-[#0052cc]/40">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900 group-hover:text-[#0052cc]">{c.title}</h2>
                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1"><Briefcase size={14} /> {c.department}</span>
                      <span className="flex items-center gap-1"><MapPin size={14} /> {c.location}</span>
                      <span>{c.employmentType}</span>
                    </div>
                    <p className="mt-3 text-sm text-slate-600 line-clamp-2">{c.description}</p>
                  </div>
                  <ArrowRight className="shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-[#0052cc]" />
                </Link>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
