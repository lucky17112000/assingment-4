import { prisma } from "../../lib/prisma";

const createTutorProfile = async (payload: any, userId: string) => {
  console.log(payload);

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
const getTutorProfile = async (
  payload: {
    search?: string;
    page?: number;
    limit?: number;
    skip?: number;
  },
  page: number,
  limit: number,
  skip: number,
  sortBy: string,
  sortOrder: string,
) => {
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
    take: limit || 10,
    skip: skip || 0,
    where: {
      AND: whereClause,
    },
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      user: true,
      category: true,
    },
  });
  const count = await prisma.tutorProfile.count({
    where: {
      AND: whereClause,
    },
  });
  return {
    data: result,
    pagination: {
      total: count,
      page: page,
      limit: limit,
      totalPages: Math.ceil(count / limit),
    },
  };
};
const getTutorProfileByuserId = async (userId: string) => {
  console.log("getTutorProfileByuserId service called", userId);
};
export const tutorProfileService = {
  createTutorProfile,
  getTutorProfile,
  getTutorProfileByuserId,
};
