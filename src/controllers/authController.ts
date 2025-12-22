import { db } from "@/db/connection";
import { users, type NewUser } from "@/db/schema/users";
import { generateToken } from "@/utils/jwt";
import { comparePasswords, hashPassword } from "@/utils/password";
import { eq } from "drizzle-orm";
import type { Request, Response } from "express";

export async function register(req: Request<any, any, NewUser>, res: Response) {
  try {
    const { email, username, password, firstName, lastName } = req.body;

    const hashedPassword = await hashPassword(password);

    const [user] = await db
      .insert(users)
      .values({
        username,
        email,
        password: hashedPassword,
        firstName,
        lastName,
      })
      .returning({
        id: users.id,
        email: users.email,
        username: users.username,
        firstName: users.firstName,
        lastName: users.lastName,
        createdAt: users.createdAt,
      });

    const token = await generateToken({
      id: user?.id as number,
      username: user?.username as string,
      email: user?.email as string,
    });

    return res.status(201).json({
      message: "User created",
      user: user,
      token: token,
    });
  } catch (error) {
    console.error("Registration Error:", error);

    res.status(500).json({
      error: "Failed to create new user",
      message: (error as Error).message,
    });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const [user] = await db.select().from(users).where(eq(email, users.email));

    if (!user) {
      return res.status(401).json({
        error: "Invalid Credentials",
      });
    }

    const isValidatedPassword = await comparePasswords(password, user.password);

    if (!isValidatedPassword) {
      return res.status(401).json({
        error: "Invalid Credentials",
      });
    }

    const token = await generateToken({
      id: user.id,
      email: user.email,
      username: user.username,
    });

    return res.status(201).json({
      message: "Login Success",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      token,
    });
  } catch (err) {
    console.error("Login Error: ", err);
    return res.status(500).json({
      error: "Failed to log in",
      details: (err as Error).message,
    });
  }
}
