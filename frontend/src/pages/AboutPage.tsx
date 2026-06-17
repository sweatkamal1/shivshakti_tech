import { FadeIn, PageHero } from "../components/motion/FadeIn";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function AboutPage() {
  return (
    <>
      <PageHero title="About ShivShakti Technology" subtitle="Your trusted IT consulting & digital transformation partner" />
      <section className="section-padding">
        <div className="mx-auto max-w-4xl px-4">
          <FadeIn>
            <p className="text-lg leading-relaxed text-slate-600">
              ShivShakti Technology is a premier IT consulting company providing bespoke solutions tailored to your
              business ethos, requirements, and vision. From startups to enterprises, we deliver scalable, secure,
              and beautiful technology products that drive real business outcomes.
            </p>
          </FadeIn>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[
              { title: "Enterprise Expertise", desc: "10+ years delivering mission-critical solutions for global clients." },
              { title: "Agile Delivery", desc: "Transparent sprints with measurable outcomes and on-time delivery." },
              { title: "Dedicated Teams", desc: "Skilled developers, designers, and strategists on every project." },
              { title: "24/7 Support", desc: "Round-the-clock technical support and proactive monitoring." },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i}>
                <div className="card">
                  <CheckCircle2 className="mb-3 text-[#0052cc]" size={24} />
                  <h3 className="mb-2 font-bold text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <div className="mt-12 text-center">
              <Link to="/contact" className="btn-primary inline-flex">
                Work With Us <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
