import { FadeIn, PageHero } from "../components/motion/FadeIn";
import { Seo } from "../components/Seo";
import { PAGE_SEO } from "../lib/seo-config";

interface LegalPageProps {
  title: string;
  sections: { heading: string; body: string }[];
}

export function LegalPage({ title, sections }: LegalPageProps) {
  return (
    <>
      <PageHero title={title} subtitle="Last updated: June 2026" />
      <section className="section-padding pt-8">
        <div className="mx-auto max-w-3xl space-y-8 px-4">
          {sections.map((section) => (
            <FadeIn key={section.heading}>
              <div>
                <h2 className="mb-3 text-xl font-bold text-slate-900">{section.heading}</h2>
                <p className="leading-relaxed text-slate-600">{section.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}

const privacySections = [
  {
    heading: "Information We Collect",
    body: "We collect information you provide when contacting us, requesting a consultation, creating an account, or subscribing to updates. This may include your name, email, phone number, company name, and project details.",
  },
  {
    heading: "How We Use Your Information",
    body: "We use your information to respond to inquiries, deliver services, manage client accounts, improve our website, and send relevant business communications when permitted.",
  },
  {
    heading: "Data Security",
    body: "We apply reasonable technical and organizational measures to protect personal data. Access to client information is limited to authorized team members.",
  },
  {
    heading: "Contact",
    body: "For privacy-related questions, email shreeshivshaktiyogpeeth@gmail.com or write to ShivShakti Technology, Baijani, Bhagalpur, Bihar, India.",
  },
];

const termsSections = [
  {
    heading: "Services",
    body: "ShivShakti Technology provides IT consulting, software development, and related digital services. Specific deliverables, timelines, and fees are defined in individual statements of work or agreements.",
  },
  {
    heading: "Client Responsibilities",
    body: "Clients agree to provide accurate information, timely feedback, and necessary access required for project delivery. Delays caused by missing inputs may affect schedules.",
  },
  {
    heading: "Intellectual Property",
    body: "Unless otherwise agreed in writing, project deliverables transfer to the client upon full payment. Pre-existing tools, frameworks, and internal libraries remain the property of ShivShakti Technology.",
  },
  {
    heading: "Limitation of Liability",
    body: "Our liability is limited to the extent permitted by applicable law. We are not liable for indirect or consequential damages arising from use of our website or services.",
  },
  {
    heading: "Contact",
    body: "Questions about these terms may be sent to shreeshivshaktiyogpeeth@gmail.com.",
  },
];

export function PrivacyPage() {
  return (
    <>
      <Seo
        title={PAGE_SEO.privacy.title}
        description={PAGE_SEO.privacy.description}
        path="/privacy"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ]}
      />
      <LegalPage title="Privacy Policy" sections={privacySections} />
    </>
  );
}

export function TermsPage() {
  return (
    <>
      <Seo
        title={PAGE_SEO.terms.title}
        description={PAGE_SEO.terms.description}
        path="/terms"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Terms & Conditions", path: "/terms" },
        ]}
      />
      <LegalPage title="Terms & Conditions" sections={termsSections} />
    </>
  );
}
