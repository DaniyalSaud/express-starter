import { defineConfig } from "drizzle-kit";
import env from "~/env";

export default defineConfig({
  schema: "./src/db/schema",
  out: "./drizzle",
  dialect: "turso",
  dbCredentials: {
    url: env.DATABASE_URL,
    authToken: env.DB_TOKEN,
  },
});
