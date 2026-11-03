import mongoose, { Schema } from "mongoose";

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Breakfast", "Lunch", "Dinner", "Dessert"],
      required: true,
    },
    imageUrl: {
      type: String,
      default: "",
    },
    ingredients: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        amount: {
          type: String,
          required: true,
          trim: true,
        },
        unit: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
    instructions: {
      type: [String],
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export const Recipe = mongoose.model("Recipe", recipeSchema);
