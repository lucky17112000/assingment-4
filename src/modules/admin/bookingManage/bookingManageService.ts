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
//upde booking status
// const updateBookingStatus = async (
//   bookingId: string,
//   status: BookingStatus,
// ) => {
//   const result = await prisma.booking.update({
//     where: {
//       id: bookingId,
//     },
//     data: {
//       status: status,
//     },
//   });
//   return result;
// };
export const bookingManageService = {
  getAllBookings,
  // updateBookingStatus,
};
