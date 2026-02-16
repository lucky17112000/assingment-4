import { get } from "node:http";
import paginationSortinghelper from "../../helpers/paginationSortingHelper";
import { tutorProfileService } from "./tutorProfile.servic";
import { Request, Response } from "express";

const createTutorProfile = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const user = req.user; // iset it in auth middleware
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const tutorProfile = await tutorProfileService.createTutorProfile(
      payload,
      user.userId,
    );
    res.status(201).json(tutorProfile);
  } catch (error) {
    console.error("Error creating tutor profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getTutorProfile = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;

    const { page, limit, skip, sortBy, sortOrder } = paginationSortinghelper(
      req.query,
    );

    // console.log("options from controller", {page, limit, skip, sortBy, sortOrder});
    const tutorProfile = await tutorProfileService.getTutorProfile(
      {
        search: search as string,
      },
      page,
      limit,
      skip,
      sortBy,
      sortOrder,
    );
    res.status(200).json(tutorProfile);
  } catch (error) {
    console.error("Error fetching tutor profiles:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getTutorProfileByuserId = async (req: Request, res: Response) => {
  try {
    const { TutorId } = req.params;
    if (!TutorId) {
      throw new Error("TutorId is required");
    }

    const result = await tutorProfileService.getTutorProfileByuserId(
      TutorId as string,
    );
    res.status(200).json({ result });
  } catch (error) {
    console.error("Error fetching tutor profile by user id:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const updateTutorProfile = async (req: Request, res: Response) => {
  try {
    const { TutorId } = req.params;
    const payload = req.body;
    const { userId } = req.user || {};
    if (!TutorId) {
      return res.status(400).json({ message: "TutorId is required" });
    }
    // if (userId != TutorId) {
    //   return res.status(403).json({ message: "Forbidden" });
    // }
    const result = await tutorProfileService.updateTutorProfile(
      TutorId as string,
      payload,
    );
    res.status(200).json({ result });
  } catch (error) {
    console.error("Error updating tutor profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const tutorProfileController = {
  createTutorProfile,
  getTutorProfile,
  getTutorProfileByuserId,
  updateTutorProfile,
};
