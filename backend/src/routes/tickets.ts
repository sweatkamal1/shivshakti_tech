import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAuth, type AuthRequest } from "../middleware/auth.js";

const router = Router();

router.use(requireAuth);

const ticketSchema = z.object({
  subject: z.string().min(3),
  description: z.string().min(10),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
});

router.get("/", async (req: AuthRequest, res) => {
  const tickets = await prisma.supportTicket.findMany({
    where: { clientId: req.user!.id },
    orderBy: { createdAt: "desc" },
    include: { messages: { take: 1, orderBy: { createdAt: "desc" } } },
  });
  return res.json({ success: true, data: tickets });
});

router.post("/", async (req: AuthRequest, res) => {
  const parsed = ticketSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, message: "Invalid input" });
  }

  const ticket = await prisma.supportTicket.create({
    data: {
      clientId: req.user!.id,
      subject: parsed.data.subject,
      description: parsed.data.description,
      priority: parsed.data.priority ?? "MEDIUM",
      messages: {
        create: {
          authorId: req.user!.id,
          content: parsed.data.description,
          isStaff: false,
        },
      },
    },
    include: { messages: true },
  });

  return res.status(201).json({ success: true, data: ticket });
});

export default router;
