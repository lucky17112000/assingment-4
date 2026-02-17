import e from "express";
import { prisma } from "../../../lib/prisma";
import { BookingStatus } from "../../../generated/prisma/enums";

const getAllBookings = async () => {
  const result = await prisma.booking.findMany({
    include: {
      student: true,
      tutor: true,
    },
  });
  return result;
};
// remoove all cancelled booking from database
const removeCancelledBookings = async () => {
  const result = await prisma.booking.deleteMany({
    where: {
      status: BookingStatus.CANCELLED,
    },
  });
  return result;
};
export const bookingManageService = {
  getAllBookings,
  removeCancelledBookings,
};
