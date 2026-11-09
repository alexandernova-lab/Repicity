import { ChefHat, ChevronDown, Utensils } from "lucide-react";
import { api } from "../libs/axios.js";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useContext } from "react";
import AuthContext from "../context/AuthContext.jsx";

const NavBar = () => {
  // Navigate
  const navigate = useNavigate();

  // Auth Context
  const { user, dispatch } = useContext(AuthContext);
  console.log(user);

  // Handle Logout
  const handleLogout = async () => {
    const res = await api.post("/user/logout");
    if (res.status === 200) {
      dispatch({ type: "LOGOUT" });
      navigate("/login");
      toast.success("Logout Success");
    }
  };

  const handleMyRecipes = async () => {
    navigate("/my-recipes");
  };
  return (
    <nav className="bg-base-100 border-b border-base-300">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3">
          <div className="bg-primary text-primary-content p-2.5 rounded-(--radius-field) flex items-center justify-center">
            <ChefHat className="w-5 h-5" />
          </div>
          <span className="font-display text-2xl font-bold text-base-content">
            Repicity
          </span>
        </div>

        {/* Navigation & Profile */}
        <div className="flex items-center space-x-6">
          {/* Active Feed Link */}
          <Link
            to={"/"}
            className="bg-accent text-accent-content px-4 py-2 rounded-(--radius-field) text-sm font-semibold cursor-pointer"
          >
            Feed
          </Link>

          {/* Create Recipe Action */}
          <div
            onClick={handleMyRecipes}
            className="flex items-center space-x-1.5 text-sm font-semibold text-base-content cursor-pointer"
          >
            <Utensils className="w-4 h-4" />
            <span>My Recipes</span>
          </div>

          {/* Profile Pill */}
          {/* Profile Dropdown */}
          <div className="dropdown dropdown-end">
            {/* Your custom profile pill acting as the dropdown button */}
            <div
              tabIndex={0}
              role="button"
              className="flex items-center space-x-2 border border-base-300 pl-1.5 pr-3 py-1 rounded-full cursor-pointer hover:border-base-content/30 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-accent text-accent-content font-semibold text-xs flex items-center justify-center">
                {user?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </div>
              <span className="text-sm font-semibold text-base-content">
                {user?.username || user?.name}
              </span>
              <ChevronDown className="w-4 h-4 text-base-content" />
            </div>

            {/* Dropdown Menu Content */}
            <ul
              tabIndex={-1}
              className="dropdown-content menu bg-base-100 border border-base-300 rounded-(--radius-box) z-50 w-48 p-2 shadow-sm mt-2"
            >
              <li>
                <button
                  onClick={handleLogout}
                  className="text-error font-semibold hover:bg-error/10"
                >
                  Log out
                </button>
                <Link
                  to={"/profile"}
                  className="text-base-content font-semibold hover:bg-error/10"
                >
                  My Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
