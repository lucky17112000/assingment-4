import { prisma } from "../../lib/prisma";

// booking korte parbe student, booking er status update korte parbe tutor, and student, , admin sob booking dekhte parbe, tutor tar booking dekhte parbe, student tar booking dekhte parbe
const createBooking = async (payload: any, studentId: string) => {
  const result = await prisma.booking.create({
    data: {
      ...payload,
      studentId: studentId,
    },
    include: {
      tutor: true,
      student: true,
    },
  });
  return result;
};
const getStudentBookings = async (studentId: string) => {
  const result = await prisma.booking.findMany({
    where: {
      studentId: studentId,
    },
    include: {
      tutor: true,
      student: true,
    },
  });
  return result;
};
const getTutorBookings = async (tutorId: string) => {
  const result = await prisma.booking.findMany({
    where: {
      tutorId: tutorId,
    },
    include: {
      tutor: true,
      student: true,
    },
  });
  return result;
};
const updateStudentBookingStatus = async (bookingId: string) => {
  const result = await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      status: "CANCELLED",
    },
  });
  return result;
};
const updateTutorBookingStatus = async (bookingId: string, status: string) => {
  const result = await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      status: "COMPLETED",
    },
  });
  return result;
};
export const bookingService = {
  createBooking,
  getStudentBookings,
  getTutorBookings,
  updateStudentBookingStatus,
  updateTutorBookingStatus,
};
