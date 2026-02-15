import { bookingService } from "./booking.service";
import { Request, Response } from "express";

const createBooking = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const user = req.user;
    const result = await bookingService.createBooking(payload, user?.userId);
    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const bookingController = {
  createBooking,
};
