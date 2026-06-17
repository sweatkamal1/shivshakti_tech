import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { asStringArray } from "../lib/json.js";

const router = Router();

const applySchema = z.object({
  careerId: z.string(),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  coverLetter: z.string().optional(),
  resumeUrl: z.string().optional(),
});

router.post("/careers/apply", async (req, res) => {
  const parsed = applySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, message: "Invalid input", errors: parsed.error.flatten() });
  }

  const career = await prisma.career.findUnique({ where: { id: parsed.data.careerId } });
  if (!career || !career.isPublished) {
    return res.status(404).json({ success: false, message: "Job not found" });
  }

  const application = await prisma.jobApplication.create({ data: parsed.data });
  return res.status(201).json({ success: true, data: application, message: "Application submitted!" });
});

router.get("/services", async (_req, res) => {
  const services = await prisma.service.findMany({
    where: { isPublished: true },
    orderBy: { sortOrder: "asc" },
  });
  return res.json({
    success: true,
    data: services.map((s) => ({
      ...s,
      features: asStringArray(s.features),
      technologies: asStringArray(s.technologies),
    })),
  });
});

router.get("/services/:slug", async (req, res) => {
  const service = await prisma.service.findUnique({ where: { slug: req.params.slug } });
  if (!service || !service.isPublished) {
    return res.status(404).json({ success: false, message: "Service not found" });
  }
  return res.json({
    success: true,
    data: {
      ...service,
      features: asStringArray(service.features),
      technologies: asStringArray(service.technologies),
    },
  });
});

router.get("/blog", async (_req, res) => {
  const posts = await prisma.blogPost.findMany({
    where: { isPublished: true },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    include: { category: true },
  });
  return res.json({
    success: true,
    data: posts.map((p) => ({ ...p, tags: asStringArray(p.tags) })),
  });
});

router.get("/blog/:slug", async (req, res) => {
  const post = await prisma.blogPost.findUnique({
    where: { slug: req.params.slug },
    include: { category: true },
  });
  if (!post || !post.isPublished) {
    return res.status(404).json({ success: false, message: "Post not found" });
  }
  await prisma.blogPost.update({
    where: { id: post.id },
    data: { viewCount: { increment: 1 } },
  });
  return res.json({
    success: true,
    data: { ...post, tags: asStringArray(post.tags) },
  });
});

router.get("/careers", async (_req, res) => {
  const careers = await prisma.career.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
  });
  return res.json({
    success: true,
    data: careers.map((c) => ({
      ...c,
      requirements: asStringArray(c.requirements),
      responsibilities: asStringArray(c.responsibilities),
    })),
  });
});

router.get("/careers/:slug", async (req, res) => {
  const career = await prisma.career.findUnique({ where: { slug: String(req.params.slug) } });
  if (!career || !career.isPublished) {
    return res.status(404).json({ success: false, message: "Job not found" });
  }
  return res.json({
    success: true,
    data: {
      ...career,
      requirements: asStringArray(career.requirements),
      responsibilities: asStringArray(career.responsibilities),
    },
  });
});

router.get("/testimonials", async (_req, res) => {
  const items = await prisma.testimonial.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
  });
  return res.json({ success: true, data: items });
});

router.get("/faqs", async (_req, res) => {
  const items = await prisma.fAQ.findMany({
    where: { isPublished: true },
    orderBy: { sortOrder: "asc" },
  });
  return res.json({ success: true, data: items });
});

router.get("/stats", async (_req, res) => {
  const [projectsSetting, clientsSetting, expertsSetting] = await Promise.all([
    prisma.websiteSetting.findUnique({ where: { key: "homepage.projects" } }),
    prisma.websiteSetting.findUnique({ where: { key: "homepage.globalClients" } }),
    prisma.websiteSetting.findUnique({ where: { key: "homepage.cloudExperts" } }),
  ]);

  const [projectsCount, globalClientsCount, cloudExpertsCount] = await Promise.all([
    prisma.project.count(),
    prisma.user.count({
      where: {
        role: "CLIENT",
        projects: { some: {} },
      },
    }),
    prisma.user.count({
      where: {
        role: { in: ["ADMIN", "STAFF"] },
        isActive: true,
      },
    }),
  ]);

  const projects = Number(projectsSetting?.value ?? projectsCount);
  const globalClients = Number(clientsSetting?.value ?? globalClientsCount);
  const cloudExperts = Number(expertsSetting?.value ?? cloudExpertsCount);

  return res.json({
    success: true,
    data: [
      { value: projects, label: "Projects" },
      { value: globalClients, label: "Global Clients" },
      { value: cloudExperts, label: "Cloud Experts" },
    ],
  });
});

export default router;
