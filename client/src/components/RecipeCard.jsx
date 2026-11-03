import { MessageSquare, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router";
import { categoryGradients } from "../constants/categoryStyles.js";

const RecipeCard = ({ recipe }) => {
  return (
    <>
      <Link
        to={`/recipe/${recipe._id}`}
        className="bg-base-100 border border-base-300 rounded-(--radius-box) overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
      >
        {/* Card Top Image Placeholder */}
        <div
          className={`h-48 w-full ${categoryGradients[recipe.category?.toLowerCase()] || "bg-base-200"} flex items-center justify-center relative`}
        >
          <ImageIcon className="w-10 h-10 opacity-40 stroke-1" />
        </div>

        {/* Card Content */}
        <div className="p-5 space-y-4">
          {/* Category Badge */}
          <div>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryGradients[recipe.category?.toLowerCase()] || "bg-base-200"} text-base-content/80`}
            >
              {recipe.category}
            </span>
          </div>

          {/* Recipe Title */}
          <h3 className="font-display text-xl font-bold text-base-content leading-snug">
            {recipe.title}
          </h3>

          {/* Author and Comments Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-base-200">
            {/* Author Info */}
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-full bg-accent text-accent-content font-bold text-xs flex items-center justify-center">
                {recipe.user?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </div>
              <span className="text-xs font-semibold text-base-content/80">
                {recipe.user?.name}
              </span>
            </div>

            {/* Comment Counter */}
            <div className="flex items-center space-x-1 text-base-content/60 text-xs">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{recipe.comments}</span>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default RecipeCard;
