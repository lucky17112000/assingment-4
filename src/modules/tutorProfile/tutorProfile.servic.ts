import { prisma } from "../../lib/prisma";

const createTutorProfile = async (payload: any, userId: string) => {
  console.log(payload);
  //   const category = await prisma.category.findUnique({
  //     where: {
  //       id: payload.categoryId,
  //     },
  //   });
  const result = await prisma.tutorProfile.create({
    data: {
      ...payload,
      userId: userId,
      //   categoryId: category?.id || null,
    },
    include: {
      user: true,
      category: true,
    },
  });
  return result;
};
export const tutorProfileService = {
  createTutorProfile,
};
