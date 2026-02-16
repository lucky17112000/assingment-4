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

const getBookings = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user || {};
    // if (!userId) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Unauthorized",
    //   });
    // }
    const result = await bookingService.getBookings(userId as string);
    return res.status(200).json({
      success: true,
      message: "Bookings fetched successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const bookingController = {
  createBooking,
  getBookings,
};
