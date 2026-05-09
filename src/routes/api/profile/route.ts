import {
  createProfile,
  deleteProfile,
  getProfile,
  updateProfile,
} from "@/controllers/profileController";
import { profileInsertSchema } from "@/db/schema/profiles";
import { validateBody } from "@/middlewares/validationMiddleware";
import { Router } from "express";

const router = Router();

router.post("/", validateBody(profileInsertSchema), createProfile);
router.get("/:slug", getProfile);
router.patch("/:slug", updateProfile);
router.delete("/:slug", deleteProfile);

export { router as profileRouter };
export default router;
