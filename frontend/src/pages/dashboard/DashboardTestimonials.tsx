import { useEffect, useState } from "react";
import { api } from "../../api/client";

interface MyTestimonial {
  id: string;
  content: string;
  rating: number;
  status: string;
  createdAt: string;
}

export function DashboardTestimonials() {
  const [items, setItems] = useState<MyTestimonial[]>([]);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [msg, setMsg] = useState("");

  const load = () => api<MyTestimonial[]>("/api/testimonials/mine").then((r) => setItems(r.data ?? []));

  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await api("/api/testimonials", {
        method: "POST",
        body: JSON.stringify({ content, rating }),
      });
      setMsg(res.message ?? "Submitted!");
      setContent("");
      load();
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Failed");
    }
  };

  const statusColor: Record<string, string> = {
    PENDING: "text-amber-400",
    APPROVED: "text-green-400",
    REJECTED: "text-red-400",
  };

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">My Testimonials</h1>
      <p className="mb-6 text-sm text-zinc-500">Share your experience. Admin will review before publishing on the website.</p>

      <form onSubmit={submit} className="card mb-8 space-y-3">
        <textarea
          className="input"
          rows={4}
          placeholder="Write your review (min 20 characters)..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          minLength={20}
        />
        <div className="flex items-center gap-3">
          <label className="text-sm text-zinc-400">Rating:</label>
          <select className="input max-w-[80px]" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} ★</option>)}
          </select>
        </div>
        {msg && <p className="text-sm text-indigo-300">{msg}</p>}
        <button type="submit" className="btn-primary">Submit Review</button>
      </form>

      <div className="space-y-3">
        {items.map((t) => (
          <div key={t.id} className="card">
            <div className="mb-2 flex justify-between">
              <span className={`text-xs font-medium ${statusColor[t.status] ?? ""}`}>{t.status}</span>
              <span className="text-xs text-zinc-500">{new Date(t.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="text-sm text-slate-600">{t.content}</p>
          </div>
        ))}
        {items.length === 0 && <p className="text-zinc-500">No reviews submitted yet.</p>}
      </div>
    </div>
  );
}
