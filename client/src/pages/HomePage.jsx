import { Plus } from "lucide-react";
import RecipeCard from "../components/RecipeCard.jsx";
import { useEffect, useState } from "react";
import { api } from "../libs/axios.js";
import { Link } from "react-router";

const RecipeFeed = () => {
  const [recipes, setRecipes] = useState([]);

  // Get All Recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      const res = await api.get("/recipes/");
      setRecipes(res.data.data);
      console.log(res.data.data);
    };
    fetchRecipes();
  }, []);

  const categories = ["All", "Breakfast", "Lunch", "Dinner", "Dessert"];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-base-content">
            What’s cooking today?
          </h1>
          <p className="text-base-content/70 text-sm md:text-base mt-1">
            Recipes shared by home cooks in the Repicity community.
          </p>
        </div>

        {/* Create Recipe Button */}
        <Link
          to={"/create"}
          className="bg-primary hover:opacity-95 text-primary-content text-sm font-semibold px-4 py-2.5 rounded-(--radius-field) flex items-center space-x-2 transition-opacity cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Create Recipe</span>
        </Link>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center space-x-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
              index === 0
                ? "bg-base-content text-base-100"
                : "bg-base-200 text-base-content hover:bg-base-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Recipe Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default RecipeFeed;
