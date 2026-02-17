import { NextFunction, Request, Response, Router } from "express";
import { auth as betterAuth } from "../../lib/auth";

import { tutorProfileController } from "./tutorProfile.controller";
const router = Router();
export enum UserRole {
  Student = "Student",
  Tutor = "Tutor",
  Admin = "Admin",
}
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
        role: string;
        name: string;
      };
    }
  }
}
export const auth = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log("auth middleware", roles);
    // i want to get user session from req.session.user
    const session = await betterAuth.api.getSession({
      headers: req.headers,
    });
    if (!session || !session.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = {
      userId: session.user.id,
      email: session.user.email,
      name: session.user.name,
      role: session.user.role || "Student",
    };
    if (roles.length > 0 && !roles.includes(req.user.role as UserRole)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};

router.post(
  "/",
  auth(UserRole.Tutor),
  tutorProfileController.createTutorProfile,
);
router.put("/tutor/:TutorId", tutorProfileController.updateTutorProfile);
router.get("/:TutorId", tutorProfileController.getTutorProfileByuserId);
router.get("/", tutorProfileController.getTutorProfile);

export const tutorProfileRoute = router;
