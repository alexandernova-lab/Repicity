import { Recipe } from "../models/recipe.js";
import { Comment } from "../models/comment.js";
import { uploadSingleImage, deleteImage } from "../utils/cloudinary.js";

export const createRecipe = async (req, res) => {
  try {
    const { title, description, category, ingredients, instructions } =
      req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Recipe image is required",
      });
    }

    const uploadedImage = await uploadSingleImage(req.file, "repicity/recipes");

    const recipe = await Recipe.create({
      title,
      description,
      category,
      imageUrl: uploadedImage.image_url,
      imagePublicId: uploadedImage.public_alt,
      ingredients,
      user: req.user._id,
      instructions,
    });

    return res.status(201).json({
      success: true,
      message: "Recipe Created",
      data: recipe,
    });
  } catch (error) {
    console.error("Create Recipe Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create Recipe",
      error: error.message,
    });
  }
};

export const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find()
      .sort({
        createdAt: -1,
      })
      .populate("user", "name");

    // Comment count
    const commentCounts = await Comment.aggregate([
      {
        $group: {
          _id: "$recipe",
          count: { $sum: 1 },
        },
      },
    ]);

    // Convert comment counts into a Map
    const countsMap = new Map(
      commentCounts.map((item) => [item._id.toString(), item.count]),
    );

    // Attach comment count to each recipe
    const recipesWithCounts = recipes.map((recipe) => ({
      ...recipe.toObject(),
      commentsCount: countsMap.get(recipe._id.toString()) || 0,
    }));

    return res.status(200).json({
      success: true,
      message: "Fetched All Recipes",
      data: recipesWithCounts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch recipes",
      error: error.message,
    });
  }
};

export const getRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await Recipe.findById(id).populate("user", "name");

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
  let uploadedImage = null;

  try {
    const { id } = req.params;

    const { title, description, category, ingredients, instructions } =
      req.body;

    // 1. Find the recipe and check ownership
    const existingRecipe = await Recipe.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!existingRecipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    // 2. Upload new image if provided
    if (req.file) {
      uploadedImage = await uploadSingleImage(req.file, "repicity/recipes");
    }

    // 3. Prepare updated data
    const updateData = {
      title,
      description,
      category,
      ingredients,
      instructions,
    };

    if (uploadedImage) {
      updateData.imageUrl = uploadedImage.image_url;
      updateData.imagePublicId = uploadedImage.public_alt;
    }

    // 4. Update MongoDB
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, updateData, {
      returnDocument: "after",
      runValidators: true,
    });

    // 5. Delete old image only after successful update
    if (uploadedImage && existingRecipe.imagePublicId) {
      await deleteImage(existingRecipe.imagePublicId);
    }

    return res.status(200).json({
      success: true,
      message: "Recipe updated successfully",
      data: updatedRecipe,
    });
  } catch (error) {
    // Clean up the newly uploaded image if the update fails
    if (uploadedImage?.public_alt) {
      await deleteImage(uploadedImage.public_alt);
    }

    console.error("Update Recipe Error:", error);

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

    const recipe = await Recipe.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    if (recipe.imagePublicId) {
      await deleteImage(recipe.imagePublicId);
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

export const getMyRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      message: "Fetched My Recipes",
      data: recipes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch your recipes",
      error: error.message,
    });
  }
};
