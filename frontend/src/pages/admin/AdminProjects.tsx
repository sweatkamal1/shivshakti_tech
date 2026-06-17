import { useEffect, useState } from "react";
import { api } from "../../api/client";

interface AdminProject {
  id: string;
  title: string;
  description?: string;
  status: string;
  progress: number;
  client?: { email: string; profile?: { firstName: string; lastName: string; company?: string } };
  milestones?: { id: string; title: string; status: string }[];
}

export function AdminProjects() {
  const [projects, setProjects] = useState<AdminProject[]>([]);

  useEffect(() => {
    api<AdminProject[]>("/api/admin/projects").then((r) => setProjects(r.data ?? []));
  }, []);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Client Projects</h1>
      {projects.length === 0 ? (
        <p className="text-sm text-slate-500">No projects yet.</p>
      ) : (
        <div className="space-y-4">
          {projects.map((p) => (
            <div key={p.id} className="card">
              <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h2 className="font-semibold text-slate-900">{p.title}</h2>
                  <p className="text-xs text-slate-500">
                    {p.client?.profile
                      ? `${p.client.profile.firstName} ${p.client.profile.lastName}${p.client.profile.company ? ` · ${p.client.profile.company}` : ""}`
                      : p.client?.email}
                  </p>
                </div>
                <div className="flex gap-2 text-xs">
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-slate-600">{p.status}</span>
                  <span className="rounded-full bg-brand-light px-2 py-1 font-medium text-brand">{p.progress}%</span>
                </div>
              </div>
              {p.description && <p className="mb-3 text-sm text-slate-600">{p.description}</p>}
              <div className="h-2 rounded-full bg-slate-200">
                <div className="h-2 rounded-full bg-brand" style={{ width: `${p.progress}%` }} />
              </div>
              {p.milestones && p.milestones.length > 0 && (
                <ul className="mt-4 space-y-1 text-sm text-slate-500">
                  {p.milestones.map((m) => (
                    <li key={m.id}>{m.title} — {m.status}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
