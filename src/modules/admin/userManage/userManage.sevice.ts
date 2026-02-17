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
const updateUserStatus = async (userId: string, status: string) => {
  const result = await prisma.user.update({
    where: { id: userId },
    data: { status: status },
  });
  return result;
};

export const userManageService = {
  showAllUsers,
  deleteUser,
  updateUserStatus,
};
