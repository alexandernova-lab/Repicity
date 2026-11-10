import React from "react";

const EmptyRecipeCard = () => {
  return (
    <div>
      <div className="bg-base-100 border border-base-300 rounded-(--radius-box) px-6 py-20 shadow-sm flex flex-col items-center justify-center text-center">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-base-content">
          No recipes yet
        </h2>

        <p className="text-sm sm:text-base text-base-content/60 mt-3 max-w-md leading-relaxed">
          Share your first creation with the Repicity community. Everything you
          publish will appear here.
        </p>
      </div>
    </div>
  );
};

export default EmptyRecipeCard;
