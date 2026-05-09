import { Router } from "express";
import { authRouter } from "./auth/router";
import { authenticateToken } from "@/middlewares/authMiddleware";
import { profileRouter } from "./profile/route";

const router = Router();

// Public Routes
router.use("/auth", authRouter);

// Apply authentication middleware to all routes below
router.use(authenticateToken);

// Protected routes
router.use("/profile", profileRouter);

export default router;
