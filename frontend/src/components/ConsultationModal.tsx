import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { LeadForm } from "./LeadForm";

export function ConsultationModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("consultation-modal");
    if (!seen) {
      const timer = setTimeout(() => setOpen(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const close = () => {
    sessionStorage.setItem("consultation-modal", "1");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button type="button" className="absolute inset-0 bg-black/50" onClick={close} aria-label="Close" />
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <button
          type="button"
          onClick={close}
          className="absolute right-4 top-4 rounded-full p-1 text-slate-500 hover:bg-slate-100"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>
        <div className="bg-gradient-to-r from-[#0052cc] to-[#0099ff] p-6 text-white">
          <h2 className="text-xl font-bold">Become a next-gen business with us.</h2>
          <p className="mt-2 text-sm text-blue-100">
            Tell us about your idea and we&apos;ll bring it to life. Schedule a FREE consultation today.
          </p>
        </div>
        <div className="p-6">
          <LeadForm compact onSuccess={close} />
          <p className="mt-4 text-center text-sm text-slate-500">
            Looking for a new career?{" "}
            <Link to="/careers" onClick={close} className="font-medium text-[#0052cc] hover:underline">
              View job openings
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
