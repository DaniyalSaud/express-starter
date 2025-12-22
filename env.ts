import "dotenv/config";
import { z } from "zod";

process.env.APP_STAGE = process.env.APP_STAGE || "dev";

const isProduction = process.env.APP_STAGE === "production";
const isDevelopment = process.env.APP_STAGE === "dev";
const isTesting = process.env.APP_STAGE === "test";

if (isTesting) {
  // Set your test database string here
  process.env.DATABASE_URL =
    "postgresql://neondb_owner:npg_fseIkb38DzyC@ep-holy-sun-agg8avms.c-2.eu-central-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require";
}

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  APP_STAGE: z.enum(["dev", "production", "test"]).default("dev"),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().startsWith("libsql://"), // Example for Turso
  DB_TOKEN: z.string().optional(),
  JWT_SECRET: z
    .string()
    .min(32, "JWT_SECRET must be at least 32 characters long"),
  JWT_EXPIRES_IN: z.string().default("7d"),
  BCRYPT_ROUNDS: z.coerce.number().min(10).max(20).default(12),
});

export type Env = z.infer<typeof envSchema>;

let env: Env;

try {
  env = envSchema.parse(process.env);
} catch (err) {
  if (err instanceof z.ZodError) {
    console.error("❌ Invalid environment variables");
    console.error(JSON.stringify(z.treeifyError(err), null, 2));

    err.issues.forEach((issue) => {
      const path = issue.path.join(".");
      console.error(` - ${path}: ${issue.message}`);
    });

    process.exit(1);
  }

  throw err;
}

export const isProd = () => env.APP_STAGE === "production";
export const isDev = () => env.APP_STAGE === "dev";
export const isTest = () => env.APP_STAGE === "test";

export { env };
export default env;
