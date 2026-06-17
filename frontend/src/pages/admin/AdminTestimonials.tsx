import { useEffect, useState } from "react";
import { api } from "../../api/client";

interface T {
  id: string;
  clientName: string;
  company?: string;
  role?: string;
  content: string;
  rating: number;
  status: string;
  createdAt: string;
}

const emptyForm = { clientName: "", company: "", role: "", content: "", rating: 5 };

export function AdminTestimonials() {
  const [items, setItems] = useState<T[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const load = () => api<T[]>("/api/admin/testimonials").then((r) => setItems(r.data ?? []));

  useEffect(() => { load(); }, []);

  const setStatus = async (id: string, status: string) => {
    await api(`/api/admin/testimonials/${id}`, { method: "PATCH", body: JSON.stringify({ status }) });
    load();
  };

  const remove = async (id: string) => {
    await api(`/api/admin/testimonials/${id}`, { method: "DELETE" });
    load();
  };

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      await api("/api/admin/testimonials", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setForm(emptyForm);
      setMessage("Testimonial added and published on homepage.");
      load();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Failed to add");
    } finally {
      setSaving(false);
    }
  };

  const pending = items.filter((t) => t.status === "PENDING");
  const others = items.filter((t) => t.status !== "PENDING");

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Testimonials</h1>

      <form onSubmit={add} className="card mb-8 max-w-2xl space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">Add Client Testimonial</h2>
        <p className="text-sm text-slate-500">Published testimonials appear on the homepage.</p>
        <div className="grid gap-4 md:grid-cols-2">
          <input className="input" placeholder="Client Name *" value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })} required />
          <input className="input" placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
          <input className="input" placeholder="Role / Designation" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
          <input className="input" type="number" min={1} max={5} placeholder="Rating (1-5)" value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} />
        </div>
        <textarea className="input" rows={4} placeholder="Testimonial content *" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required />
        {message && <p className="text-sm text-green-700">{message}</p>}
        <button type="submit" className="btn-primary" disabled={saving}>{saving ? "Saving..." : "Add & Publish"}</button>
      </form>

      {pending.length > 0 && (
        <>
          <h2 className="mb-3 text-lg font-semibold text-amber-600">Pending Approval ({pending.length})</h2>
          <div className="mb-8 space-y-3">
            {pending.map((t) => (
              <div key={t.id} className="card border-amber-200">
                <p className="mb-2 text-sm text-slate-700">{t.content}</p>
                <p className="mb-3 text-xs text-slate-500">{t.clientName} · {t.company} · {t.rating}★</p>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setStatus(t.id, "APPROVED")} className="btn-primary text-xs">Approve</button>
                  <button type="button" onClick={() => setStatus(t.id, "REJECTED")} className="btn-outline text-xs">Reject</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <h2 className="mb-3 text-lg font-semibold">All Reviews</h2>
      <div className="space-y-3">
        {others.length === 0 ? (
          <p className="text-sm text-slate-500">No testimonials yet.</p>
        ) : (
          others.map((t) => (
            <div key={t.id} className="card">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-sm font-medium text-slate-900">{t.clientName}</span>
                  <span className={`ml-2 text-xs ${t.status === "APPROVED" ? "text-green-600" : "text-red-600"}`}>{t.status}</span>
                  {(t.role || t.company) && (
                    <p className="mt-1 text-xs text-slate-500">{[t.role, t.company].filter(Boolean).join(" · ")}</p>
                  )}
                </div>
                <button type="button" onClick={() => remove(t.id)} className="text-xs text-red-600 hover:text-red-700">Delete</button>
              </div>
              <p className="mt-2 text-sm text-slate-600">{t.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
