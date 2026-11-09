import express from "express";
import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from "../controllers/CommentController.js";
import { createCommentValidator } from "../validators/CommentValidators.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = express.Router();

router.post(
  "/:id/create-comment",
  createCommentValidator,
  validateRequest,
  createComment,
);

router.get("/:id", getComments);

router.patch("/:id", createCommentValidator, validateRequest, updateComment);

router.delete("/:id", deleteComment);

export default router;
