import { Router } from "express";

import { auth, UserRole } from "../tutorProfile/tutorProfile.route";
import { bookingController } from "./booking.controller";

const router = Router();

router.post("/", auth(UserRole.Student), bookingController.createBooking);
// router.get("/dashboard", auth(UserRole.Student), bookingController.getBookings);
router.get(
  "/student",
  auth(UserRole.Student),
  bookingController.getStudentBookings,
);
router.get("/tutor", auth(UserRole.Tutor), bookingController.getTutorBookings);
router.put(
  "/:bookingId/status",
  auth(UserRole.Student, UserRole.Tutor),
  bookingController.updateBookingStatus,
);

// export const bookingRoute = router;
export const bookingRoute = router;
