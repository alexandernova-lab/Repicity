import {
  Plus,
  Image as ImageIcon,
  Calendar,
  MessageSquare,
  Pencil,
  Trash2,
} from "lucide-react";
import { categoryGradients } from "../constants/categoryStyles.js";
import { useEffect, useState } from "react";
import { api } from "../libs/axios.js";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import EmptyRecipeCard from "../components/EmptyRecipeCard.jsx";

const MyRecipes = () => {
  const [myRecipes, setMyRecipes] = useState([]);

  // Navigate
  const navigate = useNavigate();

  // fetch my recipes
  useEffect(() => {
    const fetchMyRecipes = async () => {
      const res = await api.get("/recipes/my-recipes");
      if (res.status === 200) {
        setMyRecipes(res.data.data);
      } else {
        toast.error(res.data.message || "Failed to fetch my recipes");
      }
    };
    fetchMyRecipes();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await api.delete(`/recipes/${id}`);
      if (res.status === 200) {
        navigate("/");
        toast.success("Recipe Deleted");
      }
    } catch (error) {
      console.log("Delete Error:", error);
      console.log("Response:", error.response?.data);
      console.log("Status:", error.response?.status);

      toast.error(error.response?.data?.message || "Recipe Delete Failed");
    }
  };
  return (
    <div className="min-h-screen bg-base-200 font-sans text-base-content py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-base-content">
                My Recipes
              </h1>
              <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-semibold">
                {myRecipes.length} recipes
              </span>
            </div>
            <p className="text-sm text-base-content/70 mt-1">
              Your kitchen, your creations.
            </p>
          </div>

          {/* Primary Action Button */}
          <Link
            to={"/create"}
            className="px-5 py-2.5 bg-primary text-primary-content font-semibold text-sm rounded-(--radius-field) hover:opacity-95 transition-opacity flex items-center justify-center space-x-2 cursor-pointer shadow-sm self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Create Recipe</span>
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1">
          <button className="px-4 py-1.5 bg-neutral text-neutral-content rounded-full text-xs font-semibold cursor-pointer">
            All Recipes
          </button>
          <button className="px-4 py-1.5 bg-base-100 hover:bg-base-300 text-base-content border border-base-300 rounded-full text-xs font-semibold transition-colors cursor-pointer">
            Breakfast
          </button>
          <button className="px-4 py-1.5 bg-base-100 hover:bg-base-300 text-base-content border border-base-300 rounded-full text-xs font-semibold transition-colors cursor-pointer">
            Lunch
          </button>
          <button className="px-4 py-1.5 bg-base-100 hover:bg-base-300 text-base-content border border-base-300 rounded-full text-xs font-semibold transition-colors cursor-pointer">
            Dinner
          </button>
          <button className="px-4 py-1.5 bg-base-100 hover:bg-base-300 text-base-content border border-base-300 rounded-full text-xs font-semibold transition-colors cursor-pointer">
            Dessert
          </button>
        </div>
        {myRecipes.length === 0 && <EmptyRecipeCard />}
        {/* 3-Column Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Breakfast */}
          {myRecipes.map((recipe) => (
            <div
              key={recipe._id}
              className="bg-base-100 border border-base-300 rounded-(--radius-box) overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div>
                <div
                  className={`h-48 w-full ${categoryGradients.breakfast} flex items-center justify-center`}
                >
                  {recipe.imageUrl ? (
                    <img
                      src={recipe.imageUrl}
                      alt={recipe.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="w-10 h-10 stroke-1" />
                  )}
                </div>
                <div className="p-5 space-y-3">
                  <span className="inline-block px-2.5 py-0.5 bg-amber-100 text-amber-900 rounded-full text-[11px] font-semibold">
                    {recipe.category}
                  </span>
                  <h3 className="font-display text-xl font-bold text-base-content leading-tight">
                    {recipe.title}
                  </h3>
                  <p className="text-xs text-base-content/70 line-clamp-2">
                    {recipe.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-4">
                <div className="flex items-center justify-between text-xs text-base-content/60">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {new Date(recipe.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>12</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-base-200">
                  <Link
                    to={`/recipe-update/${recipe._id}`}
                    className="py-2 px-3 bg-base-100 hover:bg-base-200 border border-base-300 rounded-(--radius-field) text-xs font-semibold text-base-content flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    <Pencil className="w-3.5 h-3.5 text-base-content/70" />
                    <span>Edit</span>
                  </Link>
                  <button
                    onClick={() => handleDelete(recipe._id)}
                    className="py-2 px-3 bg-base-100 hover:bg-error/10 border border-base-300 text-base-content hover:text-error rounded-(--radius-field) text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyRecipes;
