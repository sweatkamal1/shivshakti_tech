import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, BriefcaseBusiness, Headset } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const user = await login(email, password);
      navigate(user.role === "ADMIN" || user.role === "STAFF" ? "/admin" : "/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  };

  return (
    <div className="bg-muted px-4 py-12 md:py-16">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-2">
        <div className="bg-gradient-to-br from-brand via-[#006ce0] to-[#0092ff] p-8 text-white md:p-10">
          <p className="mb-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
            Client Portal
          </p>
          <h1 className="text-3xl font-bold leading-tight">Welcome back to ShivShakti Technology</h1>
          <p className="mt-4 text-sm leading-relaxed text-blue-100">
            Access your projects, tickets, updates, and delivery progress in one secure place.
          </p>
          <div className="mt-8 space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <ShieldCheck size={18} className="text-blue-100" />
              Bank-grade secure authentication
            </div>
            <div className="flex items-center gap-3">
              <BriefcaseBusiness size={18} className="text-blue-100" />
              Real-time project and support visibility
            </div>
            <div className="flex items-center gap-3">
              <Headset size={18} className="text-blue-100" />
              Direct collaboration with delivery team
            </div>
          </div>
        </div>

        <div className="p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Sign in</h2>
              <p className="mt-1 text-sm text-slate-500">Use your registered business email and password.</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="email">Email address</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" className="input" required />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="password">Password</label>
              <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="input" required />
            </div>

            {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

            <button type="submit" className="btn-primary w-full">Sign In</button>

            <p className="text-center text-sm text-slate-500">
              New to ShivShakti?{" "}
              <Link to="/register" className="text-brand font-semibold hover:underline">
                Create account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
