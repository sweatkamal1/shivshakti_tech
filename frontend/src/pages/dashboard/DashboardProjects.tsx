import { useEffect, useState } from "react";
import { api, type Project } from "../../api/client";

export function DashboardProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    api<Project[]>("/api/projects").then((r) => setProjects(r.data ?? []));
  }, []);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">My Projects</h1>
      {projects.length === 0 ? (
        <p className="text-sm text-slate-500">No projects assigned yet.</p>
      ) : (
        <div className="space-y-4">
          {projects.map((p) => (
            <div key={p.id} className="card">
              <div className="mb-2 flex justify-between">
                <h2 className="font-semibold text-slate-900">{p.title}</h2>
                <span className="text-sm font-medium text-brand">{p.progress}%</span>
              </div>
              <p className="mb-4 text-sm text-slate-600">{p.description}</p>
              <div className="h-2 rounded-full bg-slate-200">
                <div className="h-2 rounded-full bg-brand" style={{ width: `${p.progress}%` }} />
              </div>
              {p.milestones && (
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
