import { body } from "express-validator";

export const registerUserValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Please provide a valid email")
    .bail()
    .toLowerCase(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

export const loginUserValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Please provide a valid email")
    .bail()
    .normalizeEmail(),

  body("password").notEmpty().withMessage("Password is required"),
];
