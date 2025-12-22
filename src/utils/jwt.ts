import { jwtVerify, SignJWT, type JWTPayload } from "jose";
import env from "~/env";
import { createSecretKey } from "crypto";

export interface JwtPayload extends JWTPayload {
  id: number;
  username: string;
  email: string;
}

export function generateToken(payload: JwtPayload) {
  const secret = env.JWT_SECRET;

  const secretKey = createSecretKey(secret, "utf-8");

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(env.JWT_EXPIRES_IN || "7d")
    .sign(secretKey);
}

export async function verifyToken(token: string) {
  const secretKey = createSecretKey(env.JWT_SECRET, "utf-8");
  const { payload } = await jwtVerify(token, secretKey);

  return payload as JwtPayload;
}
