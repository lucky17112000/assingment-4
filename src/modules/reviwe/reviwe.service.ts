import { prisma } from "../../lib/prisma";

const createReview = async (payload: any, userId: string) => {
  const result = await prisma.review.create({
    data: {
      ...payload,
      studentId: userId,
    },
    include: {
      tutor: true,
      student: true,
    },
  });
  return result;
};

export const reviewService = {
  createReview,
};
