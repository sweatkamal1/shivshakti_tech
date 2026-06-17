import { useAuth } from "../../context/AuthContext";

export function DashboardProfile() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Profile</h1>
      <div className="card max-w-md space-y-3">
        <p><span className="text-zinc-500">Email:</span> {user?.email}</p>
        <p><span className="text-zinc-500">Name:</span> {user?.profile?.firstName} {user?.profile?.lastName}</p>
        <p><span className="text-zinc-500">Company:</span> {user?.profile?.company ?? "—"}</p>
        <p><span className="text-zinc-500">Phone:</span> {user?.profile?.phone ?? "—"}</p>
      </div>
    </div>
  );
}
