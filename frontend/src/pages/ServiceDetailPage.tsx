import { useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { publicApi, type Service } from "../api/client";
import { DetailPageState } from "../components/DetailPageState";
import { FadeIn, PageHero } from "../components/motion/FadeIn";
import { Seo } from "../components/Seo";
import { usePublicResource } from "../hooks/usePublicResource";
import { serviceSchema } from "../lib/structured-data";

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const load = useCallback((s: string) => publicApi.service(s), []);
  const { data: service, loading, notFound } = usePublicResource<Service>(slug, load);

  if (loading) {
    return <DetailPageState loading notFound={false} backTo="/services" backLabel="Back to Services" />;
  }
  if (notFound || !service) {
    return <DetailPageState loading={false} notFound backTo="/services" backLabel="Back to Services" />;
  }

  const metaDescription = `${service.shortDescription} — ShivShakti Technology, software development company in Bhagalpur, Bihar.`;

  return (
    <>
      <Seo
        title={`${service.title} Services in Bihar`}
        description={metaDescription.slice(0, 160)}
        path={`/services/${service.slug}`}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ]}
        jsonLd={serviceSchema(service.title, service.description, service.slug)}
      />
      <PageHero title={service.title} subtitle={service.shortDescription} />
      <section className="section-padding">
        <div className="mx-auto max-w-4xl px-4">
          <FadeIn>
            <Link to="/services" className="mb-6 inline-block text-sm font-medium text-brand hover:underline">
              ← Back to Services
            </Link>
            <p className="mb-8 text-lg leading-relaxed text-slate-600">{service.description}</p>
            {service.features.length > 0 && (
              <div className="mb-8">
                <h2 className="mb-4 text-xl font-bold text-slate-900">Features</h2>
                <ul className="grid gap-3 md:grid-cols-2">
                  {service.features.map((f) => (
                    <li key={f} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">{f}</li>
                  ))}
                </ul>
              </div>
            )}
            {service.technologies.length > 0 && (
              <div className="mb-8 flex flex-wrap gap-2">
                {service.technologies.map((t) => (
                  <span key={t} className="rounded-full bg-brand-light px-3 py-1 text-xs font-medium text-brand">
                    {t}
                  </span>
                ))}
              </div>
            )}
            <div className="flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary inline-flex">Get a Quote</Link>
              <Link to="/services" className="btn-outline inline-flex">View All Services</Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
