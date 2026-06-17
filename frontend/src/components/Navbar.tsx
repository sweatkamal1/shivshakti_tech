import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { industriesMenu, resourcesMenu, serviceMegaMenu } from "../lib/site-data";

const navLinks = [
  { to: "/about", label: "About" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact Us" },
];

type MegaKey = "services" | "industries" | "resources" | null;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState<MegaKey>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = mega ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mega]);

  const handleLogout = async () => {
    await logout();
    setOpen(false);
    navigate("/login");
  };

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-brand/10 text-brand"
        : "text-slate-700 hover:bg-slate-100 hover:text-brand"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <img src="/shivshakti-logo.svg" alt="ShivShakti Logo" className="h-11 w-11 rounded-lg object-contain ring-1 ring-slate-200" />
          <div className="leading-tight">
            <p className="text-[1.05rem] font-bold text-slate-900">ShivShakti</p>
            <p className="text-sm font-medium text-slate-500">Technology</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-slate-200 bg-slate-50/80 px-2 py-1 xl:flex">
          <NavLink to="/about" className={getNavLinkClass} onMouseEnter={() => setMega(null)}>About</NavLink>

          <button
            type="button"
            className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-brand"
            onMouseEnter={() => setMega("services")}
          >
            Services <ChevronDown size={14} className={mega === "services" ? "rotate-180" : ""} />
          </button>

          <button
            type="button"
            className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-brand"
            onMouseEnter={() => setMega("industries")}
          >
            Industries <ChevronDown size={14} className={mega === "industries" ? "rotate-180" : ""} />
          </button>

          <NavLink to="/services" className={getNavLinkClass} onMouseEnter={() => setMega(null)}>Products</NavLink>

          <button
            type="button"
            className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-brand"
            onMouseEnter={() => setMega("resources")}
          >
            Resources <ChevronDown size={14} className={mega === "resources" ? "rotate-180" : ""} />
          </button>

          {navLinks.filter((l) => l.label !== "About").map((link) => (
            <NavLink key={link.to} to={link.to} className={getNavLinkClass} onMouseEnter={() => setMega(null)}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          {user ? (
            <>
              {user.role === "ADMIN" || user.role === "STAFF" ? (
                <Link to="/admin" className="whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-brand">Admin</Link>
              ) : (
                <Link to="/dashboard" className="whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-brand">Portal</Link>
              )}
              <button type="button" onClick={handleLogout} className="flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-600">
                <LogOut size={14} /> Logout
              </button>
            </>
          ) : (
            <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1 shadow-inner">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-brand text-white shadow-sm"
                      : "text-slate-700 hover:bg-white hover:text-brand"
                  }`
                }
              >
                Sign In
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                    isActive
                      ? "bg-brand text-white shadow-sm"
                      : "text-slate-700 hover:bg-white hover:text-brand"
                  }`
                }
              >
                Sign Up
              </NavLink>
            </div>
          )}
          <Link to="/contact" className="btn-primary whitespace-nowrap rounded-full px-5 py-2.5 text-xs">Get a Free Consultation</Link>
        </div>

        <button type="button" className="xl:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mega menu overlay */}
      {mega && (
        <div
          className="absolute left-0 right-0 top-full hidden border-t border-slate-200 bg-white/95 shadow-2xl backdrop-blur xl:block"
          onMouseLeave={() => setMega(null)}
        >
          {mega === "services" && (
            <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 md:grid-cols-3 lg:grid-cols-6">
              {Object.entries(serviceMegaMenu).map(([category, items]) => (
                <div key={category}>
                  <p className="text-brand mb-3 text-sm font-bold">{category}</p>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li key={item}>
                        <Link
                          to="/services"
                          onClick={() => setMega(null)}
                          className="text-sm text-slate-600 transition hover:text-brand"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
          {mega === "industries" && (
            <div className="mx-auto max-w-7xl px-6 py-8">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {industriesMenu.map((ind) => (
                  <Link
                    key={ind}
                    to="/services"
                    onClick={() => setMega(null)}
                    className="rounded-lg border border-slate-100 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-brand/30 hover:bg-blue-50 hover:text-brand"
                  >
                    {ind}
                  </Link>
                ))}
              </div>
            </div>
          )}
          {mega === "resources" && (
            <div className="mx-auto max-w-7xl px-6 py-8">
              <div className="flex flex-wrap gap-6">
                {resourcesMenu.map((r) => (
                  <Link
                    key={r.label}
                    to={r.to}
                    onClick={() => setMega(null)}
                    className="text-sm font-medium text-slate-700 transition hover:text-brand"
                  >
                    {r.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 xl:hidden">
          <Link to="/about" onClick={() => setOpen(false)} className="block py-2 text-sm">About</Link>
          <Link to="/services" onClick={() => setOpen(false)} className="block py-2 text-sm">Products</Link>
          <Link to="/blog" onClick={() => setOpen(false)} className="block py-2 text-sm">Resources</Link>
          <Link to="/careers" onClick={() => setOpen(false)} className="block py-2 text-sm">Careers</Link>
          <Link to="/contact" onClick={() => setOpen(false)} className="block whitespace-nowrap py-2 text-sm">Contact Us</Link>
          {!user ? (
            <div className="mt-3 flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 p-1">
              <NavLink
                to="/login"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex-1 rounded-full px-3 py-2 text-center text-sm font-medium transition ${
                    isActive
                      ? "bg-brand text-white shadow-sm"
                      : "text-slate-700 hover:bg-white hover:text-brand"
                  }`
                }
              >
                Sign In
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex-1 rounded-full px-3 py-2 text-center text-sm font-semibold transition ${
                    isActive
                      ? "bg-brand text-white shadow-sm"
                      : "text-slate-700 hover:bg-white hover:text-brand"
                  }`
                }
              >
                Sign Up
              </NavLink>
            </div>
          ) : (
            <div className="mt-3 space-y-2 border-t border-slate-100 pt-3">
              {user.role === "ADMIN" || user.role === "STAFF" ? (
                <Link to="/admin" onClick={() => setOpen(false)} className="block py-2 text-sm font-medium text-slate-700">Admin Panel</Link>
              ) : (
                <Link to="/dashboard" onClick={() => setOpen(false)} className="block py-2 text-sm font-medium text-slate-700">Client Portal</Link>
              )}
              <button type="button" onClick={handleLogout} className="flex items-center gap-2 py-2 text-sm text-red-600">
                <LogOut size={14} /> Logout
              </button>
            </div>
          )}
          <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary mt-4 block w-full text-center text-xs">
            Get a Free Consultation
          </Link>
        </div>
      )}
    </header>
  );
}
