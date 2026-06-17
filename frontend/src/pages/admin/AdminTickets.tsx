import { useEffect, useState } from "react";
import { api } from "../../api/client";

interface AdminTicket {
  id: string;
  subject: string;
  description: string;
  status: string;
  priority: string;
  createdAt: string;
  client?: { email: string; profile?: { firstName: string; lastName: string } };
}

export function AdminTickets() {
  const [tickets, setTickets] = useState<AdminTicket[]>([]);

  useEffect(() => {
    api<AdminTicket[]>("/api/admin/tickets").then((r) => setTickets(r.data ?? []));
  }, []);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Support Tickets</h1>
      {tickets.length === 0 ? (
        <p className="text-sm text-slate-500">No tickets yet.</p>
      ) : (
        <div className="space-y-4">
          {tickets.map((t) => (
            <div key={t.id} className="card">
              <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                <h2 className="font-semibold text-slate-900">{t.subject}</h2>
                <div className="flex gap-2 text-xs">
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-slate-600">{t.status}</span>
                  <span className="rounded-full bg-brand-light px-2 py-1 text-brand">{t.priority}</span>
                </div>
              </div>
              <p className="mb-3 text-sm text-slate-600">{t.description}</p>
              <p className="text-xs text-slate-500">
                {t.client?.profile ? `${t.client.profile.firstName} ${t.client.profile.lastName}` : t.client?.email}
                {" · "}
                {new Date(t.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
