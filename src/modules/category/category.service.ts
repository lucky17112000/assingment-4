import { prisma } from "../../lib/prisma";

const createCategory = async (payload: any) => {
  console.log(payload);
  const result = await prisma.category.create({
    data: payload,
  });
  return result;
};
const getCategories = async () => {
  const result = await prisma.category.findMany({
    include: {
      tutors: true,
    },
  });
  return result;
};
export const categoryService = {
  createCategory,
  getCategories,
};
