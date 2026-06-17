import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import type { Testimonial } from "../api/client";

export function TestimonialGrid({ items }: { items: Testimonial[] }) {
  const visible = items.slice(0, 9);

  if (items.length === 0) return null;

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            viewport={{ once: true }}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f1ff] text-lg font-bold text-[#0052cc]">
                {t.clientName[0]}
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{t.clientName}</h3>
                <p className="text-xs text-slate-500">
                  {[t.role, t.company].filter(Boolean).join(", ")}
                </p>
              </div>
            </div>
            <div className="mb-3 flex gap-0.5">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} size={14} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-sm leading-relaxed text-slate-600">{t.content}</p>
          </motion.div>
        ))}
      </div>
      <p className="mt-8 text-center text-sm text-slate-500">
        Are you our client?{" "}
        <Link to="/login" className="font-medium text-[#0052cc] hover:underline">
          Login to share your experience
        </Link>
      </p>
    </div>
  );
}
