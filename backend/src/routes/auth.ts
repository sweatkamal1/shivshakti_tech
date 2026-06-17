import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { setAuthCookie, clearAuthCookie, signToken } from "../lib/auth.js";
import { requireAuth, type AuthRequest } from "../middleware/auth.js";

const router = Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  company: z.string().optional(),
  phone: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

router.post("/register", async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, message: "Invalid input", errors: parsed.error.flatten() });
  }

  const { email, password, firstName, lastName, company, phone } = parsed.data;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ success: false, message: "Email already registered" });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      role: "CLIENT",
      profile: { create: { firstName, lastName, company, phone } },
    },
    include: { profile: true },
  });

  const token = signToken({ userId: user.id, email: user.email, role: user.role });
  setAuthCookie(res, token);

  return res.status(201).json({
    success: true,
    data: {
      id: user.id,
      email: user.email,
      role: user.role,
      profile: user.profile,
    },
  });
});

router.post("/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, message: "Invalid credentials" });
  }

  const { email, password } = parsed.data;
  const user = await prisma.user.findUnique({
    where: { email },
    include: { profile: true },
  });

  if (!user || !user.isActive) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  const token = signToken({ userId: user.id, email: user.email, role: user.role });
  setAuthCookie(res, token);

  return res.json({
    success: true,
    data: {
      id: user.id,
      email: user.email,
      role: user.role,
      profile: user.profile,
    },
  });
});

router.post("/logout", (_req, res) => {
  clearAuthCookie(res);
  return res.json({ success: true, message: "Logged out" });
});

router.get("/me", requireAuth, async (req: AuthRequest, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.id },
    include: { profile: true },
  });

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  return res.json({
    success: true,
    data: {
      id: user.id,
      email: user.email,
      role: user.role,
      profile: user.profile,
    },
  });
});

export default router;
