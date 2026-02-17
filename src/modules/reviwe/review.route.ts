import { Router } from "express";
import { reviewController } from "./review.controller";
import { auth, UserRole } from "../tutorProfile/tutorProfile.route";
const router = Router();
router.post("/", auth(UserRole.Student), reviewController.createReview);
export const reviewRoute = router;
