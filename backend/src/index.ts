import app from "./app.js";

const PORT = Number(process.env.PORT) || 5000;

if (process.env.NODE_ENV === "production") {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret === "change-me-in-production" || secret === "dev-secret") {
    console.error("FATAL: Set a strong JWT_SECRET in production.");
    process.exit(1);
  }
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
