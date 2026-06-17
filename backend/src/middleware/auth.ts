import type { Request, Response, NextFunction } from "express";
import { Role } from "@prisma/client";
import { getTokenFromRequest, verifyToken } from "../lib/auth.js";
import { prisma } from "../lib/prisma.js";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: Role;
  };
}

export async function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const token = getTokenFromRequest(req);
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, email: true, role: true, isActive: true },
  });

  if (!user || !user.isActive) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  req.user = { id: user.id, email: user.email, role: user.role };
  next();
}

export function requireRole(...roles: Role[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    next();
  };
}

export const requireAdmin = [requireAuth, requireRole(Role.ADMIN, Role.STAFF)];
export const requireClient = [requireAuth, requireRole(Role.CLIENT)];
