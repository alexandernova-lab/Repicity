import { ChefHat } from "lucide-react";
import { Link } from "react-router";

const Register = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Hero Section */}
      <div className="bg-primary text-primary-content p-8 md:p-12 flex flex-col justify-between">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3">
          <div className="bg-base-100 text-primary p-2.5 rounded-(--radius-field) flex items-center justify-center">
            <ChefHat className="w-6 h-6" />
          </div>
          <span className="font-display text-2xl font-bold tracking-wide">
            Repicity
          </span>
        </div>

        {/* Hero Content */}
        <div className="space-y-6 max-w-md my-auto md:my-0">
          <ChefHat className="w-20 h-20 opacity-30 stroke-1" />
          <h1 className="font-display text-4xl lg:text-5xl font-bold leading-tight">
            Cook it. Share it. Taste what others made.
          </h1>
          <p className="text-primary-content/90 text-lg font-sans">
            Join a community of home cooks and keep every recipe you love in one
            place.
          </p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="bg-base-200 p-8 md:p-12 flex items-center justify-center">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div>
            <h2 className="font-display text-3xl font-bold text-base-content">
              Create your account
            </h2>
            <p className="text-base-content/70 mt-1 text-sm font-sans">
              It takes less than a minute.
            </p>
          </div>

          {/* Static Form */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {/* Name Input */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-base-content">
                Name
              </label>
              <input
                type="text"
                placeholder="Maya Cooper"
                className="w-full px-4 py-3 bg-base-100 border border-base-300 rounded-(--radius-field) text-base-content placeholder:text-base-content/40 focus:outline-none focus:border-secondary"
              />
            </div>

            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-base-content">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-base-100 border border-base-300 rounded-(--radius-field) text-base-content placeholder:text-base-content/40 focus:outline-none focus:border-secondary"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-base-content">
                Password
              </label>
              <input
                type="password"
                placeholder="Create a password"
                className="w-full px-4 py-3 bg-base-100 border border-base-300 rounded-(--radius-field) text-base-content placeholder:text-base-content/40 focus:outline-none focus:border-secondary"
              />
              <p className="text-xs text-base-content/60">
                At least 8 characters
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary hover:opacity-95 text-primary-content font-semibold py-3 rounded-(--radius-field) transition-opacity cursor-pointer mt-2">
              Create account
            </button>
          </form>

          {/* Footer Link */}
          <p className="text-center text-sm text-base-content/70 font-sans">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="font-semibold text-primary underline cursor-pointer">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
