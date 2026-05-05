import { reviewService } from "./reviwe.service";
import { Request, Response } from "express";

const createReview = async (req: Request, res: Response) => {
  console.log("create review");
  try {
    const userId = req.user?.userId as string;
    const result = await reviewService.createReview(req.body, userId);

    return res.status(201).json(result);
  } catch (error) {
    console.error("Error creating review:", error);
  }
};

const showAllreviews = async (req: Request, res: Response) => {
  try {
    const result = await reviewService.showAllreviews();
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
const showTutorReviews = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user || {};
    const result = await reviewService.showTutorReviews(userId as string);
    return res.status(200).json({
      success: true,
      message: "Tutor reviews fetched successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error fetching tutor reviews:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const showTutorReviewsPublic = async (req: Request, res: Response) => {
  try {
    const { tutorId } = req.params;

    if (!tutorId) {
      return res.status(400).json({
        success: false,
        message: "tutorId is required",
      });
    }

    const result = await reviewService.showTutorReviews(tutorId as string);
    return res.status(200).json({
      success: true,
      message: "Tutor reviews fetched successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error fetching tutor reviews:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const reviewController = {
  createReview,
  showAllreviews,
  showTutorReviews,
  showTutorReviewsPublic,
};
