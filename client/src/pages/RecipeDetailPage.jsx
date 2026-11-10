import { useEffect, useState } from "react";
import { api } from "../libs/axios.js";
import { Link, useParams } from "react-router";
import { toast } from "react-hot-toast";
import { ArrowLeft, Clock, Image as ImageIcon } from "lucide-react";
import { categoryGradients } from "../constants/categoryStyles.js";
import CommentSection from "../components/CommentSection.jsx";

const RecipeDetailPage = () => {
  const { id } = useParams();

  const [recipeDetail, setRecipeDetail] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await api.get(`/recipes/${id}`);

      if (res.status === 200) {
        setRecipeDetail(res.data.data);
        toast.success("Recipe Detail");
      }
    };
    fetchRecipe();
  }, [id]);

  return (
    <div className="min-h-screen bg-base-200 font-sans text-base-content py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Link */}
        <Link to={"/"}>
          <button className="inline-flex items-center space-x-2 text-xs font-semibold text-base-content/70 hover:text-base-content cursor-pointer transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to feed</span>
          </button>
        </Link>

        {recipeDetail ? (
          <>
            {/* Hero Image Banner */}
            <div
              className={`h-64 sm:h-80 md:h-96 w-full bg-linear-to-br ${categoryGradients[recipeDetail.category?.toLowerCase()] || "bg-base-200"}  rounded-(--radius-box) border border-base-300 flex items-center justify-center relative overflow-hidden shadow-sm`}
            >
              {recipeDetail.imageUrl ? (
                <img
                  src={recipeDetail.imageUrl}
                  alt={recipeDetail.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImageIcon className="w-16 h-16 text-orange-800/30 stroke-1" />
              )}
            </div>

            {/* Recipe Title & Meta Header */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                {/* Badges */}
                <div className="flex items-center space-x-3 text-xs font-semibold">
                  <span
                    className={`px-3 py-1 ${categoryGradients[recipeDetail.category?.toLowerCase()] || "bg-base-200"}  text-amber-900 rounded-full`}
                  >
                    {recipeDetail.category}
                  </span>
                  <span className="flex items-center space-x-1 text-base-content/70">
                    <Clock className="w-3.5 h-3.5" />
                    <span>25 min</span>
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-base-content">
                {recipeDetail.title}
              </h1>

              {/* Author info */}
              <div className="flex items-center space-x-3 pt-1">
                <div className="w-9 h-9 rounded-full bg-amber-200 text-amber-900 font-bold text-xs flex items-center justify-center border border-amber-300">
                  {recipeDetail.user?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </div>
                <div>
                  <p className="text-sm font-bold text-base-content leading-tight">
                    {recipeDetail.user.name}
                  </p>
                  <p className="text-xs text-base-content/60">
                    Shared on{" "}
                    {new Date(recipeDetail.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                      },
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Ingredients & Instructions 2-Column Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Ingredients Card */}
              <div className="bg-base-100 border border-base-300 rounded-(--radius-box) p-6 sm:p-8 shadow-sm">
                <h2 className="font-display text-2xl font-bold text-base-content mb-6">
                  Ingredients
                </h2>
                <ul className="divide-y divide-base-200">
                  {recipeDetail.ingredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className="py-3 text-sm font-medium text-base-content/90 flex items-center space-x-3 first:pt-0"
                    >
                      <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
                      <span>
                        {ingredient.amount} {ingredient.unit} {ingredient.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions Card */}
              <div className="bg-base-100 border border-base-300 rounded-(--radius-box) p-6 sm:p-8 shadow-sm">
                <h2 className="font-display text-2xl font-bold text-base-content mb-6">
                  Instructions
                </h2>
                <ol className="space-y-6">
                  {recipeDetail.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start space-x-4">
                      <span className="w-7 h-7 rounded-full bg-primary text-primary-content font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <p className="text-sm text-base-content/90 leading-relaxed pt-0.5">
                        {instruction}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Reviews & Comments Section */}
            <CommentSection recipeId={id} />
          </>
        ) : (
          <p>Loading</p>
        )}
      </div>
    </div>
  );
};

export default RecipeDetailPage;
