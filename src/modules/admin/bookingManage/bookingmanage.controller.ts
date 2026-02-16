import { bookingManageService } from "./bookingManageService";
import { Request, Response } from "express";

const getAllBookings = async (req: Request, res: Response) => {
  try {
    const result = await bookingManageService.getAllBookings();
    return res.status(200).json({
      success: true,
      message: "All bookings fetched successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const bookingManageController = {
  getAllBookings,
};
