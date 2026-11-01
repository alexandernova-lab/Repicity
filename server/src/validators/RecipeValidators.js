import { body } from "express-validator";

export const createRecipeValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10, max: 500 })
    .withMessage("Description must be between 10 and 500 characters"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required")
    .bail()
    .isIn(["Breakfast", "Lunch", "Dinner", "Dessert"])
    .withMessage("Invalid category"),

  body("imageUrl")
    .trim()
    .notEmpty()
    .withMessage("Image URL is required")
    .withMessage("Please provide a valid image URL"),

  body("ingredients")
    .isArray({ min: 1 })
    .withMessage("At least one ingredient is required")
    .bail()
    .custom((ingredients) =>
      ingredients.every(
        (ingredient) =>
          typeof ingredient === "string" && ingredient.trim().length > 0,
      ),
    )
    .withMessage("Ingredients must be non-empty strings"),

  body("instructions")
    .isArray({ min: 1 })
    .withMessage("At least one instruction is required")
    .bail()
    .custom((instructions) =>
      instructions.every(
        (instruction) =>
          typeof instruction === "string" && instruction.trim().length > 0,
      ),
    )
    .withMessage("Instructions must be non-empty strings"),
];
