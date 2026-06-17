import { useEffect, useState } from "react";
import { api } from "../../api/client";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  isPublished: boolean;
}

export function AdminBlog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [form, setForm] = useState({ title: "", excerpt: "", content: "", tags: "" });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const load = () => api<Post[]>("/api/admin/blog").then((r) => setPosts(r.data ?? [])).catch(() => setPosts([]));

  useEffect(() => { load(); }, []);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMsg("");
    try {
      const res = await api("/api/admin/blog", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(",").map((s) => s.trim()).filter(Boolean),
          isPublished: true,
        }),
      });
      setMsg(res.message ?? "Blog post published!");
      setForm({ title: "", excerpt: "", content: "", tags: "" });
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to publish");
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete post?")) return;
    await api(`/api/admin/blog/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Blog</h1>
      <form onSubmit={create} className="card mb-8 space-y-3">
        <input className="input" placeholder="Title *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <input className="input" placeholder="Short summary (excerpt) *" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} required minLength={5} />
        <textarea className="input" rows={6} placeholder="Full article content * (min 10 chars)" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required minLength={10} />
        <input className="input" placeholder="Tags (comma separated)" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
        {error && <p className="text-sm text-red-400">{error}</p>}
        {msg && <p className="text-sm text-green-400">{msg}</p>}
        <button type="submit" className="btn-primary">Publish Post</button>
      </form>
      <div className="space-y-3">
        {posts.length === 0 && <p className="text-zinc-500">No posts yet.</p>}
        {posts.map((p) => (
          <div key={p.id} className="card flex justify-between">
            <div>
              <p className="font-medium">{p.title}</p>
              <p className="text-sm text-zinc-500">{p.isPublished ? "✓ Live on website" : "Draft"}</p>
            </div>
            <button onClick={() => remove(p.id)} className="text-sm text-red-400">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
