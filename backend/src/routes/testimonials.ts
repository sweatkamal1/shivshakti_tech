import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAuth, requireRole, type AuthRequest } from "../middleware/auth.js";

const router = Router();

const submitSchema = z.object({
  content: z.string().min(20, "Review must be at least 20 characters"),
  rating: z.number().int().min(1).max(5).optional(),
  company: z.string().optional(),
  role: z.string().optional(),
});

router.post("/", requireAuth, requireRole("CLIENT"), async (req: AuthRequest, res) => {
  const parsed = submitSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, message: "Invalid input", errors: parsed.error.flatten() });
  }

  const user = await prisma.user.findUnique({
    where: { id: req.user!.id },
    include: { profile: true },
  });
  if (!user?.profile) {
    return res.status(400).json({ success: false, message: "Complete your profile first" });
  }

  const testimonial = await prisma.testimonial.create({
    data: {
      userId: user.id,
      clientName: `${user.profile.firstName} ${user.profile.lastName}`,
      company: parsed.data.company ?? user.profile.company,
      role: parsed.data.role ?? user.profile.jobTitle,
      content: parsed.data.content,
      rating: parsed.data.rating ?? 5,
      status: "PENDING",
      isPublished: false,
    },
  });

  return res.status(201).json({
    success: true,
    data: testimonial,
    message: "Thank you! Your review is pending admin approval.",
  });
});

router.get("/mine", requireAuth, requireRole("CLIENT"), async (req: AuthRequest, res) => {
  const items = await prisma.testimonial.findMany({
    where: { userId: req.user!.id },
    orderBy: { createdAt: "desc" },
  });
  return res.json({ success: true, data: items });
});

export default router;
