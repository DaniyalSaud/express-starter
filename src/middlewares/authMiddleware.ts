import { verifyToken, type JwtPayload } from "@/utils/jwt";
import type { NextFunction, Request, Response } from "express";

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export async function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        error: "Bad Request",
      });
    }

    const payload = await verifyToken(token);

    req.user = payload;

    next();
  } catch (err) {
    return res.status(403).json({
      error: "Forbidden Request",
    });
  }
}
