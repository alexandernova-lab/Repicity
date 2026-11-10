import { ChefHat, ChevronDown, Utensils, Menu, X } from "lucide-react";
import { api } from "../libs/axios.js";
import { Link, NavLink, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext.jsx";

const NavBar = () => {
  const navigate = useNavigate();

  // Mobile Menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Auth Context
  const { user, dispatch } = useContext(AuthContext);

  // Handle Logout
  const handleLogout = async () => {
    try {
      const res = await api.post("/user/logout");

      if (res.status === 200) {
        dispatch({ type: "LOGOUT" });
        navigate("/login");
        toast.success("Logout Success");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  // Navigation Link Styles
  const navLinkStyles = ({ isActive }) =>
    `flex items-center space-x-2 px-4 py-2 rounded-(--radius-field) text-sm font-semibold transition-colors ${
      isActive
        ? "bg-accent text-accent-content"
        : "text-base-content hover:bg-base-200"
    }`;

  return (
    <nav className="bg-base-100 border-b border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Navbar */}
        <div className="flex justify-between items-center py-3">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-primary text-primary-content p-2.5 rounded-(--radius-field) flex items-center justify-center">
              <ChefHat className="w-5 h-5" />
            </div>

            <span className="font-display text-2xl font-bold text-base-content">
              Repicity
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/" end className={navLinkStyles}>
              Feed
            </NavLink>

            <NavLink to="/my-recipes" className={navLinkStyles}>
              <Utensils className="w-4 h-4" />
              <span>My Recipes</span>
            </NavLink>
          </div>

          {/* Right Section: Profile + Mobile Menu */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Profile Dropdown */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="flex items-center space-x-2 border border-base-300 pl-1.5 pr-2 sm:pr-3 py-1 rounded-full cursor-pointer hover:border-base-content/30 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-accent text-accent-content font-semibold text-xs flex items-center justify-center shrink-0">
                  {(user?.name || "")
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </div>

                <span className="hidden sm:block text-sm font-semibold text-base-content max-w-28 truncate">
                  {user?.username || user?.name}
                </span>

                <ChevronDown className="w-4 h-4 text-base-content" />
              </div>

              {/* Dropdown Content */}
              <ul
                tabIndex={-1}
                className="dropdown-content menu bg-base-100 border border-base-300 rounded-(--radius-box) z-50 w-48 p-2 shadow-sm mt-2"
              >
                <li>
                  <Link
                    to="/profile"
                    className="text-base-content font-semibold"
                  >
                    My Profile
                  </Link>
                </li>

                <li>
                  <button
                    onClick={handleLogout}
                    className="text-error font-semibold hover:bg-error/10"
                  >
                    Log out
                  </button>
                </li>
              </ul>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-(--radius-field) hover:bg-base-200 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 pt-2 border-t border-base-300">
            <div className="flex flex-col gap-2">
              <NavLink
                to="/"
                end
                className={navLinkStyles}
                onClick={() => setIsMenuOpen(false)}
              >
                Feed
              </NavLink>

              <NavLink
                to="/my-recipes"
                className={navLinkStyles}
                onClick={() => setIsMenuOpen(false)}
              >
                <Utensils className="w-4 h-4" />
                <span>My Recipes</span>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
