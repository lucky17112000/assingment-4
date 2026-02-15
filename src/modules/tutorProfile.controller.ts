import { Request, Response } from "express";
import { tutorProfileService } from "./tutorProfile.service";

const createTutorProfile = async (req: Request, res: Response) => {
  console.log("Creating tutor profile controller...");
  const payload = req.body;
  //   console.log("Received payload:", payload);
  const result = await tutorProfileService.createTutorProfile(payload);
  res.status(200).json({ message: "Tutor profile created successfully" });
};
export const tutorProfileController = {
  createTutorProfile,
};
