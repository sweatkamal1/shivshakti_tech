import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Briefcase, ArrowRight } from "lucide-react";
import { publicApi, type Career } from "../api/client";
import { FadeIn, PageHero } from "../components/motion/FadeIn";
import { Seo } from "../components/Seo";
import { PAGE_SEO } from "../lib/seo-config";

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
      <Seo
        title={PAGE_SEO.careers.title}
        description={PAGE_SEO.careers.description}
        path="/careers"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
        ]}
      />
      <PageHero title="Join Our Team" subtitle="Build the future of technology with ShivShakti Technology, Bhagalpur" />
      <div className="mx-auto max-w-4xl px-4 pb-20">
        {error && <p className="mb-4 text-center text-red-600">{error}</p>}
        {careers.length === 0 && !error ? (
          <p className="text-center text-slate-500">No open positions at the moment. Check back soon!</p>
        ) : (
          <div className="space-y-4">
            {careers.map((job, i) => (
              <FadeIn key={job.id} delay={i}>
                <Link
                  to={`/careers/${job.slug}`}
                  className="card group flex items-center justify-between gap-4 hover:border-brand/40"
                >
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 group-hover:text-brand">{job.title}</h2>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                      <span className="inline-flex items-center gap-1"><Briefcase size={14} />{job.department}</span>
                      <span className="inline-flex items-center gap-1"><MapPin size={14} />{job.location}</span>
                    </div>
                  </div>
                  <ArrowRight size={20} className="shrink-0 text-slate-400 group-hover:text-brand" />
                </Link>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
