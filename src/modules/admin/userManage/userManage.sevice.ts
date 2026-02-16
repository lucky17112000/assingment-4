import { prisma } from "../../../lib/prisma";

const showAllUsers = async () => {
  const result = await prisma.user.findMany({
    include: {
      tutorProfile: true,
      // bookingAsStudent:true,
      // bookingAsTutor: true,
    },
  });
  return result;
};
const deleteUser = async (userId: string) => {
  const result = await prisma.user.delete({
    where: {
      id: userId,
    },
  });
  return result;
};

export const userManageService = {
  showAllUsers,
  deleteUser,
};
