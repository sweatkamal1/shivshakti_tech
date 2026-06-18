import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { api } from "../api/client";
import { serviceMegaMenu } from "../lib/site-data";

export function Footer() {
  const [email, setEmail] = useState("");
  const [newsletterMsg, setNewsletterMsg] = useState("");
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  const subscribe = async () => {
    if (!email.trim()) return;
    setNewsletterLoading(true);
    setNewsletterMsg("");
    try {
      await api("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: "Newsletter Subscriber",
          email: email.trim(),
          subject: "Newsletter Subscription",
          message: "Please add this email to the ShivShakti Technology newsletter list.",
        }),
      });
      setNewsletterMsg("Subscribed! Thank you.");
      setEmail("");
    } catch (err) {
      setNewsletterMsg(err instanceof Error ? err.message : "Subscription failed");
    } finally {
      setNewsletterLoading(false);
    }
  };

  return (
    <footer className="bg-[#0f172a] text-slate-300">
      <div className="border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
          <p className="text-center text-sm font-medium text-white md:text-left">
            Subscribe To Our Newsletter for latest business insights!
          </p>
          <div className="w-full max-w-md">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input flex-1 text-sm"
              />
              <button type="button" onClick={subscribe} disabled={newsletterLoading} className="btn-primary shrink-0 text-xs">
                {newsletterLoading ? "..." : "Sign Up"}
              </button>
            </div>
            {newsletterMsg && <p className="mt-2 text-xs text-slate-400">{newsletterMsg}</p>}
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-1">
          <div className="mb-4 flex items-center gap-2">
            <img
              src="/shivshakti-logo.svg"
              alt="ShivShakti Technology logo"
              width={36}
              height={36}
              loading="lazy"
              className="h-9 w-9 rounded-md object-contain"
            />
            <span className="font-bold text-white">ShivShakti Technology</span>
          </div>
          <div className="space-y-2 text-sm">
            <Link to="/about" className="block hover:text-white">About Us</Link>
            <Link to="/careers" className="block hover:text-white">Careers</Link>
            <Link to="/contact" className="block hover:text-white">Contact Us</Link>
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-white">Services</h4>
          <ul className="space-y-2 text-sm">
            {serviceMegaMenu.Salesforce.slice(0, 5).map((s) => (
              <li key={s}><Link to="/services" className="hover:text-white">{s}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-white">&nbsp;</h4>
          <ul className="space-y-2 text-sm">
            {serviceMegaMenu.Cloud.map((s) => (
              <li key={s}><Link to="/services" className="hover:text-white">{s}</Link></li>
            ))}
            {serviceMegaMenu.AWS.slice(0, 2).map((s) => (
              <li key={s}><Link to="/services" className="hover:text-white">{s}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-white">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/blog" className="hover:text-white">Blogs</Link></li>
            <li><Link to="/blog" className="hover:text-white">Case Studies</Link></li>
            <li><Link to="/blog" className="hover:text-white">Customer Success Stories</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-white">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Mail size={16} className="mt-0.5 shrink-0 text-blue-400" />
              shreeshivshaktiyogpeeth@gmail.com
            </li>
            <li className="flex items-start gap-2">
              <Phone size={16} className="mt-0.5 shrink-0 text-blue-400" />
              +91 9262689110
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-blue-400" />
              Baijani, Bhagalpur, Bihar, India
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-xs text-slate-500 md:flex-row">
          <p>© {new Date().getFullYear()} ShivShakti Technology. All Rights Reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
