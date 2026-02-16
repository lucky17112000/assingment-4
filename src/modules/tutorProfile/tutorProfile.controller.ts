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
export const tutorProfileController = {
  createTutorProfile,
  getTutorProfile,
};
