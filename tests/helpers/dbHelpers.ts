import { db } from "@/db/connection";
import { notes } from "@/db/schema/notes";
import { users, type NewUser } from "@/db/schema/users";
import { generateToken } from "@/utils/jwt";
import { hashPassword } from "@/utils/password";

export async function createTestUser(userData: Partial<NewUser> = {}) {
  const defaultUser = {
    email: `test-user-${Date.now()}-${Math.random()}@test.com`,
    password: "testpassword1234",
    username: "testusername",
    firstName: "Test",
    lastName: "User",
    ...userData,
  };

  const hashedPassword = await hashPassword(defaultUser.password);

  const [user] = await db
    .insert(users)
    .values({
      ...defaultUser,
      password: hashedPassword,
    })
    .returning();

  const token = await generateToken({
    id: user?.id as number,
    email: user?.email as string,
    username: user?.username as string,
  });

  return {
    token,
    user,
    rawPassword: defaultUser.password,
  };
}

export async function cleanDatabase() {
  await db.delete(users);
  await db.delete(notes);
}
