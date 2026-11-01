import express from "express";
import {
  createRecipe,
  deleteRecipe,
  getRecipe,
  getRecipes,
  updateRecipe,
} from "../controllers/RecipeController.js";
import { createRecipeValidator } from "../validators/RecipeValidators.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = express.Router();

router.post("/", createRecipeValidator, validateRequest, createRecipe);
router.get("/", getRecipes);
router.get("/:id", getRecipe);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

export default router;
