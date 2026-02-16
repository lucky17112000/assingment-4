import { Router } from "express";
import { bookingManageController } from "./bookingmanage.controller";
const router = Router();
router.get("/", bookingManageController.getAllBookings);
export const bookingManageRouter = router;
