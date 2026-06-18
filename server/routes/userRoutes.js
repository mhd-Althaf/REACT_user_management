import express from "express";
import { registerUser, loginUser, getUserProfile, updateProfileImage, getUsers, deleteUser, updateUserRole, createUser, updateUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../config/multer.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.put(
  "/profile-image",
  protect,
  upload.single("profileImage"),
  updateProfileImage
);

router.put("/:id/role", protect, admin, updateUserRole);

router.put("/:id", protect, admin, updateUser);

router.get("/profile", protect, getUserProfile);

router.get("/", protect, admin, getUsers);

router.post("/", protect, admin, createUser);

router.delete(
  "/:id",
  protect,
  admin,
  deleteUser
);

export default router;