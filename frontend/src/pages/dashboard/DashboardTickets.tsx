import { useEffect, useState } from "react";
import { api, type SupportTicket } from "../../api/client";

export function DashboardTickets() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const load = () => api<SupportTicket[]>("/api/tickets").then((r) => setTickets(r.data ?? []));

  useEffect(() => { load(); }, []);

  const createTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    await api("/api/tickets", { method: "POST", body: JSON.stringify({ subject, description }) });
    setSubject("");
    setDescription("");
    load();
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Support Tickets</h1>
      <form onSubmit={createTicket} className="card mb-8 space-y-3">
        <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" className="input" required />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="input" rows={3} required />
        <button type="submit" className="btn-primary">Create Ticket</button>
      </form>
      <div className="space-y-3">
        {tickets.map((t) => (
          <div key={t.id} className="card">
            <div className="flex justify-between">
              <span className="font-medium">{t.subject}</span>
              <span className="text-xs text-zinc-500">{t.status}</span>
            </div>
            <p className="mt-2 text-sm text-zinc-400">{t.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
