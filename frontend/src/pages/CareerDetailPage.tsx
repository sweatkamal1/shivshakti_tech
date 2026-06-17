import { useCallback, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api, publicApi, type Career } from "../api/client";
import { DetailPageState } from "../components/DetailPageState";
import { FadeIn, PageHero } from "../components/motion/FadeIn";
import { usePublicResource } from "../hooks/usePublicResource";

export function CareerDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const load = useCallback((s: string) => publicApi.career(s), []);
  const { data: career, loading, notFound } = usePublicResource<Career>(slug, load);
  const [form, setForm] = useState({ name: "", email: "", phone: "", coverLetter: "", resumeUrl: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const apply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!career) return;
    setError("");
    try {
      await api("/api/careers/apply", {
        method: "POST",
        body: JSON.stringify({ careerId: career.id, ...form }),
      });
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to apply");
    }
  };

  if (loading) {
    return <DetailPageState loading notFound={false} backTo="/careers" backLabel="All Jobs" />;
  }
  if (notFound || !career) {
    return <DetailPageState loading={false} notFound backTo="/careers" backLabel="All Jobs" />;
  }

  return (
    <>
      <PageHero title={career.title} subtitle={`${career.department} · ${career.location} · ${career.employmentType}`} />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-20 lg:grid-cols-2">
        <FadeIn>
          <Link to="/careers" className="mb-6 inline-block text-sm font-medium text-brand hover:underline">
            ← All Jobs
          </Link>
          <div className="prose prose-slate max-w-none space-y-6 text-slate-700">
            <p>{career.description}</p>
            {career.requirements.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Requirements</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {career.requirements.map((r) => <li key={r}>{r}</li>)}
                </ul>
              </div>
            )}
            {career.responsibilities.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Responsibilities</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {career.responsibilities.map((r) => <li key={r}>{r}</li>)}
                </ul>
              </div>
            )}
          </div>
        </FadeIn>

        <FadeIn delay={1}>
          <div className="card sticky top-24">
            <h2 className="mb-4 text-xl font-bold text-slate-900">Apply for this position</h2>
            {sent ? (
              <p className="text-green-600">Application submitted! We will contact you soon.</p>
            ) : (
              <form onSubmit={apply} className="space-y-3">
                <input className="input" placeholder="Full Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                <input className="input" type="email" placeholder="Email *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                <input className="input" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <input className="input" placeholder="Resume URL (LinkedIn/Drive)" value={form.resumeUrl} onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })} />
                <textarea className="input" rows={4} placeholder="Cover Letter" value={form.coverLetter} onChange={(e) => setForm({ ...form, coverLetter: e.target.value })} />
                {error && <p className="text-sm text-red-600">{error}</p>}
                <button type="submit" className="btn-primary w-full">Submit Application</button>
              </form>
            )}
          </div>
        </FadeIn>
      </div>
    </>
  );
}
