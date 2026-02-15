import { Router } from "express";
import { bookingController } from "./booking.controller";
import { auth, UserRole } from "../tutorProfile/tutorProfile.route";

const router = Router();

router.post("/", auth(UserRole.Student), bookingController.createBooking);

export const bookingRoute = router;
