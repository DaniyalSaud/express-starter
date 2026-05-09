import { db } from "@/db/connection";
import { profiles, type NewProfile } from "@/db/schema/profiles";
import type { AuthRequest } from "@/middlewares/authMiddleware";
import { eq } from "drizzle-orm";
import type { Response } from "express";

export async function getProfile(req: AuthRequest, res: Response) {
  try {
    const id = req.params.slug as unknown as number;

    // Find the user by id and return the profile data
    const profile = await db.select().from(profiles).where(eq(profiles.id, id));
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateProfile(req: AuthRequest, res: Response) {}

export async function deleteProfile(req: AuthRequest, res: Response) {}

export async function createProfile(
  req: AuthRequest<any, NewProfile, any>,
  res: Response,
) {
  try {
    const { name, description } = req.body;
    const image = req.file;

    const imageUrl = "afd";
    // Save the image, create the profile in the database, and return the created profile
    const dbResponse = await db
      .insert(profiles)
      .values({
        name,
        description,
        imageUrl,
      })
      .returning();

    res.status(201).json(dbResponse);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}
