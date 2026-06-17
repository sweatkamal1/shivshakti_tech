import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { FadeIn, PageHero } from "../components/motion/FadeIn";

export function PricingPage() {
  const plans = [
    { name: "Starter", price: "₹49,999", features: ["Landing page", "Responsive design", "Basic SEO", "2 weeks delivery"] },
    { name: "Business", price: "₹1,99,999", features: ["Full website", "CMS integration", "Advanced SEO", "6 weeks delivery"], featured: true },
    { name: "Enterprise", price: "Custom", features: ["Custom software", "Dedicated team", "24/7 support", "Flexible timeline"] },
  ];

  return (
    <>
      <PageHero title="Pricing Plans" subtitle="Transparent pricing for every stage of growth" />
      <div className="mx-auto max-w-7xl px-4 pb-20">
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((p, i) => (
            <FadeIn key={p.name} delay={i}>
              <div className={`card flex h-full flex-col ${p.featured ? "border-[#0052cc] ring-2 ring-[#0052cc]/20" : ""}`}>
                {p.featured && (
                  <span className="mb-3 inline-block w-fit rounded-full bg-[#0052cc]/10 px-3 py-1 text-xs font-semibold text-[#0052cc]">
                    Most Popular
                  </span>
                )}
                <h2 className="text-xl font-semibold text-slate-900">{p.name}</h2>
                <p className="my-4 text-3xl font-bold text-[#0052cc]">{p.price}</p>
                <ul className="mb-6 flex-1 space-y-2 text-sm text-slate-600">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <Check size={16} className="shrink-0 text-[#0052cc]" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className={p.featured ? "btn-primary text-center" : "btn-outline text-center"}>
                  Get Started
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </>
  );
}
