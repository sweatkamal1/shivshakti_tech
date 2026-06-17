import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAuth, type AuthRequest } from "../middleware/auth.js";

const router = Router();

router.use(requireAuth);

router.get("/", async (req: AuthRequest, res) => {
  const projects = await prisma.project.findMany({
    where: { clientId: req.user!.id },
    orderBy: { createdAt: "desc" },
    include: {
      milestones: { orderBy: { sortOrder: "asc" } },
      _count: { select: { files: true, comments: true } },
    },
  });
  return res.json({ success: true, data: projects });
});

router.get("/:id", async (req: AuthRequest, res) => {
  const id = String(req.params.id);
  const project = await prisma.project.findFirst({
    where: { id, clientId: req.user!.id },
    include: {
      milestones: { orderBy: { sortOrder: "asc" } },
      files: { orderBy: { createdAt: "desc" } },
      comments: {
        orderBy: { createdAt: "desc" },
        include: { author: { include: { profile: true } } },
      },
    },
  });

  if (!project) {
    return res.status(404).json({ success: false, message: "Project not found" });
  }

  return res.json({ success: true, data: project });
});

export default router;
