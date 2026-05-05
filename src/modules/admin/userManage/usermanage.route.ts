import { Router } from "express";
import { userManageController } from "./userManage.controllers";
import { auth, UserRole } from "../../tutorProfile/tutorProfile.route";
const router = Router();
router.get("/users", auth(UserRole.Admin), userManageController.getAllUsers);
router.put(
  "/users/:userId/status",
  auth(UserRole.Admin),
  userManageController.updateUserStatus,
);
router.delete(
  "/users/:userId",
  auth(UserRole.Admin),
  userManageController.deleteUser,
);
router.delete(
  "/users/:userId/tutor-profile",
  auth(UserRole.Admin),
  userManageController.deleteTutorProfile,
);
// http://localhost:4000/admin/users/:userid/tutor-profile
export const userManageRouter = router;
