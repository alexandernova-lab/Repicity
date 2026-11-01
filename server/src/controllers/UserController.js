import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exits with this email",
      });
    }

    // Hash Password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({ success: true, message: "User registered success", data: user });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User Register failed",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exist with this email",
      });
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // Generate JWT Token and Set Cookie
    const token = generateToken(existingUser._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Login Success" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Login Failed",
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", { maxAge: 1 });
  return res.status(200).json({ success: true, message: "Logout Success" });
};
