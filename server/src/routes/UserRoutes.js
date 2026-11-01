import express from "express";
import { login, logout, register } from "../controllers/UserController.js";
import {
  loginUserValidator,
  registerUserValidator,
} from "../validators/UserValidators.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = express.Router();

router.post("/register", registerUserValidator, validateRequest, register);
router.post("/login", loginUserValidator, validateRequest, login);
router.post("/logout", logout);

export default router;
