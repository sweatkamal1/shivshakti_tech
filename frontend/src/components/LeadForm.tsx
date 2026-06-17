import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../api/client";
import { leadServiceOptions } from "../lib/site-data";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(5, "Phone is required"),
  company: z.string().min(1, "Company is required"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  nda: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

interface LeadFormProps {
  compact?: boolean;
  onSuccess?: () => void;
}

export function LeadForm({ compact, onSuccess }: LeadFormProps) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setError("");
    try {
      await api("/api/leads", {
        method: "POST",
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          service: data.service,
          message: data.message + (data.nda ? "\n[NDA requested]" : ""),
        }),
      });
      setSuccess(true);
      reset();
      onSuccess?.();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to submit");
    }
  };

  if (success) {
    return (
      <div className="rounded-lg bg-green-50 p-6 text-center text-green-700">
        Thank you! Our expert consultants will reach out within 24 hours.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={compact ? "space-y-3" : "card space-y-4"}>
      <div className={compact ? "space-y-3" : "grid gap-4 md:grid-cols-2"}>
        <div>
          <input {...register("name")} placeholder="Full Name *" className="input" />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <input {...register("email")} type="email" placeholder="Company Email *" className="input" />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <input {...register("phone")} placeholder="Phone Number *" className="input" />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
        </div>
        <div>
          <input {...register("company")} placeholder="Company Name *" className="input" />
          {errors.company && <p className="mt-1 text-xs text-red-600">{errors.company.message}</p>}
        </div>
      </div>
      <div>
        <select {...register("service")} className="input" defaultValue="">
          <option value="" disabled>What Are You Looking For? *</option>
          {leadServiceOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        {errors.service && <p className="mt-1 text-xs text-red-600">{errors.service.message}</p>}
      </div>
      <div>
        <textarea {...register("message")} rows={compact ? 3 : 4} placeholder="Your Message *" className="input" />
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
      </div>
      <label className="flex items-center gap-2 text-sm text-slate-600">
        <input type="checkbox" {...register("nda")} className="rounded border-slate-300" />
        Yes, send me a Mutual NDA (Non-Disclosure Agreement)
      </label>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
        {isSubmitting ? "Submitting..." : "Submit Now"}
      </button>
    </form>
  );
}
