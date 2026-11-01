import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    // Check token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // Verify JWT
    let decodedValue;

    try {
      decodedValue = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // Find authenticated user
    const user = await User.findById(decodedValue._id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists",
      });
    }

    // Attach user to request
    req.user = user;

    next();
  } catch (error) {
    console.error("Authentication Error:", error);

    return res.status(500).json({
      success: false,
      message: "Authentication failed",
    });
  }
};
