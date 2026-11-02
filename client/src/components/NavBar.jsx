import { ChefHat, ChevronDown, Plus } from "lucide-react";

const NavBar = () => {
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
          <span className="bg-accent text-accent-content px-4 py-2 rounded-(--radius-field) text-sm font-semibold cursor-pointer">
            Feed
          </span>

          {/* Create Recipe Action */}
          <div className="flex items-center space-x-1.5 text-sm font-semibold text-base-content cursor-pointer">
            <Plus className="w-4 h-4" />
            <span>Create Recipe</span>
          </div>

          {/* Profile Pill */}
          <div className="flex items-center space-x-2 border border-base-300 pl-1.5 pr-3 py-1 rounded-full cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-accent text-accent-content font-semibold text-xs flex items-center justify-center">
              MC
            </div>
            <span className="text-sm font-semibold text-base-content">
              maya_cooks
            </span>
            <ChevronDown className="w-4 h-4 text-base-content" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
