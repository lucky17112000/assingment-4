import { Request, Response } from "express";
import { userManageService } from "./userManage.sevice";
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userManageService.showAllUsers();
    return res.status(200).json({
      success: true,
      message: "All users fetched successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error fetching all users:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userManageService.deleteUser(userId as string);
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;
    const result = await userManageService.updateUserStatus(
      userId as string,
      status as string,
    );
    return res.status(200).json({
      success: true,
      message: "User status updated successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error updating user status:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const userManageController = {
  getAllUsers,
  deleteUser,
  updateUserStatus,
};
