import { Router } from "express";
import { z } from "zod";
import { TestimonialStatus } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import { slugify } from "../lib/slug.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);
router.use(requireRole("ADMIN", "STAFF"));

const testimonialSchema = z.object({
  clientName: z.string().min(2),
  company: z.string().optional(),
  role: z.string().optional(),
  content: z.string().min(10),
  rating: z.number().int().min(1).max(5).optional(),
});

// --- Testimonials ---
router.post("/testimonials", async (req, res) => {
  const parsed = testimonialSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, message: "Invalid input", errors: parsed.error.flatten() });
  }

  const testimonial = await prisma.testimonial.create({
    data: {
      clientName: parsed.data.clientName,
      company: parsed.data.company,
      role: parsed.data.role,
      content: parsed.data.content,
      rating: parsed.data.rating ?? 5,
      status: "APPROVED",
      isPublished: true,
    },
  });
  return res.status(201).json({ success: true, data: testimonial, message: "Testimonial published!" });
});

router.patch("/testimonials/:id", async (req, res) => {
  const schema = z.object({ status: z.nativeEnum(TestimonialStatus) });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, message: "Invalid status" });
  }

  const testimonial = await prisma.testimonial.update({
    where: { id: String(req.params.id) },
    data: {
      status: parsed.data.status,
      isPublished: parsed.data.status === "APPROVED",
    },
  });
  return res.json({ success: true, data: testimonial });
});

router.delete("/testimonials/:id", async (req, res) => {
  await prisma.testimonial.delete({ where: { id: String(req.params.id) } });
  return res.json({ success: true, message: "Deleted" });
});

// --- Contacts ---
router.patch("/contacts/:id", async (req, res) => {
  const contact = await prisma.contactRequest.update({
    where: { id: String(req.params.id) },
    data: { isRead: true },
  });
  return res.json({ success: true, data: contact });
});

// --- Blog CRUD ---
const blogSchema = z.object({
  title: z.string().min(2),
  slug: z.string().optional(),
  excerpt: z.string().min(5),
  content: z.string().min(10),
  coverImage: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isPublished: z.boolean().optional(),
});

router.post("/blog", async (req, res) => {
  const parsed = blogSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, message: "Invalid input", errors: parsed.error.flatten() });
  }
  const slug = parsed.data.slug || slugify(parsed.data.title);
  const post = await prisma.blogPost.create({
    data: {
      title: parsed.data.title,
      slug,
      excerpt: parsed.data.excerpt,
      content: parsed.data.content,
      coverImage: parsed.data.coverImage || null,
      tags: parsed.data.tags ?? [],
      isPublished: true,
      publishedAt: new Date(),
    },
  });
  return res.status(201).json({ success: true, data: post, message: "Blog post published!" });
});

router.patch("/blog/:id", async (req, res) => {
  const parsed = blogSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, message: "Invalid input", errors: parsed.error.flatten() });
  }
  const data: Record<string, unknown> = { ...parsed.data };
  if (parsed.data.tags) data.tags = parsed.data.tags;
  if (parsed.data.isPublished === true) {
    data.publishedAt = new Date();
    data.isPublished = true;
  }

  const post = await prisma.blogPost.update({
    where: { id: String(req.params.id) },
    data,
  });
  return res.json({ success: true, data: post });
});

router.delete("/blog/:id", async (req, res) => {
  await prisma.blogPost.delete({ where: { id: String(req.params.id) } });
  return res.json({ success: true, message: "Deleted" });
});

// --- Careers CRUD ---
const careerSchema = z.object({
  title: z.string().min(2),
  slug: z.string().optional(),
  department: z.string().min(1),
  location: z.string().min(1),
  employmentType: z.string().optional(),
  experience: z.string().optional(),
  salary: z.string().optional(),
  description: z.string().min(10),
  requirements: z.array(z.string()).optional(),
  responsibilities: z.array(z.string()).optional(),
  isPublished: z.boolean().optional(),
});

router.post("/careers", async (req, res) => {
  const parsed = careerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, message: "Invalid input", errors: parsed.error.flatten() });
  }
  const slug = parsed.data.slug || slugify(parsed.data.title);
  const career = await prisma.career.create({
    data: {
      title: parsed.data.title,
      slug,
      department: parsed.data.department,
      location: parsed.data.location,
      employmentType: parsed.data.employmentType ?? "Full-time",
      experience: parsed.data.experience,
      salary: parsed.data.salary,
      description: parsed.data.description,
      requirements: parsed.data.requirements ?? [],
      responsibilities: parsed.data.responsibilities ?? [],
      isPublished: true,
    },
  });
  return res.status(201).json({ success: true, data: career, message: "Job posted successfully!" });
});

router.patch("/careers/:id", async (req, res) => {
  const parsed = careerSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, message: "Invalid input" });
  }
  const career = await prisma.career.update({
    where: { id: String(req.params.id) },
    data: parsed.data,
  });
  return res.json({ success: true, data: career });
});

router.delete("/careers/:id", async (req, res) => {
  await prisma.career.delete({ where: { id: String(req.params.id) } });
  return res.json({ success: true, message: "Deleted" });
});

// --- Job applications ---
router.get("/applications", async (_req, res) => {
  const apps = await prisma.jobApplication.findMany({
    orderBy: { createdAt: "desc" },
    include: { career: { select: { title: true, slug: true } } },
  });
  return res.json({ success: true, data: apps });
});

router.patch("/applications/:id", async (req, res) => {
  const schema = z.object({
    status: z.enum(["NEW", "REVIEWING", "SHORTLISTED", "INTERVIEW", "REJECTED", "HIRED"]),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, message: "Invalid status" });
  }
  const app = await prisma.jobApplication.update({
    where: { id: String(req.params.id) },
    data: { status: parsed.data.status },
  });
  return res.json({ success: true, data: app });
});

export default router;
