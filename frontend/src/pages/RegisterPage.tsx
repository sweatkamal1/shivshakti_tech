import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CircleCheckBig, Rocket, Building2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function RegisterPage() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    company: "",
    phone: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await registerUser(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    }
  };

  return (
    <div className="bg-muted px-4 py-12 md:py-16">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-2">
        <div className="bg-slate-900 p-8 text-white md:p-10">
          <p className="mb-3 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
            Professional Onboarding
          </p>
          <h1 className="text-3xl font-bold leading-tight">Create your client workspace</h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-300">
            Start collaborating with our team through a centralized client portal for project
            tracking, support, and communication.
          </p>
          <div className="mt-8 space-y-4 text-sm text-slate-200">
            <div className="flex items-center gap-3">
              <Rocket size={18} className="text-blue-300" />
              Faster onboarding and project kickoff
            </div>
            <div className="flex items-center gap-3">
              <CircleCheckBig size={18} className="text-blue-300" />
              Transparent updates and milestone tracking
            </div>
            <div className="flex items-center gap-3">
              <Building2 size={18} className="text-blue-300" />
              Built for teams, agencies, and enterprises
            </div>
          </div>
        </div>

        <div className="p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Create account</h2>
              <p className="mt-1 text-sm text-slate-500">Set up your professional client login in under a minute.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="firstName">First name</label>
                <input id="firstName" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} placeholder="John" className="input" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="lastName">Last name</label>
                <input id="lastName" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} placeholder="Doe" className="input" required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="email">Work email</label>
              <input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="name@company.com" className="input" required />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="password">Password</label>
                <input id="password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Minimum 8 characters" className="input" required minLength={8} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="phone">Phone (optional)</label>
                <input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91..." className="input" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="company">Company (optional)</label>
              <input id="company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Your company name" className="input" />
            </div>

            {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

            <button type="submit" className="btn-primary w-full">Create Account</button>

            <p className="text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link to="/login" className="text-brand font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
