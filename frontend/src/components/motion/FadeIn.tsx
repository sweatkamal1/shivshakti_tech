import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.5, ease: "easeOut" },
  }),
};

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FadeIn({ children, className = "", delay = 0 }: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      custom={delay}
      variants={fadeUp}
    >
      {children}
    </motion.div>
  );
}

export function PageHero({ title, subtitle, dark }: { title: string; subtitle?: string; dark?: boolean }) {
  return (
    <section className={`section-padding ${dark ? "bg-[#0052cc] text-white" : "bg-muted"}`}>
      <motion.div
        className="mx-auto max-w-4xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={`section-title ${dark ? "text-white" : ""}`}>{title}</h1>
        {subtitle && (
          <p className={`section-subtitle mx-auto ${dark ? "text-blue-100" : ""}`}>{subtitle}</p>
        )}
      </motion.div>
    </section>
  );
}
