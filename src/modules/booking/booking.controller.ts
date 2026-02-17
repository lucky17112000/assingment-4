import { Request, Response } from "express";
import { bookingService } from "./booking.service";
const createBooking = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user as any;
    const payload = req.body;
    const result = await bookingService.createBooking(
      payload as any,
      userId as string,
    );
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to create booking", error });
  }
};
const getStudentBookings = async (req: Request, res: Response) => {
  try {
    const { userId, role } = req.user as any;
    if (role !== "Student") {
      return res
        .status(403)
        .json({ message: "You are not authorized to view student bookings" });
    }
    const result = await bookingService.getStudentBookings(userId as string);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to get bookings", error });
  }
};
const getTutorBookings = async (req: Request, res: Response) => {
  try {
    const { userId, role } = req.user as any;
    if (role !== "Tutor") {
      return res
        .status(403)
        .json({ message: "You are not authorized to view tutor bookings" });
    }
    const result = await bookingService.getTutorBookings(userId as string);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to get bookings", error });
  }
};
const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.params;
    const { role } = req.user as any;
    if (role === "Student") {
      const result = await bookingService.updateStudentBookingStatus(
        bookingId as string,
      );
      res.status(200).json(result);
    } else if (role === "Tutor") {
      const result = await bookingService.updateTutorBookingStatus(
        bookingId as string,
        "COMPLETED",
      );
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update booking status", error });
  }
};
export const bookingController = {
  createBooking,
  getStudentBookings,
  getTutorBookings,
  updateBookingStatus,
};
