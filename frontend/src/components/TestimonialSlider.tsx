import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import type { Testimonial } from "../api/client";

export function TestimonialSlider({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % items.length), 5000);
    return () => clearInterval(t);
  }, [items.length]);

  if (items.length === 0) return null;

  const current = items[index];

  return (
    <div className="relative mx-auto max-w-3xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4 }}
          className="card text-center"
        >
          <div className="mb-4 flex justify-center gap-1">
            {Array.from({ length: current.rating }).map((_, i) => (
              <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="mb-6 text-lg italic text-zinc-300">&ldquo;{current.content}&rdquo;</p>
          <p className="font-semibold">{current.clientName}</p>
          <p className="text-sm text-zinc-500">
            {[current.role, current.company].filter(Boolean).join(" · ")}
          </p>
        </motion.div>
      </AnimatePresence>

      {items.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)}
            className="rounded-full border border-white/10 p-2 hover:bg-white/5"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-2 w-2 rounded-full transition ${i === index ? "bg-indigo-500 w-6" : "bg-white/20"}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % items.length)}
            className="rounded-full border border-white/10 p-2 hover:bg-white/5"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      <p className="mt-8 text-center text-sm text-zinc-500">
        Are you our client?{" "}
        <Link to="/login" className="text-indigo-400 hover:underline">
          Login to share your experience
        </Link>
      </p>
    </div>
  );
}
