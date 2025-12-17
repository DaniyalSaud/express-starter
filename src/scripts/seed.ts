// For seeding some data in the Database

import { db } from "@/db/connection";
import { notes } from "@/db/schema/schema";
import { users } from "@/db/schema/users";

async function seedUser() {
  const [testUser] = await db
    .insert(users)
    .values({
      username: "danial",
      email: "danial@test.com",
      password_hash: "12345678",
    })
    .returning();

  return testUser;
}

async function seedNotes(userId: number) {
  const notesData = [
    {
      title: "First Note",
      content: "This is the content of the first note.",
      user_id: userId,
    },
    {
      title: "Second Note",
      content: "This is the content of the second note.",
      user_id: userId,
    },
  ];

  await db.insert(notes).values(notesData);
}

async function seed() {
  try {
    console.log("🌱 Seeding Database...");

    // Removing all the previous data from the tables
    console.log("🧹 Cleaning up existing data...");
    await db.delete(users);
    await db.delete(notes);
    console.log("✅ Existing data cleaned.");

    // Seeding a test user
    console.log("👤 Seeding test user...");
    const user = await seedUser();

    if (!user) {
      throw new Error("Failed to create test user.");
    }

    console.log("📝 Seeding Notes...");
    await seedNotes(user.id);

    console.log("🎉 Seeding completed successfully!");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[2]}`) {
  seed()
    .then(() => {
      process.exit(1);
    })
    .catch(process.exit(0));
}
