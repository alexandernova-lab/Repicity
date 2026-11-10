import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import { deleteImage, uploadSingleImage } from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
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
      username,
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

    return res
      .status(200)
      .json({ message: "Login Success", data: existingUser });
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

export const myprofile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    return res
      .status(200)
      .json({ success: true, message: "User profile fetched", data: user });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User profile fetch failed",
      error: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  let uploadedImage = null;
  try {
    const { name, username, email } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (req.file) {
      uploadedImage = await uploadSingleImage(req.file, "repicity/avatar");
    }

    const updatedData = {
      name,
      username,
      email,
    };

    if (uploadedImage) {
      updatedData.avatar = uploadedImage.image_url;
      updatedData.avatarPublicId = uploadedImage.public_alt;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      updatedData,
      { new: true },
    );

    // Delete old avatar only after successful update
    if (uploadedImage && user.avatarPublicId) {
      await deleteImage(user.avatarPublicId);
    }

    return res.status(200).json({
      success: true,
      message: "User profile updated",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User profile update failed",
      error: error.message,
    });
  }
};
