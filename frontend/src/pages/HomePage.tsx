import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, BarChart3, Bot, Check, ShieldCheck, Sparkles, TrendingUp, Users, Workflow,
} from "lucide-react";
import { publicApi, type BlogPost, type HomepageStat, type Testimonial } from "../api/client";
import { LeadForm } from "../components/LeadForm";
import { TestimonialGrid } from "../components/TestimonialGrid";
import { ClientLogos } from "../components/home/ClientLogos";
import { TabbedServices } from "../components/home/TabbedServices";
import { PortfolioCarousel } from "../components/home/PortfolioCarousel";
import { WhyChooseSection } from "../components/home/WhyChooseSection";
import { AnimatedCounter } from "../components/home/AnimatedCounter";
import { FadeIn } from "../components/motion/FadeIn";
import {
  cloudServices, platformServices, portfolioCases, staffRoles, whyChooseItems,
} from "../lib/site-data";
import { Seo } from "../components/Seo";
import { LocalSeoSection } from "../components/LocalSeoSection";
import { PAGE_SEO } from "../lib/seo-config";
import { homePageSchemas } from "../lib/structured-data";

export function HomePage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [stats, setStats] = useState<HomepageStat[]>([]);

  useEffect(() => {
    publicApi.testimonials().then((r) => setTestimonials(r.data ?? []));
    publicApi.blog().then((r) => setBlogPosts(r.data?.slice(0, 6) ?? []));
    publicApi.stats().then((r) => setStats(r.data ?? []));
  }, []);

  return (
    <>
      <Seo
        title={PAGE_SEO.home.title}
        description={PAGE_SEO.home.description}
        path="/"
        jsonLd={homePageSchemas()}
      />
      {/* Hero — modern charted style */}
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,_#dbeafe_0,_#f8fafc_45%,_#ffffff_100%)]">
        <div className="pointer-events-none absolute -left-20 top-10 h-60 w-60 rounded-full bg-brand/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-cyan-200/30 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:py-24">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-3 py-1 text-xs font-semibold text-brand">
              <Sparkles size={14} />
              Digital Transformation Partner
            </p>
            <h1 className="text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl lg:text-[3.25rem]">
              Software Development Company in Bhagalpur &amp; Bihar
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600">
              ShivShakti Technology delivers website development, mobile apps, CRM software, and custom
              IT solutions for businesses across Bihar and India.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary inline-flex">
                Get Free Consultation <ArrowRight size={16} className="ml-2" />
              </Link>
              <Link to="/about" className="btn-outline inline-flex px-5 py-3 text-sm">
                See how we work
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1"><ShieldCheck size={14} className="text-brand" /> ISO-aligned practices</span>
              <span className="inline-flex items-center gap-1"><Workflow size={14} className="text-brand" /> Agile delivery pods</span>
              <span className="inline-flex items-center gap-1"><TrendingUp size={14} className="text-brand" /> KPI-driven execution</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            <div className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-2xl backdrop-blur">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-xs font-medium text-slate-500">Delivery Health</p>
                  <p className="mt-2 text-3xl font-extrabold text-slate-900">94%</p>
                  <div className="mt-3 h-2 rounded-full bg-slate-200">
                    <div className="h-2 w-[94%] rounded-full bg-brand" />
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-xs font-medium text-slate-500">Automation Gain</p>
                  <p className="mt-2 text-3xl font-extrabold text-slate-900">+37%</p>
                  <p className="mt-2 text-xs text-emerald-600">Operational efficiency improvement</p>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 md:col-span-2">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs font-medium text-slate-500">Transformation Stack</p>
                    <BarChart3 size={16} className="text-brand" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold">
                    {["Cloud", "Data", "AI", "CRM", "Security", "Ops"].map((item) => (
                      <div key={item} className="rounded-lg bg-brand/10 px-2 py-2 text-brand">{item}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -left-4 -top-4 hidden rounded-xl border border-brand/20 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-md sm:block">
              <span className="inline-flex items-center gap-1 text-brand"><Bot size={13} /> AI-led delivery</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Welcome */}
      <section className="section-padding bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[1.1fr_0.9fr]">
          <FadeIn>
            <h2 className="section-title">Welcome to ShivShakti Technology</h2>
            <p className="section-subtitle mt-6">
              As a trusted IT consulting company, we craft bespoke digital solutions aligned to your business goals.
              From architecture to execution, our experts convert complexity into scalable growth.
            </p>
          </FadeIn>
          <FadeIn delay={1}>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Strategy-first consulting",
                "Cross-functional product teams",
                "Strong governance and security",
                "Outcome-focused delivery",
              ].map((item) => (
                <div key={item} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <ClientLogos />

      {/* Journey CTA band */}
      <section className="bg-gradient-to-r from-[#0052cc] to-[#0099ff] py-10 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 md:flex-row">
          <div className="flex items-center gap-4">
            <div className="hidden h-14 w-14 items-center justify-center rounded-full bg-white/20 md:flex">
              <Users size={28} />
            </div>
            <p className="text-lg font-semibold md:text-xl">
              Start Your Personalized IT Journey Now!
            </p>
          </div>
          <Link to="/contact" className="btn-white shrink-0">
            Let&apos;s Talk
          </Link>
        </div>
      </section>

      {/* About */}
      <section className="section-padding bg-muted">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <FadeIn>
            <h2 className="section-title">Tech-Adept, Business-Centric: Get to Know Us</h2>
            <p className="section-subtitle mx-auto mt-6">
              ShivShakti Technology was founded with the vision of driving mutual growth with cutting-edge technologies.
              Our belief in mutual success has been our core ethos spurring us on the upward spiral of growth. Today, we
              stand as a trusted IT consulting company for enterprises worldwide. Yet, we&apos;ve kept our roots — retaining
              a small company&apos;s agility and personal touch, ensuring personalized attention to each client. We&apos;re big
              enough to serve tech giants, and small enough to care for each client.
            </p>
            <Link to="/about" className="btn-primary mt-8 inline-flex">
              About Us <ArrowRight size={16} className="ml-2" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Platform Services tabs */}
      <TabbedServices heading="Platform Services" tabs={platformServices} />

      {/* Public Cloud Services tabs */}
      <TabbedServices heading="Public Cloud Services" tabs={cloudServices} />

      {/* Stats */}
      <section className="bg-[#0052cc] py-16 text-white">
        <div className="mx-auto grid max-w-4xl grid-cols-3 gap-8 px-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-4xl font-extrabold md:text-5xl">
                <AnimatedCounter value={s.value} suffix="" />
              </p>
              <p className="mt-2 text-sm text-blue-200">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Staff Augmentation */}
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <FadeIn>
            <div className="mb-10 text-center">
              <h2 className="section-title">Staff Augmentation Services</h2>
              <p className="section-subtitle mx-auto">
                With our IT staff augmentation services, we bridge the gap between your business needs and the right IT talent.
                You can start small, and scale up as you grow.
              </p>
            </div>
          </FadeIn>
          <div className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2">
            {staffRoles.map((role, i) => (
              <FadeIn key={role} delay={i}>
                <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-5 py-3">
                  <Check size={18} className="text-[#0052cc]" />
                  <span className="text-sm font-medium text-slate-800">{role}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <PortfolioCarousel cases={portfolioCases} />

      {/* Testimonials — only when admin has published reviews */}
      {testimonials.length > 0 && (
        <section className="section-padding bg-white">
          <div className="mx-auto max-w-7xl px-4">
            <FadeIn>
              <div className="mb-10 text-center">
                <h2 className="section-title">Hear it from our Clients</h2>
                <p className="section-subtitle mx-auto">
                  Read what our satisfied clients have to say about their experience.
                </p>
              </div>
            </FadeIn>
            <TestimonialGrid items={testimonials} />
          </div>
        </section>
      )}

      <WhyChooseSection items={whyChooseItems} />

      {/* Products */}
      <section className="section-padding bg-muted">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <FadeIn>
            <h2 className="section-title">Our Products</h2>
            <p className="section-subtitle mx-auto">
              Have a look at our products to manage your business smartly.
            </p>
          </FadeIn>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {["CRM Suite", "Lead Manager", "Ticket Portal", "Analytics Hub"].map((p, i) => (
              <FadeIn key={p} delay={i}>
                <div className="card flex h-40 flex-col items-center justify-center">
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-[#0052cc] text-xl font-bold text-white">
                    {p[0]}
                  </div>
                  <p className="font-semibold text-slate-800">{p}</p>
                  <Link to="/contact" className="mt-2 text-sm font-medium text-[#0052cc]">Explore →</Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      {blogPosts.length > 0 && (
        <section className="section-padding bg-white">
          <div className="mx-auto max-w-7xl px-4">
            <FadeIn>
              <div className="mb-10 text-center">
                <h2 className="section-title">Dive Deep Into Technology Here</h2>
                <p className="section-subtitle mx-auto">
                  Read the latest tech news and get deeper insights with our blogs.
                </p>
              </div>
            </FadeIn>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((p, i) => (
                <FadeIn key={p.id} delay={i}>
                  <Link to={`/blog/${p.slug}`} className="group block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
                    <div className="flex h-40 items-center justify-center bg-gradient-to-br from-[#e8f1ff] to-[#cce0ff]">
                      <span className="text-4xl font-bold text-[#0052cc]/30">SS</span>
                    </div>
                    <div className="p-5">
                      <p className="mb-2 text-xs text-slate-500">
                        {p.publishedAt ? new Date(p.publishedAt).toLocaleDateString() : "Recent"}
                      </p>
                      <h3 className="mb-2 font-bold text-slate-900 group-hover:text-[#0052cc]">{p.title}</h3>
                      <p className="text-sm text-slate-600 line-clamp-2">{p.excerpt}</p>
                      <span className="mt-3 inline-block text-sm font-semibold text-[#0052cc]">Explore →</span>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      <LocalSeoSection />

      {/* Contact */}
      <section id="contact" className="section-padding bg-slate-50">
        <div className="mx-auto max-w-7xl px-4">
          <FadeIn>
            <div className="mb-12 text-center">
              <h2 className="section-title">Let&apos;s Get In Touch</h2>
              <p className="section-subtitle mx-auto">
                Our expert consultants will reach out within 24 hours.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-10 lg:grid-cols-2">
            <FadeIn>
              <div className="space-y-8">
                <div className="rounded-xl border border-slate-200 bg-white p-6">
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#0052cc]">Bihar, India</p>
                  <h3 className="mb-2 font-bold text-slate-900">BHAGALPUR, INDIA</h3>
                  <p className="text-sm text-slate-600">Baijani, Bhagalpur, Bihar 812001</p>
                  <p className="mt-2 text-sm font-medium text-slate-800">+91 9262689110</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-6">
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#0052cc]">Remote</p>
                  <h3 className="mb-2 font-bold text-slate-900">WORLDWIDE</h3>
                  <p className="text-sm text-slate-600">Serving clients globally with remote delivery</p>
                </div>
                <div className="text-sm text-slate-600">
                  <p>Drop us a line at <strong>shreeshivshaktiyogpeeth@gmail.com</strong></p>
                  <p className="mt-1">Career enquiries at <strong>careers@shivshaktitech.com</strong></p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={1}>
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
                <LeadForm />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
