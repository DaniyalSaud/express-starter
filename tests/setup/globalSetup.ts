import { execSync } from "child_process";
import { users } from "../../src/db/schema/users.js";
import { db } from "../../src/db/connection.js";

export default async function setup() {
  console.log("🗄️  Setting up test database...");

  try {
    // Drop all tables if they exist to ensure clean state
    await db.delete(users);

    // Use drizzle-kit CLI to push schema to database
    console.log("🚀 Pushing schema using drizzle-kit...");
    execSync(`npx drizzle-kit push --url="${process.env.DATABASE_URL}" --schema="./src/db/schema.ts" --dialect="sqlite"`, { stdio: "inherit" });

    console.log("✅ Test database setup complete");
  } catch (error) {
    console.error("❌ Failed to setup test database:", error);
    throw error;
  }

  return async () => {
    console.log("🧹 Tearing down test database...");

    try {
      // Final cleanup - drop all test data
      await db.delete(users);

      console.log("✅ Test database teardown complete");
      process.exit(0);
    } catch (error) {
      console.error("❌ Failed to teardown test database:", error);
    }
  };
}
