import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { LogOut, Home } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const links = [
  { to: "/dashboard", label: "Overview", end: true },
  { to: "/dashboard/projects", label: "Projects" },
  { to: "/dashboard/tickets", label: "Tickets" },
  { to: "/dashboard/testimonials", label: "My Reviews" },
  { to: "/dashboard/profile", label: "Profile" },
];

export function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen flex-col bg-muted">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:px-6">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-sm text-slate-500 hover:text-brand">
            <Home size={16} /> Website
          </Link>
          <span className="hidden text-slate-300 sm:inline">|</span>
          <span className="text-sm font-medium text-brand">Client Portal</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-slate-500 sm:inline">
            {user?.profile?.firstName ?? user?.email}
          </span>
          <button type="button" onClick={handleLogout} className="btn-outline flex items-center gap-2 text-xs">
            <LogOut size={14} /> Logout
          </button>
        </div>
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        <aside className="border-b border-slate-200 bg-white p-4 md:w-64 md:shrink-0 md:border-b-0 md:border-r">
          <nav className="flex gap-1 overflow-x-auto md:flex-col md:overflow-visible">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-lg px-3 py-2 text-sm md:whitespace-normal ${
                    isActive ? "bg-brand-light font-medium text-brand" : "text-slate-600 hover:bg-slate-50 hover:text-brand"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
