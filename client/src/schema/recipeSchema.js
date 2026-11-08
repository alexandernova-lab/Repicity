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

  image: z.preprocess(
    (files) => files?.[0],
    z
      .instanceof(File, { error: "Recipe image is required" })
      .refine(
        (file) => file.size <= 5 * 1024 * 1024,
        "Image must be 5MB or smaller",
      )
      .refine(
        (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
        "Only JPG, PNG, and WebP images are allowed",
      ),
  ),

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

export const updateRecipeSchema = createRecipeSchema.extend({
  image: z.preprocess(
    (files) => (files instanceof File ? files : files?.[0]),
    z
      .instanceof(File)
      .refine(
        (file) => file.size <= 5 * 1024 * 1024,
        "Image must be 5MB or smaller",
      )
      .refine(
        (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
        "Only JPG, PNG, and WebP images are allowed",
      )
      .optional(),
  ),
});
