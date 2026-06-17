import { useEffect, useState } from "react";
import { api } from "../../api/client";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const load = () => api<Contact[]>("/api/admin/contacts").then((r) => setContacts(r.data ?? []));

  useEffect(() => { load(); }, []);

  const markRead = async (id: string) => {
    await api(`/api/admin/contacts/${id}`, { method: "PATCH" });
    load();
  };

  const unread = contacts.filter((c) => !c.isRead);

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Contact Messages</h1>
      <p className="mb-6 text-sm text-zinc-500">{unread.length} unread messages</p>
      <div className="space-y-3">
        {contacts.map((c) => (
          <div key={c.id} className={`card ${!c.isRead ? "border-indigo-500/40" : ""}`}>
            <div className="flex flex-wrap justify-between gap-2">
              <div>
                <p className="font-medium">{c.name} — {c.email}</p>
                {c.phone && <p className="text-xs text-zinc-500">{c.phone}</p>}
              </div>
              <div className="flex items-center gap-2">
                {!c.isRead && (
                  <button onClick={() => markRead(c.id)} className="btn-primary text-xs">Mark Read</button>
                )}
                <span className="text-xs text-zinc-500">{new Date(c.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <p className="mt-2 text-sm text-indigo-400">{c.subject}</p>
            <p className="mt-2 text-sm text-zinc-400">{c.message}</p>
          </div>
        ))}
        {contacts.length === 0 && <p className="text-zinc-500">No messages yet.</p>}
      </div>
    </div>
  );
}
