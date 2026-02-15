import { categoryService } from "./category.service";
import { Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client";

const createCategory = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const category = await categoryService.createCategory(payload);
    res.status(201).json(category);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return res.status(400).json({
        message: "Category name must be unique. This name already exists.",
      });
    }

    console.error("Error creating category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryService.getCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const categoryController = {
  createCategory,
  getCategories,
};
