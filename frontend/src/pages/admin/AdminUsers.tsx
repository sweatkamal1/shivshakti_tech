import { useEffect, useState } from "react";
import { api } from "../../api/client";

interface UserRow {
  id: string;
  email: string;
  role: string;
  isActive: boolean;
  profile?: { firstName: string; lastName: string };
}

export function AdminUsers() {
  const [users, setUsers] = useState<UserRow[]>([]);

  useEffect(() => {
    api<UserRow[]>("/api/admin/users").then((r) => setUsers(r.data ?? []));
  }, []);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Users</h1>
      <div className="card overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-left text-slate-500">
            <th className="py-2">Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b border-slate-100">
              <td className="py-3 text-slate-900">{u.profile?.firstName} {u.profile?.lastName}</td>
              <td className="text-slate-700">{u.email}</td>
              <td className="text-slate-700">{u.role}</td>
              <td className="text-slate-700">{u.isActive ? "Active" : "Inactive"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
