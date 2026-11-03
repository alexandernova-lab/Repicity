import { z } from "zod";

export const createRecipeSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description cannot exceed 500 characters"),

  category: z.enum(["Breakfast", "Lunch", "Dinner", "Dessert"], {
    error: "Please select a valid category",
  }),

  ingredients: z
    .array(
      z.object({
        name: z.string().trim().min(1, "Ingredient name is required"),
        amount: z.string().trim().min(1, "Amount is required"),
        unit: z.string().min(1, "Unit is required"),
      }),
    )
    .min(1, "At least one ingredient is required"),

  instructions: z
    .array(z.string().trim().min(1, "Instruction cannot be empty"))
    .min(1, "At least one instruction is required"),
});
