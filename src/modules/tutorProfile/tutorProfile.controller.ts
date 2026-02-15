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
export const tutorProfileController = {
  createTutorProfile,
};
