import { verifyToken, type JwtPayload } from "@/utils/jwt";
import type { NextFunction, Request, RequestHandler, Response } from "express";

export interface AuthRequest<
  P = Record<string, never>,
  B = unknown,
  Q = Record<string, unknown>,
> extends Request<P, any, B, Q> {
  user?: JwtPayload;
}

export const authenticateToken: RequestHandler = async (
  req,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authReq = req as AuthRequest;
    const authHeader = authReq.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({
        error: "Bad Request",
      });
      return;
    }

    const payload = await verifyToken(token);
    authReq.user = payload;

    next();
  } catch {
    res.status(403).json({
      error: "Invalid or expired token",
    });
  }
};
