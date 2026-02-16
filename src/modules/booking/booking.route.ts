import { Router } from "express";
import { bookingController } from "./booking.controller";
import { auth, UserRole } from "../tutorProfile/tutorProfile.route";

const router = Router();

router.post("/", auth(UserRole.Student), bookingController.createBooking);
router.get("/dashboard", auth(UserRole.Student), bookingController.getBookings);

export const bookingRoute = router;
