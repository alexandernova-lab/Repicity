import { Recipe } from "../models/recipe.js";

export const createRecipe = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      imageUrl,
      ingredients,
      instructions,
    } = req.body;

    const recipe = await Recipe.create({
      title,
      description,
      category,
      imageUrl,
      ingredients,
      instructions,
    });

    return res
      .status(201)
      .json({ success: true, message: "Recipe Created", data: recipe });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create Recipe",
      error: error.message,
    });
  }
};

export const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });

    return res
      .status(200)
      .json({ success: true, message: "Fetched All Recipes", data: recipes });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to fetch recipes",
      error: error.message,
    });
  }
};

export const getRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    return res
      .status(200)
      .json({ success: true, message: "Fetched Recipe", data: recipe });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid recipe ID",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to fetch recipe",
      error: error.message,
    });
  }
};

export const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      category,
      imageUrl,
      ingredients,
      instructions,
    } = req.body;

    const recipe = await Recipe.findByIdAndUpdate(
      id,
      {
        title,
        description,
        category,
        imageUrl,
        ingredients,
        instructions,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Recipe updated successfully",
      data: recipe,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid recipe ID",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update recipe",
      error: error.message,
    });
  }
};

export const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await Recipe.findByIdAndDelete(id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Recipe deleted successfully",
      data: recipe,
    });
  } catch (error) {
    console.error("Delete Recipe Error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid recipe ID",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to delete recipe",
      error: error.message,
    });
  }
};
