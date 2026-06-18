import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { FadeIn } from "./motion/FadeIn";

const localKeywords = [
  {
    title: "Software Company in Bhagalpur",
    text: "ShivShakti Technology is a leading software development company in Bhagalpur, delivering custom web applications, mobile apps, and enterprise software for businesses across Bihar.",
    link: "/services/custom-software-development",
  },
  {
    title: "IT Company in Bhagalpur",
    text: "As a trusted IT company in Bhagalpur, we provide end-to-end technology consulting — from architecture and UI/UX design to deployment, DevOps, and 24/7 support.",
    link: "/services/it-consulting",
  },
  {
    title: "Software Company in Bihar",
    text: "ShivShakti Technology serves clients statewide as a full-service software company in Bihar, specializing in CRM, ERP, SaaS products, and cloud-native solutions.",
    link: "/services",
  },
  {
    title: "Website Development Company in Bihar",
    text: "Our website development team builds fast, SEO-optimized, responsive sites using React and modern frameworks — helping Bihar businesses grow their online presence.",
    link: "/services/web-development",
  },
  {
    title: "Mobile App Development Company in Bihar",
    text: "We develop Android and iOS applications for startups and enterprises across Bihar, with secure backends, intuitive UI, and scalable cloud infrastructure.",
    link: "/services/mobile-app-development",
  },
  {
    title: "CRM & Salesforce Consulting India",
    text: "ShivShakti Technology offers custom CRM development and Salesforce consulting for Indian businesses — implementation, integration, and managed services.",
    link: "/services/crm-development",
  },
];

export function LocalSeoSection() {
  return (
    <section className="section-padding bg-slate-50" aria-labelledby="local-seo-heading">
      <div className="mx-auto max-w-7xl px-4">
        <FadeIn>
          <div className="mb-10 text-center">
            <p className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-brand">
              <MapPin size={16} />
              Bhagalpur, Bihar, India
            </p>
            <h2 id="local-seo-heading" className="section-title">
              Your Local Software & IT Partner in Bihar
            </h2>
            <p className="section-subtitle mx-auto mt-4">
              ShivShakti Technology helps businesses in Bhagalpur and across Bihar with website development,
              mobile apps, CRM software, and custom digital solutions.
            </p>
          </div>
        </FadeIn>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {localKeywords.map((item, i) => (
            <FadeIn key={item.title} delay={i}>
              <article className="card h-full">
                <h3 className="mb-3 text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-slate-600">{item.text}</p>
                <Link to={item.link} className="text-sm font-semibold text-brand hover:underline">
                  Learn more →
                </Link>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
