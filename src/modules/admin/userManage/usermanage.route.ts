import { Router } from "express";
import { userManageController } from "./userManage.controllers";
const router = Router();
router.get("/users", userManageController.getAllUsers);
router.delete("/users/:userId", userManageController.deleteUser);

export const userManageRouter = router;
