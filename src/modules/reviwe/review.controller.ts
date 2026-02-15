import { reviewService } from "./reviwe.service";
import { Request, Response } from "express";

const createReview = async (req: Request, res: Response) => {
  console.log("create review");
  try {
    const result = await reviewService.createReview();
    return res.status(201).json(result);
  } catch (error) {
    console.error("Error creating review:", error);
  }
};
export const reviewController = {
  createReview,
};
