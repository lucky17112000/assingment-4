import { prisma } from "../../lib/prisma";

const createBooking = async (payload: any, userId?: string) => {
  const { sessionDate, startTime, endTime, price, status, tutorId } =
    payload || {};

  const result = await prisma.booking.create({
    data: {
      sessionDate,
      startTime,
      endTime,
      price,
      status,
      student: {
        connect: {
          id: userId as string,
        },
      },
      tutor: {
        connect: {
          id: tutorId as string,
        },
      },
    },
  });
  return result;
};
export const bookingService = {
  createBooking,
};
