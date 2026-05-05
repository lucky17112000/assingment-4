import { Router } from "express";
import { reviewController } from "./review.controller";
import { auth, UserRole } from "../tutorProfile/tutorProfile.route";
const router = Router();
router.post(
  "/",
  auth(UserRole.Student, UserRole.Tutor, UserRole.Admin),
  reviewController.createReview,
);
router.get("/", reviewController.showAllreviews);
router.get(
  "/tutor/reviews",
  auth(UserRole.Tutor),
  reviewController.showTutorReviews,
);
router.get("/tutor/:tutorId", reviewController.showTutorReviewsPublic);
export const reviewRoute = router;
