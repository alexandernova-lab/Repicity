import { body } from "express-validator";

export const createCommentValidator = [
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Comment content is required")
    .isLength({ max: 500 })
    .withMessage("Comment cannot exceed 500 characters"),
];
