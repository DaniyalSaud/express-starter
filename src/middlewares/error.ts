import type { NextFunction, Request, Response } from "express";

export interface CustomError extends Error {
  status?: number;
  code?: string;
}

export async function errorHandler(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(err.stack);
}

export async function notFound(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) {}
