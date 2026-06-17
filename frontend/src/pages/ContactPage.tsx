import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../api/client";
import { FadeIn, PageHero } from "../components/motion/FadeIn";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(3),
  message: z.string().min(10),
});

type FormData = z.infer<typeof schema>;

export function ContactPage() {
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setSubmitError("");
    try {
      await api("/api/contact", { method: "POST", body: JSON.stringify(data) });
      setSuccess(true);
      reset();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Failed to send message");
    }
  };

  return (
    <>
      <PageHero title="Contact Us" subtitle="We would love to hear from you" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-20 lg:grid-cols-2">
        <FadeIn>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-900">Get in Touch</h2>
            {[
              { icon: Mail, text: "shreeshivshaktiyogpeeth@gmail.com" },
              { icon: Phone, text: "+91 9262689110" },
              { icon: MapPin, text: "Baijani, Bhagalpur, Bihar" },
            ].map((item) => (
              <motion.div
                key={item.text}
                className="flex items-center gap-3 text-slate-600"
                whileHover={{ x: 4 }}
              >
                <item.icon size={18} className="text-[#0052cc]" />
                {item.text}
              </motion.div>
            ))}
            <p className="text-sm text-slate-500">Messages go directly to our admin team.</p>
          </div>
        </FadeIn>

        <FadeIn delay={1}>
          {success ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="card text-center text-green-600"
            >
              Message sent! Our team will respond within 24 hours.
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="card space-y-4">
              <input {...register("name")} placeholder="Name *" className="input" />
              {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
              <input {...register("email")} type="email" placeholder="Email *" className="input" />
              <input {...register("phone")} placeholder="Phone" className="input" />
              <input {...register("subject")} placeholder="Subject *" className="input" />
              <textarea {...register("message")} rows={5} placeholder="Message *" className="input" />
              {submitError && <p className="text-sm text-red-600">{submitError}</p>}
              <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </FadeIn>
      </div>
    </>
  );
}
