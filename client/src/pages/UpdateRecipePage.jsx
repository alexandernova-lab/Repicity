import {
  ArrowLeft,
  Upload,
  Plus,
  Trash2,
  GripVertical,
  RotateCcw,
  Save,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { api } from "../libs/axios.js";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateRecipeSchema } from "../schema/recipeSchema.js";
import { toast } from "react-hot-toast";

const EditRecipe = () => {
  const { id } = useParams();
  const [recipeDetail, setRecipeDetail] = useState(null);

  // Selected Image
  const [selectedImage, setSelectedImage] = useState(null);

  // Preview Image
  const [imagePreview, setImagePreview] = useState(null);

  // Navigation
  const navigate = useNavigate();

  //  React Hook Form
  const {
    register,
    control,
    reset,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(updateRecipeSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      ingredients: [{ name: "", amount: "", unit: "g" }],
      instructions: [""],
    },
  });

  // Ingredients Form State
  const {
    fields: ingredientsFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  // Ingstructions Form State
  const {
    fields: instructionFields,
    append: appendInstruction,
    remove: removeInstruction,
  } = useFieldArray({
    control,
    name: "instructions",
  });

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await api.get(`/recipes/${id}`);

        if (res.status === 200) {
          const recipe = res.data.data;

          setRecipeDetail(recipe);

          reset({
            title: recipe.title,
            description: recipe.description,
            category: recipe.category,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
          });
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load recipe");
      }
    };

    fetchRecipe();
  }, [id, reset]);

  const submit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);

    if (data.image) {
      formData.append("image", data.image);
    }

    formData.append("ingredients", JSON.stringify(data.ingredients));
    formData.append("instructions", JSON.stringify(data.instructions));

    try {
      const res = await api.put(`/recipes/${id}`, formData);
      if (res.status === 200) {
        toast.success("Updated Success");
        navigate("/");
      }
    } catch (error) {
      toast.error("Update Fail", error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="min-h-screen bg-base-200 font-sans text-base-content pb-28"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {recipeDetail ? (
          <>
            {/* Navigation & Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <Link
                  to={"/"}
                  className="inline-flex items-center space-x-2 text-xs font-semibold text-base-content/70 hover:text-base-content mb-3 cursor-pointer transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to recipe</span>
                </Link>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-base-content">
                  Edit Recipe
                </h1>
                <p className="text-sm text-base-content/70 mt-1">
                  Update your recipe details.
                </p>
              </div>

              {/* Top Save Action */}
              <button
                type="button"
                className="px-5 py-2.5 bg-primary text-primary-content rounded-(--radius-field) text-sm font-semibold hover:opacity-95 transition-opacity flex items-center justify-center space-x-2 cursor-pointer shadow-sm self-start sm:self-auto"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>

            {/* SECTION 1: Basic Info & Cover Photo (2 Columns) */}
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
                        className="w-full px-4 py-2.5 bg-base-200 border border-base-300 rounded-(--radius-field) text-sm focus:outline-none focus:border-primary text-base-content font-medium"
                      />
                      {errors.title && <p>{errors.title.message}</p>}
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
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Dessert">Dessert</option>
                      </select>
                      {errors.category && <p>{errors.category.message}</p>}
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-base-content/70 mb-2">
                        Description
                      </label>
                      <textarea
                        rows="3"
                        {...register("description")}
                        maxLength={300}
                        className="w-full px-4 py-2.5 bg-base-200 border border-base-300 rounded-(--radius-field) text-sm focus:outline-none focus:border-primary text-base-content resize-none leading-relaxed"
                      ></textarea>
                      {errors.description && (
                        <p>{errors.description.message}</p>
                      )}
                      <div className="flex justify-between items-center mt-1 text-[11px] text-base-content/50">
                        <span>A few sentences is plenty.</span>
                        <span>152 / 300</span>
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

                  {/* Photo Preview Container */}
                  <div className="h-60 w-full bg-linear-to-br from-orange-100 via-amber-100 to-orange-200 border border-base-300 rounded-(--radius-field) flex flex-col items-center justify-center relative overflow-hidden shadow-inner mb-4">
                    <img
                      src={imagePreview || recipeDetail.imageUrl}
                      alt={recipeDetail.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Photo Action Buttons */}
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <label className="py-2.5 px-3 bg-base-200 hover:bg-base-300 border border-base-300 text-base-content font-semibold text-xs rounded-(--radius-field) flex items-center justify-center space-x-1.5 transition-colors cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Replace photo</span>

                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];

                          if (file) {
                            setSelectedImage(file);
                            setImagePreview(URL.createObjectURL(file));
                            setValue("image", file, { shouldValidate: true });
                          }
                        }}
                      />
                    </label>
                    <button
                      type="button"
                      className="py-2.5 px-3 bg-base-100 hover:bg-error/10 border border-base-300 text-base-content hover:text-error font-semibold text-xs rounded-(--radius-field) flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                  <p className="text-xs text-base-content/50 text-center">
                    Choose a new photo to replace the current one.
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION 2: Ingredients (Full Width for Proper Spacing) */}
            <div className="bg-base-100 border border-base-300 rounded-(--radius-box) p-6 sm:p-8 shadow-sm">
              <div className="mb-6">
                <h2 className="font-display text-2xl font-bold mb-1">
                  Ingredients
                </h2>
                <p className="text-xs text-base-content/60">
                  Everything you need to make this recipe.
                </p>
              </div>

              <div className="grid grid-cols-12 gap-2 text-xs font-bold uppercase tracking-wider text-base-content/60 mb-2 px-2">
                <span className="col-span-7 sm:col-span-8">Ingredient</span>
                <span className="col-span-5 sm:col-span-4">Amount</span>
              </div>

              <div className="space-y-3">
                {ingredientsFields.map((ingredient, index) => (
                  <div
                    key={ingredient._id}
                    className="flex items-center space-x-2 sm:space-x-3 bg-base-200/60 p-2 sm:p-3 rounded-(--radius-field) border border-base-300/60"
                  >
                    <GripVertical className="w-4 h-4 text-base-content/30 cursor-grab shrink-0 hidden sm:block" />

                    {/* Ingredient Name */}
                    <input
                      {...register(`ingredients.${index}.name`)}
                      type="text"
                      className="flex-1 min-w-0 px-3 py-2 bg-base-100 border border-base-300 rounded-(--radius-field) text-sm focus:outline-none focus:border-primary text-base-content font-medium"
                    />

                    {/* Amount */}
                    <input
                      {...register(`ingredients.${index}.amount`)}
                      type="text"
                      className="w-20 sm:w-24 px-3 py-2 bg-base-100 border border-base-300 rounded-(--radius-field) text-sm focus:outline-none focus:border-primary text-base-content text-center font-medium"
                    />

                    {/* Unit Dropdown */}
                    <select
                      {...register(`ingredients.${index}.unit`)}
                      className="w-20 sm:w-28 px-2 sm:px-3 py-2 bg-base-100 border border-base-300 rounded-(--radius-field) text-sm focus:outline-none focus:border-primary text-base-content cursor-pointer font-medium"
                    >
                      <option value="g">g</option>
                      <option value="kg">kg</option>
                      <option value="ml">ml</option>
                      <option value="tbsp">tbsp</option>
                      <option value="tsp">tsp</option>
                      <option value="pcs">pcs</option>
                      <option value="cup">cup</option>
                    </select>

                    {/* Delete Row */}
                    <button
                      onClick={() => removeIngredient(index)}
                      type="button"
                      className="p-2 text-base-content/40 hover:text-error rounded-(--radius-field) transition-colors cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {errors.ingredients && <p>{errors.ingredients.message}</p>}
              </div>

              <button
                onClick={() =>
                  appendIngredient({
                    name: "",
                    amount: "",
                    unit: "",
                  })
                }
                type="button"
                className="mt-4 px-4 py-2 bg-base-200 hover:bg-base-300 border border-base-300 text-base-content font-semibold text-xs rounded-(--radius-field) inline-flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Ingredient</span>
              </button>
            </div>

            {/* SECTION 3: Instructions (Full Width for Proper Spacing) */}
            <div className="bg-base-100 border border-base-300 rounded-(--radius-box) p-6 sm:p-8 shadow-sm">
              <div className="mb-6">
                <h2 className="font-display text-2xl font-bold mb-1">
                  Instructions
                </h2>
                <p className="text-xs text-base-content/60">
                  Walk everyone through the recipe step by step.
                </p>
              </div>

              <div className="space-y-4">
                {instructionFields.map((instruction, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 bg-base-200/60 p-3 sm:p-4 rounded-(--radius-field) border border-base-300/60"
                  >
                    <GripVertical className="w-4 h-4 text-base-content/30 cursor-grab shrink-0 mt-3 hidden sm:block" />

                    {/* Step Badge Number */}
                    <span className="w-7 h-7 rounded-full bg-primary text-primary-content font-bold text-xs flex items-center justify-center shrink-0 mt-1.5">
                      {index + 1}
                    </span>

                    {/* Step Text Area */}
                    <textarea
                      {...register(`instructions.${index}`)}
                      rows="2"
                      className="flex-1 min-w-0 px-3 py-2 bg-base-100 border border-base-300 rounded-(--radius-field) text-sm focus:outline-none focus:border-primary text-base-content resize-none leading-relaxed font-medium"
                    ></textarea>

                    {/* Delete Step */}
                    <button
                      onClick={() => removeInstruction(index)}
                      type="button"
                      className="p-2 text-base-content/40 hover:text-error rounded-(--radius-field) transition-colors cursor-pointer shrink-0 mt-1.5"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => appendInstruction("")}
                type="button"
                className="mt-4 px-4 py-2 bg-base-200 hover:bg-base-300 border border-base-300 text-base-content font-semibold text-xs rounded-(--radius-field) inline-flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Step</span>
              </button>
              {errors.instructions && <p>{errors.instructions.message}</p>}
            </div>

            {/* SECTION 4: Danger Zone (Delete Recipe) */}
            <div className="bg-base-100 border border-error/30 rounded-(--radius-box) p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
              <div>
                <h3 className="font-display text-lg font-bold text-base-content">
                  Delete this recipe
                </h3>
                <p className="text-xs text-base-content/60 mt-0.5">
                  This permanently removes the recipe and its comments. This
                  action cannot be undone.
                </p>
              </div>
              <button
                type="button"
                className="px-4 py-2.5 bg-base-100 hover:bg-error/10 border border-error/40 text-error rounded-(--radius-field) text-xs font-bold transition-colors flex items-center space-x-2 cursor-pointer shrink-0"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete recipe</span>
              </button>
            </div>
          </>
        ) : (
          <p>Loading</p>
        )}
      </div>

      {/* Sticky Bottom Actions Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-base-100 border-t border-base-300 py-3 px-6 shadow-lg z-20">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <p className="text-xs text-base-content/60 hidden sm:block">
            Changes go live as soon as you save.
          </p>
          <div className="flex items-center space-x-3 ml-auto">
            <button
              type="button"
              className="px-5 py-2 text-sm font-semibold text-base-content hover:bg-base-200 rounded-(--radius-field) transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              disabled={isSubmitting}
              type="submit"
              className="px-6 py-2 text-sm font-semibold bg-primary text-primary-content hover:opacity-95 rounded-(--radius-field) transition-opacity cursor-pointer shadow-sm flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditRecipe;
