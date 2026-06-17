import { useEffect, useState } from "react";
import { api, type Lead } from "../../api/client";

const STATUSES = ["NEW", "CONTACTED", "PROPOSAL_SENT", "CONVERTED", "CLOSED"];

export function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState("");

  const load = () => {
    const q = filter ? `?status=${filter}` : "";
    api<Lead[]>(`/api/admin/leads${q}`).then((r) => setLeads(r.data ?? []));
  };

  useEffect(() => { load(); }, [filter]);

  const updateStatus = async (id: string, status: string) => {
    await api(`/api/admin/leads/${id}`, { method: "PATCH", body: JSON.stringify({ status }) });
    load();
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Leads</h1>
      <select value={filter} onChange={(e) => setFilter(e.target.value)} className="input mb-4 max-w-xs">
        <option value="">All statuses</option>
        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
      <div className="space-y-3">
        {leads.map((l) => (
          <div key={l.id} className="card">
            <div className="flex flex-wrap justify-between gap-2">
              <div>
                <p className="font-medium">{l.name} — {l.email}</p>
                <p className="text-sm text-zinc-500">{l.service} · {l.company}</p>
                <p className="mt-2 text-sm text-zinc-400">{l.message}</p>
              </div>
              <select value={l.status} onChange={(e) => updateStatus(l.id, e.target.value)} className="input h-10 max-w-[180px]">
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
