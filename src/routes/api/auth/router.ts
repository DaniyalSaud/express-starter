import { login, register } from "@/controllers/authController";
import { userInsertSchema } from "@/db/schema/users";
import { validateBody } from "@/middlewares/validationMiddleware";
import { loginSchema } from "@/schema/authSchema";
import { Router } from "express";

const router = Router();

router.post("/register", validateBody(userInsertSchema), register);
router.post("/login", validateBody(loginSchema), login);
export { router as authRouter };
