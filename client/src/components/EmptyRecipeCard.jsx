import React from "react";

const EmptyRecipeCard = ({ category = "All" }) => {
  return (
    <div>
      <div className="bg-base-100 border border-base-300 rounded-(--radius-box) px-6 py-20 shadow-sm flex flex-col items-center justify-center text-center">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-base-content">
          {category === "All" ? "No recipes yet" : `No ${category} recipes yet`}
        </h2>

        <p className="text-sm sm:text-base text-base-content/60 mt-3 max-w-md leading-relaxed">
          {category === "All"
            ? "Share your first creation with the Repicity community. Everything you publish will appear here."
            : `There are no ${category.toLowerCase()} recipes available yet. Try another category or share your own creation!`}
        </p>
      </div>
    </div>
  );
};

export default EmptyRecipeCard;
