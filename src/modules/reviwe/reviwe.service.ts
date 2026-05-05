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

const showAllreviews = async () => {
  const result = await prisma.review.findMany({
    include: {
      tutor: true,
      student: true,
    },
  });
  return result;
};

// Allow lookup by TutorProfile id or tutor userId
const showTutorReviews = async (tutorId: string) => {
  const result = await prisma.review.findMany({
    where: {
      OR: [{ tutorId }, { tutor: { userId: tutorId } }],
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
  showAllreviews,
  showTutorReviews,
};
