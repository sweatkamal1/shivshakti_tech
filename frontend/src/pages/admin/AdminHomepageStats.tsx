import { useEffect, useState } from "react";
import { api } from "../../api/client";

interface HomepageStatsForm {
  projects: number;
  globalClients: number;
  cloudExperts: number;
}

export function AdminHomepageStats() {
  const [form, setForm] = useState<HomepageStatsForm>({
    projects: 0,
    globalClients: 0,
    cloudExperts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api<HomepageStatsForm>("/api/admin/homepage-stats")
      .then((res) => setForm(res.data ?? { projects: 0, globalClients: 0, cloudExperts: 0 }))
      .finally(() => setLoading(false));
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      await api("/api/admin/homepage-stats", {
        method: "PATCH",
        body: JSON.stringify(form),
      });
      setMessage("Homepage stats updated successfully.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Failed to update");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-zinc-400">Loading...</p>;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Homepage Stats</h1>
      <form onSubmit={save} className="card max-w-xl space-y-4">
        <p className="text-sm text-zinc-500">
          Update numbers shown in the homepage blue stats section.
        </p>

        <div>
          <label className="mb-1 block text-sm text-zinc-400">Projects</label>
          <input
            type="number"
            min={0}
            className="input"
            value={form.projects}
            onChange={(e) => setForm({ ...form, projects: Number(e.target.value || 0) })}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-zinc-400">Global Clients</label>
          <input
            type="number"
            min={0}
            className="input"
            value={form.globalClients}
            onChange={(e) => setForm({ ...form, globalClients: Number(e.target.value || 0) })}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-zinc-400">Cloud Experts</label>
          <input
            type="number"
            min={0}
            className="input"
            value={form.cloudExperts}
            onChange={(e) => setForm({ ...form, cloudExperts: Number(e.target.value || 0) })}
          />
        </div>

        {message && <p className="text-sm text-zinc-300">{message}</p>}

        <button type="submit" className="btn-primary" disabled={saving}>
          {saving ? "Saving..." : "Save Stats"}
        </button>
      </form>
    </div>
  );
}
