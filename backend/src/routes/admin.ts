import { Router } from "express";
import { z } from "zod";
import { LeadStatus } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import { requireAuth, requireRole, type AuthRequest } from "../middleware/auth.js";
import { asStringArray } from "../lib/json.js";

const router = Router();

router.use(requireAuth);
router.use(requireRole("ADMIN", "STAFF"));

router.get("/stats", async (_req, res) => {
  const [leads, contacts, users, projects, tickets, pendingTestimonials, applications] = await Promise.all([
    prisma.lead.count(),
    prisma.contactRequest.count({ where: { isRead: false } }),
    prisma.user.count(),
    prisma.project.count(),
    prisma.supportTicket.count({ where: { status: "OPEN" } }),
    prisma.testimonial.count({ where: { status: "PENDING" } }),
    prisma.jobApplication.count({ where: { status: "NEW" } }),
  ]);

  const recentLeads = await prisma.lead.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  return res.json({
    success: true,
    data: { leads, contacts, users, projects, openTickets: tickets, pendingTestimonials, newApplications: applications, recentLeads },
  });
});

router.get("/leads", async (req, res) => {
  const status = req.query.status as LeadStatus | undefined;
  const leads = await prisma.lead.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: "desc" },
  });
  return res.json({ success: true, data: leads });
});

router.patch("/leads/:id", async (req, res) => {
  const schema = z.object({ status: z.nativeEnum(LeadStatus) });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, message: "Invalid status" });
  }

  const lead = await prisma.lead.update({
    where: { id: req.params.id },
    data: { status: parsed.data.status },
  });
  return res.json({ success: true, data: lead });
});

router.get("/contacts", async (_req, res) => {
  const contacts = await prisma.contactRequest.findMany({ orderBy: { createdAt: "desc" } });
  return res.json({ success: true, data: contacts });
});

router.get("/users", async (_req, res) => {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      profile: true,
    },
  });
  return res.json({ success: true, data: users });
});

router.get("/projects", async (_req, res) => {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      client: { include: { profile: true } },
      milestones: true,
    },
  });
  return res.json({ success: true, data: projects });
});

router.get("/tickets", async (_req, res) => {
  const tickets = await prisma.supportTicket.findMany({
    orderBy: { createdAt: "desc" },
    include: { client: { include: { profile: true } } },
  });
  return res.json({ success: true, data: tickets });
});

router.get("/services", async (_req, res) => {
  const services = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });
  return res.json({
    success: true,
    data: services.map((s) => ({
      ...s,
      features: asStringArray(s.features),
      technologies: asStringArray(s.technologies),
    })),
  });
});

router.get("/blog", async (_req, res) => {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });
  return res.json({
    success: true,
    data: posts.map((p) => ({ ...p, tags: asStringArray(p.tags) })),
  });
});

router.get("/careers", async (_req, res) => {
  const careers = await prisma.career.findMany({ orderBy: { createdAt: "desc" } });
  return res.json({
    success: true,
    data: careers.map((c) => ({
      ...c,
      requirements: asStringArray(c.requirements),
      responsibilities: asStringArray(c.responsibilities),
    })),
  });
});

router.get("/testimonials", async (_req, res) => {
  const items = await prisma.testimonial.findMany({ orderBy: { sortOrder: "asc" } });
  return res.json({ success: true, data: items });
});

router.get("/faqs", async (_req, res) => {
  const items = await prisma.fAQ.findMany({ orderBy: { sortOrder: "asc" } });
  return res.json({ success: true, data: items });
});

const homepageStatsSchema = z.object({
  projects: z.number().int().min(0),
  globalClients: z.number().int().min(0),
  cloudExperts: z.number().int().min(0),
});

router.get("/homepage-stats", async (_req, res) => {
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

  return res.json({
    success: true,
    data: {
      projects: Number(projectsSetting?.value ?? projectsCount),
      globalClients: Number(clientsSetting?.value ?? globalClientsCount),
      cloudExperts: Number(expertsSetting?.value ?? cloudExpertsCount),
    },
  });
});

router.patch("/homepage-stats", async (req, res) => {
  const parsed = homepageStatsSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, message: "Invalid input", errors: parsed.error.flatten() });
  }

  const { projects, globalClients, cloudExperts } = parsed.data;

  await prisma.$transaction([
    prisma.websiteSetting.upsert({
      where: { key: "homepage.projects" },
      create: { key: "homepage.projects", value: String(projects), group: "homepage" },
      update: { value: String(projects), group: "homepage" },
    }),
    prisma.websiteSetting.upsert({
      where: { key: "homepage.globalClients" },
      create: { key: "homepage.globalClients", value: String(globalClients), group: "homepage" },
      update: { value: String(globalClients), group: "homepage" },
    }),
    prisma.websiteSetting.upsert({
      where: { key: "homepage.cloudExperts" },
      create: { key: "homepage.cloudExperts", value: String(cloudExperts), group: "homepage" },
      update: { value: String(cloudExperts), group: "homepage" },
    }),
  ]);

  return res.json({ success: true, message: "Homepage stats updated" });
});

export default router;
