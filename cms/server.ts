import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import postRoutes from "./routes/postRoutes";
import authRoutes from "./routes/authRoutes";
import { requireAuth } from "./middleware/authMiddleware";
import { runAuthMigrations } from "./db/authMigration";

const app = express();
const PORT = 3001;

// Ensure data directory exists
const dataDir = path.join(process.cwd(), "cms", "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Run auth migrations on startup
runAuthMigrations();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));

// Auth routes (public — no middleware)
app.use("/api/auth", authRoutes);

// Post routes — GET is public (blog/homepage), mutations require auth
app.use("/api/posts", (req, res, next) => {
  if (req.method === "GET") {
    return next(); // Allow public reads
  }
  requireAuth(req, res, next); // Protect writes
}, postRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 CMS API server running at http://localhost:${PORT}`);
  console.log(`   Endpoints:`);
  console.log(`   POST   /api/auth/login`);
  console.log(`   POST   /api/auth/logout`);
  console.log(`   GET    /api/auth/session`);
  console.log(`   GET    /api/posts          (public)`);
  console.log(`   GET    /api/posts/:slug     (public)`);
  console.log(`   POST   /api/posts          (auth required)`);
  console.log(`   PUT    /api/posts/:id       (auth required)`);
  console.log(`   DELETE /api/posts/:id       (auth required)`);
});
