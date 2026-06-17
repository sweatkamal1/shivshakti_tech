import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/client";

interface Stats {
  leads: number;
  contacts: number;
  users: number;
  projects: number;
  openTickets: number;
  pendingTestimonials: number;
  newApplications: number;
}

export function AdminHome() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    api<Stats>("/api/admin/stats").then((r) => setStats(r.data ?? null));
  }, []);

  if (!stats) return <p className="text-zinc-400">Loading...</p>;

  const cards = [
    { label: "New Leads", value: stats.leads, to: "/admin/leads", color: "text-indigo-400" },
    { label: "Unread Contacts", value: stats.contacts, to: "/admin/contacts", color: "text-cyan-400" },
    { label: "Pending Reviews", value: stats.pendingTestimonials, to: "/admin/testimonials", color: "text-amber-400" },
    { label: "Job Applications", value: stats.newApplications, to: "/admin/careers", color: "text-green-400" },
    { label: "Users", value: stats.users, to: "/admin/users", color: "" },
    { label: "Open Tickets", value: stats.openTickets, to: "/admin/tickets", color: "text-red-400" },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        {cards.map((c) => (
          <Link key={c.label} to={c.to} className="card text-center transition hover:border-indigo-500/30">
            <p className="text-sm text-zinc-500">{c.label}</p>
            <p className={`text-3xl font-bold ${c.color}`}>{c.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
