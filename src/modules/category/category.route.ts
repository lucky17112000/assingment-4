import { Router } from "express";
import { categoryController } from "./category.controller";
import { auth, UserRole } from "../tutorProfile/tutorProfile.route";

const router = Router();
router.post("/", auth(UserRole.Tutor), categoryController.createCategory);
router.get("/", categoryController.getCategories);
export const categoryRoute = router;
