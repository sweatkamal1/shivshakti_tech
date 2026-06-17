import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, type Project } from "../../api/client";

export function DashboardHome() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    api<Project[]>("/api/projects").then((r) => setProjects(r.data ?? []));
  }, []);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="card">
          <p className="text-sm text-zinc-500">Active Projects</p>
          <p className="text-3xl font-bold">{projects.length}</p>
        </div>
      </div>
      <h2 className="mb-4 mt-8 text-lg font-semibold">Recent Projects</h2>
      {projects.length === 0 ? (
        <p className="text-zinc-400">No projects yet.</p>
      ) : (
        <div className="space-y-3">
          {projects.map((p) => (
            <Link key={p.id} to={`/dashboard/projects`} className="card block hover:border-indigo-500/30">
              <div className="flex justify-between">
                <span className="font-medium">{p.title}</span>
                <span className="text-sm text-indigo-400">{p.progress}%</span>
              </div>
              <p className="text-sm text-zinc-500">{p.status}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
