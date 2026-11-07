export const parseRecipeForm = (req, res, next) => {
  try {
    if (typeof req.body.ingredients === "string") {
      req.body.ingredients = JSON.parse(req.body.ingredients);
    }

    if (typeof req.body.instructions === "string") {
      req.body.instructions = JSON.parse(req.body.instructions);
    }

    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid ingredients or instructions format",
    });
  }
};
