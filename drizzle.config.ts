import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./cms/db/schema.ts",
  out: "./cms/drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: "./cms/data/blog.db",
  },
});
