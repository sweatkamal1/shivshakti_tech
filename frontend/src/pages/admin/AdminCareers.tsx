import { useEffect, useState } from "react";
import { api } from "../../api/client";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  isPublished: boolean;
}

interface Application {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: string;
  createdAt: string;
  career?: { title: string };
}

export function AdminCareers() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [apps, setApps] = useState<Application[]>([]);
  const [form, setForm] = useState({
    title: "", department: "", location: "", description: "", requirements: "", responsibilities: "",
  });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const load = () => {
    api<Job[]>("/api/admin/careers").then((r) => setJobs(r.data ?? [])).catch(() => setJobs([]));
    api<Application[]>("/api/admin/applications").then((r) => setApps(r.data ?? [])).catch(() => setApps([]));
  };

  useEffect(() => { load(); }, []);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMsg("");
    try {
      const res = await api("/api/admin/careers", {
        method: "POST",
        body: JSON.stringify({
          title: form.title,
          department: form.department,
          location: form.location,
          description: form.description,
          requirements: form.requirements.split("\n").map((s) => s.trim()).filter(Boolean),
          responsibilities: form.responsibilities.split("\n").map((s) => s.trim()).filter(Boolean),
          isPublished: true,
        }),
      });
      setMsg(res.message ?? "Job posted!");
      setForm({ title: "", department: "", location: "", description: "", requirements: "", responsibilities: "" });
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to post job");
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete job?")) return;
    await api(`/api/admin/careers/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Careers</h1>
      <form onSubmit={create} className="card mb-8 grid gap-3 md:grid-cols-2">
        <input className="input" placeholder="Job Title *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <input className="input" placeholder="Department *" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} required />
        <input className="input" placeholder="Location *" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
        <textarea className="input md:col-span-2" rows={3} placeholder="Job Description * (min 10 chars)" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required minLength={10} />
        <textarea className="input" rows={3} placeholder="Requirements (one per line)" value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })} />
        <textarea className="input" rows={3} placeholder="Responsibilities (one per line)" value={form.responsibilities} onChange={(e) => setForm({ ...form, responsibilities: e.target.value })} />
        {error && <p className="text-sm text-red-400 md:col-span-2">{error}</p>}
        {msg && <p className="text-sm text-green-400 md:col-span-2">{msg}</p>}
        <button type="submit" className="btn-primary md:col-span-2">Post Job</button>
      </form>

      <h2 className="mb-3 font-semibold">Open Positions ({jobs.length})</h2>
      <div className="mb-8 space-y-3">
        {jobs.map((j) => (
          <div key={j.id} className="card flex justify-between">
            <div>
              <p className="font-medium">{j.title}</p>
              <p className="text-sm text-zinc-500">{j.department} · {j.location} · {j.isPublished ? "Live" : "Hidden"}</p>
            </div>
            <button onClick={() => remove(j.id)} className="text-sm text-red-400">Delete</button>
          </div>
        ))}
      </div>

      <h2 className="mb-3 font-semibold">Applications ({apps.length})</h2>
      <div className="space-y-3">
        {apps.map((a) => (
          <div key={a.id} className="card">
            <p className="font-medium">{a.name} — {a.email}</p>
            <p className="text-sm text-indigo-400">{a.career?.title}</p>
            <p className="text-xs text-zinc-500">{a.status} · {new Date(a.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
