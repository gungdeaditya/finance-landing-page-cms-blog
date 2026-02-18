import { defineConfig } from "drizzle-kit";

const databaseUrl = process.env.DATABASE_URL;
const isRemote = databaseUrl && !databaseUrl.startsWith("file:");

export default defineConfig({
  schema: "./cms/db/schema.ts",
  out: "./cms/drizzle",
  ...(isRemote
    ? {
        dialect: "turso",
        dbCredentials: {
          url: databaseUrl!,
          authToken: process.env.DATABASE_AUTH_TOKEN,
        },
      }
    : {
        dialect: "sqlite",
        dbCredentials: {
          url: "./cms/data/blog.db",
        },
      }),
});
