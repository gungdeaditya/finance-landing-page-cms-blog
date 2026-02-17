import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import postRoutes from "./routes/postRoutes";

const app = express();
const PORT = 3001;

// Ensure data directory exists
const dataDir = path.join(process.cwd(), "cms", "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Routes
app.use("/api/posts", postRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 CMS API server running at http://localhost:${PORT}`);
  console.log(`   Endpoints:`);
  console.log(`   GET    /api/posts`);
  console.log(`   GET    /api/posts/:slug`);
  console.log(`   POST   /api/posts`);
  console.log(`   PUT    /api/posts/:id`);
  console.log(`   DELETE /api/posts/:id`);
});
