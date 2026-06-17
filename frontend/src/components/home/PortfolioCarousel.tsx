import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "../motion/FadeIn";

interface CaseStudy {
  client: string;
  title: string;
  description: string;
  stats: { value: string; label: string }[];
  color: string;
}

export function PortfolioCarousel({ cases }: { cases: CaseStudy[] }) {
  const [index, setIndex] = useState(0);
  const current = cases[index];

  const prev = () => setIndex((i) => (i === 0 ? cases.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === cases.length - 1 ? 0 : i + 1));

  return (
    <section className="section-padding bg-muted">
      <div className="mx-auto max-w-7xl px-4">
        <FadeIn>
          <div className="mb-10 text-center">
            <h2 className="section-title">Work Portfolio</h2>
            <p className="section-subtitle mx-auto">
              Check out our impressive body of work to understand our diverse expertise.
            </p>
          </div>
        </FadeIn>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.client}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg"
            >
              <div className="grid lg:grid-cols-2">
                <div className={`bg-gradient-to-br ${current.color} p-10 text-white lg:p-14`}>
                  <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-white/80">
                    {current.client}
                  </p>
                  <h3 className="text-2xl font-bold leading-snug md:text-3xl">{current.title}</h3>
                </div>
                <div className="p-8 lg:p-10">
                  <p className="mb-8 text-sm leading-relaxed text-slate-600">{current.description}</p>
                  <div className="mb-8 grid grid-cols-2 gap-4">
                    {current.stats.map((s) => (
                      <div key={s.label} className="rounded-lg border border-slate-100 bg-slate-50 p-4 text-center">
                        <p className="text-lg font-bold text-[#0052cc]">{s.value}</p>
                        <p className="mt-1 text-xs text-slate-500">{s.label}</p>
                      </div>
                    ))}
                  </div>
                  <Link to="/contact" className="btn-primary text-xs">
                    Know More
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button type="button" onClick={prev} className="rounded-full border border-slate-300 p-2 hover:bg-white" aria-label="Previous">
              <ArrowLeft size={20} />
            </button>
            <div className="flex gap-2">
              {cases.map((c, i) => (
                <button
                  key={c.client}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${i === index ? "w-8 bg-[#0052cc]" : "w-2 bg-slate-300"}`}
                  aria-label={`Go to ${c.client}`}
                />
              ))}
            </div>
            <button type="button" onClick={next} className="rounded-full border border-slate-300 p-2 hover:bg-white" aria-label="Next">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
