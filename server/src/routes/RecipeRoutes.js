import express from "express";
import {
  createRecipe,
  deleteRecipe,
  getMyRecipes,
  getRecipe,
  getRecipes,
  updateRecipe,
} from "../controllers/RecipeController.js";
import { createRecipeValidator } from "../validators/RecipeValidators.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { upload } from "../middlewares/upload.js";
import { parseRecipeForm } from "../middlewares/parseRecipeForm.js";

const router = express.Router();

router.post(
  "/",
  upload.single("image"),
  parseRecipeForm,
  createRecipeValidator,
  validateRequest,
  createRecipe,
);
router.get("/", getRecipes);

router.get("/my-recipes", getMyRecipes);

router.get("/:id", getRecipe);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

export default router;
