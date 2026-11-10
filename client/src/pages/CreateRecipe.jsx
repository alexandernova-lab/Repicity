import {
  ArrowLeft,
  Upload,
  Plus,
  Trash2,
  GripVertical,
  Image as ImageIcon,
} from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createRecipeSchema } from "../schema/recipeSchema.js";
import { Link, useNavigate } from "react-router";
import { api } from "../libs/axios.js";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";

const CreateRecipe = () => {
  const [imagePreview, setImagePreview] = useState(null);
  // Navigate
  const navigate = useNavigate();

  //   React Hook Form
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createRecipeSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      image: null,
      ingredients: [],
      instructions: [""],
    },
  });

  //   Ingredients Form state Handle
  const {
    fields: ingredientsFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  //   Instructions Form state Handle
  const {
    fields: instructionFields,
    append: appendInstruction,
    remove: removeInstruction,
  } = useFieldArray({
    control,
    name: "instructions",
  });

  const selectedImage = watch("image")?.[0];

  useEffect(() => {
    if (!selectedImage) {
      setImagePreview(null);
      return;
    }

    const imageUrl = URL.createObjectURL(selectedImage);

    setImagePreview(imageUrl);

    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [selectedImage]);

  //   Submit Handler
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("image", data.image);

    formData.append("ingredients", JSON.stringify(data.ingredients));
    formData.append("instructions", JSON.stringify(data.instructions));

    try {
      const res = await api.post("/recipes/", formData);
      if (res.status === 201) {
        navigate("/");
        toast.success("Recipe Created");
      }
    } catch (error) {
      toast.error("Failed to create Recipe", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-screen bg-base-200 font-sans text-base-content pb-24"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Navigation & Header */}
        <div>
          <Link
            to={"/"}
            className="inline-flex items-center space-x-2 text-xs font-semibold text-base-content/70 hover:text-base-content mb-4 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Recipes</span>
          </Link>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-base-content">
            Create a Recipe
          </h1>
          <p className="text-sm text-base-content/70 mt-1">
            Share something delicious with the community.
          </p>
        </div>

        {/* SECTION 1: Basic Info & Cover Photo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Info Card */}
          <div className="bg-base-100 border border-base-300 rounded-(--radius-box) p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="font-display text-xl font-bold mb-1">
                Basic information
              </h2>
              <p className="text-xs text-base-content/60 mb-6">
                The essentials people see first.
              </p>

              <div className="space-y-4">
                {/* Recipe Title */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-base-content/70 mb-2">
                    Recipe title <span className="text-error">*</span>
                  </label>
                  <input
                    {...register("title")}
                    type="text"
                    placeholder="e.g. Creamy Garlic Butter Chicken"
                    className="w-full px-4 py-2.5 bg-base-200 border border-base-300 rounded-(--radius-field) text-sm focus:outline-none focus:border-primary text-base-content"
                  />
                  {errors.title && (
                    <p className="text-error text-sm">{errors.title.message}</p>
                  )}
                </div>

                {/* Category Dropdown */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-base-content/70 mb-2">
                    Category <span className="text-error">*</span>
                  </label>
                  <select
                    {...register("category")}
                    className="w-full px-4 py-2.5 bg-base-200 border border-base-300 rounded-(--radius-field) text-sm focus:outline-none focus:border-primary text-base-content cursor-pointer"
                  >
                    <option value="">Choose a category</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Dessert">Dessert</option>
                  </select>
                  {errors.category && (
                    <p className="text-error text-sm">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-base-content/70 mb-2">
                    Description
                  </label>
                  <textarea
                    {...register("description")}
                    rows="3"
                    maxLength={300}
                    placeholder="Describe your recipe, its flavors, and what makes it special..."
                    className="w-full px-4 py-2.5 bg-base-200 border border-base-300 rounded-(--radius-field) text-sm focus:outline-none focus:border-primary text-base-content resize-none"
                  ></textarea>
                  {errors.description && (
                    <p className="text-error text-sm">
                      {errors.description.message}
                    </p>
                  )}
                  <div className="flex justify-between items-center mt-1 text-[11px] text-base-content/50">
                    <span>A few sentences is plenty.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cover Photo Card */}
          <div className="bg-base-100 border border-base-300 rounded-(--radius-box) p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="font-display text-xl font-bold mb-1">
                Cover photo
              </h2>
              <p className="text-xs text-base-content/60 mb-6">
                Recommended ratio 4:3
              </p>

              <label htmlFor="" className="relative block">
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  {...register("image")}
                />
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Recipe preview"
                    className="w-full h-48 object-cover rounded-(--radius-field)"
                  />
                ) : (
                  <div className="border-2 border-dashed border-base-300 rounded-(--radius-field) p-6 text-center bg-base-200/50 hover:bg-base-200 transition-colors cursor-pointer flex flex-col items-center justify-center min-h-50">
                    <div className="w-12 h-12 rounded-full bg-accent text-accent-content flex items-center justify-center mb-3">
                      <Upload className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <p className="text-sm font-semibold text-base-content">
                      Upload your recipe photo
                    </p>
                    <p className="text-xs text-base-content/60 mt-1">
                      Drag and drop, or click to browse
                    </p>
                    <span className="inline-block mt-3 px-3 py-1 bg-base-100 border border-base-300 rounded-full text-[10px] font-bold text-base-content/70 uppercase tracking-wider">
                      PNG, JPG or WEBP
                    </span>
                  </div>
                )}
              </label>
              {errors.image && (
                <p className="text-error text-xs mt-2">
                  {errors.image.message}
                </p>
              )}
            </div>
            <p className="text-xs text-base-content/50 mt-4 flex items-center space-x-1">
              <ImageIcon className="w-3.5 h-3.5" />
              <span>A bright, close-up shot works best.</span>
            </p>
          </div>
        </div>

        {/* SECTION 2: Ingredients (Full Width) */}
        <div className="bg-base-100 border border-base-300 rounded-(--radius-box) p-6 shadow-sm">
          <h2 className="font-display text-xl font-bold mb-1">Ingredients</h2>
          <p className="text-xs text-base-content/60 mb-6">
            Everything you need to make this recipe.
          </p>

          <div className="space-y-3">
            {ingredientsFields.map((field, index) => (
              <div
                key={field.id}
                className="flex items-center space-x-2 sm:space-x-3 bg-base-200/60 p-2 sm:p-3 rounded-(--radius-field) border border-base-300/60"
              >
                <GripVertical className="w-4 h-4 text-base-content/30 cursor-grab shrink-0" />

                {/* Ingredient Name */}
                <input
                  {...register(`ingredients.${index}.name`)}
                  type="text"
                  placeholder="Ingredient (e.g. Chicken breast)"
                  className="flex-1 min-w-0 px-3 py-2 bg-base-100 border border-base-300 rounded-(--radius-field) text-sm focus:outline-none focus:border-primary text-base-content"
                />

                {/* Amount */}
                <input
                  {...register(`ingredients.${index}.amount`)}
                  type="number"
                  placeholder="Amount"
                  className="w-20 sm:w-24 px-3 py-2 bg-base-100 border border-base-300 rounded-(--radius-field) text-sm focus:outline-none focus:border-primary text-base-content text-center"
                />

                {/* Unit Dropdown */}
                <select
                  {...register(`ingredients.${index}.unit`)}
                  className="w-20 sm:w-24 px-2 sm:px-3 py-2 bg-base-100 border border-base-300 rounded-(--radius-field) text-sm focus:outline-none focus:border-primary text-base-content cursor-pointer"
                >
                  <option value="g">g</option>
                  <option value="kg">kg</option>
                  <option value="ml">ml</option>
                  <option value="tbsp">tbsp</option>
                  <option value="tsp">tsp</option>
                  <option value="pcs">pcs</option>
                  <option value="cup">cup</option>
                </select>

                {/* Remove Row Button */}
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="p-2 text-base-content/40 hover:text-error rounded-(--radius-field) transition-colors cursor-pointer shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() =>
              appendIngredient({
                name: "",
                amount: "",
                unit: "g",
              })
            }
            className="mt-4 px-4 py-2 bg-base-200 hover:bg-base-300 border border-base-300 text-base-content font-semibold text-xs rounded-(--radius-field) inline-flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Ingredient</span>
          </button>
        </div>

        {/* SECTION 3: Instructions (Full Width) */}
        <div className="bg-base-100 border border-base-300 rounded-(--radius-box) p-6 shadow-sm">
          <h2 className="font-display text-xl font-bold mb-1">Instructions</h2>
          <p className="text-xs text-base-content/60 mb-6">
            Walk everyone through the recipe step by step.
          </p>

          <div className="space-y-4">
            {instructionFields.map((field, index) => (
              <div
                key={field.id}
                className="flex items-start space-x-3 bg-base-200/60 p-3 rounded-(--radius-field) border border-base-300/60"
              >
                <GripVertical className="w-4 h-4 text-base-content/30 cursor-grab shrink-0 mt-3" />

                {/* Step Badge Number */}
                <span className="w-7 h-7 rounded-full bg-primary text-primary-content font-bold text-xs flex items-center justify-center shrink-0 mt-1.5">
                  {index + 1}
                </span>

                {/* Step Text Area */}
                <textarea
                  {...register(`instructions.${index}`)}
                  rows="2"
                  placeholder="Describe this cooking step..."
                  className="flex-1 min-w-0 px-3 py-2 bg-base-100 border border-base-300 rounded-(--radius-field) text-sm focus:outline-none focus:border-primary text-base-content resize-none"
                ></textarea>
                {errors.instructions?.[index]?.message && (
                  <p className="text-error text-sm">
                    {errors.instructions[index].message}
                  </p>
                )}

                {/* Remove Step Button */}
                <button
                  type="button"
                  onClick={() => removeInstruction(index)}
                  className="p-2 text-base-content/40 hover:text-error rounded-(--radius-field) transition-colors cursor-pointer shrink-0 mt-1.5"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => appendInstruction("")}
            className="mt-4 px-4 py-2 bg-base-200 hover:bg-base-300 border border-base-300 text-base-content font-semibold text-xs rounded-(--radius-field) inline-flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Step</span>
          </button>
        </div>
      </div>

      {/* Sticky Bottom Actions Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-base-100 border-t border-base-300 py-3 px-6 shadow-md z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <p className="text-xs text-base-content/60 hidden sm:block">
            Your recipe appears in the feed as soon as you publish.
          </p>
          <div className="flex items-center space-x-3 ml-auto">
            <Link
              to={"/"}
              className="px-5 py-2 text-sm font-semibold text-base-content hover:bg-base-200 rounded-(--radius-field) transition-colors cursor-pointer"
            >
              Cancel
            </Link>
            <button
              disabled={isSubmitting}
              type="submit"
              className="px-6 py-2 text-sm font-semibold bg-primary text-primary-content hover:opacity-95 rounded-(--radius-field) transition-opacity cursor-pointer shadow-sm"
            >
              Publish Recipe
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateRecipe;
