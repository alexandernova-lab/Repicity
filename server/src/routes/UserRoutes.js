import express from "express";
import {
  login,
  logout,
  myprofile,
  register,
  updateProfile,
} from "../controllers/UserController.js";
import {
  loginUserValidator,
  registerUserValidator,
} from "../validators/UserValidators.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.post("/register", registerUserValidator, validateRequest, register);
router.post("/login", loginUserValidator, validateRequest, login);
router.post("/logout", logout);

router.get("/profile", protect, myprofile);
router.patch("/profile", protect, upload.single("avatar"), updateProfile);

export default router;
