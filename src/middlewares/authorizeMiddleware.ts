import type { NextFunction, Response } from "express";
import type { AuthRequest } from "./authMiddleware";

export async function authorize(roles: string[] = []) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (roles.includes(req.user?.role || "anon")) {
        return next();
      }

      throw new Error(`${roles} Unauthorized`);
    } catch (err) {
      res.status(401).json({ error: (err as Error).message });
    }
  };
}
