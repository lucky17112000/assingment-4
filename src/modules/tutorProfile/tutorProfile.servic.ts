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
const getTutorProfile = async (payload: { search?: string }) => {
  const whereClause: any = [];
  if (payload.search) {
    whereClause.push({
      OR: [
        {
          name: {
            contains: payload.search as string,
            mode: "insensitive",
          },
        },
        {
          bio: {
            contains: payload.search as string,
            mode: "insensitive",
          },
        },
        {
          experience: {
            contains: payload.search as string,
            mode: "insensitive",
          },
        },
        {
          category: {
            name: {
              contains: payload.search as string,
              mode: "insensitive",
            },
          },
        },
        {
          category: {
            description: {
              contains: payload.search as string,
              mode: "insensitive",
            },
          },
        },
      ],
    });
  }
  const result = await prisma.tutorProfile.findMany({
    where: {
      AND: whereClause,
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
  getTutorProfile,
};
