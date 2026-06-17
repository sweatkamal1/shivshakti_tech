import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import publicRoutes from "./routes/public.js";
import leadRoutes from "./routes/leads.js";
import contactRoutes from "./routes/contact.js";
import ticketRoutes from "./routes/tickets.js";
import projectRoutes from "./routes/projects.js";
import adminRoutes from "./routes/admin.js";
import adminContentRoutes from "./routes/admin-content.js";
import testimonialRoutes from "./routes/testimonials.js";
import { notFound, errorHandler } from "./middleware/error.js";

dotenv.config();

const app = express();
const clientOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: clientOrigins.length === 1 ? clientOrigins[0] : clientOrigins,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (_req, res) => {
  res.json({ success: true, message: "ShivShakti API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api", publicRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin", adminContentRoutes);
app.use("/api/testimonials", testimonialRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
