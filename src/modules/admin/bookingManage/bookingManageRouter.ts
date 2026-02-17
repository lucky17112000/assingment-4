import { Router } from "express";
import { bookingManageController } from "./bookingmanage.controller";
import { auth, UserRole } from "../../tutorProfile/tutorProfile.route";
const router = Router();
router.get("/", bookingManageController.getAllBookings);
router.delete(
  "/cancelled",
  auth(UserRole.Admin),
  bookingManageController.removeCancelledBookings,
);
export const bookingManageRouter = router;
