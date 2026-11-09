import { createBrowserRouter, Navigate } from "react-router";
import { RouterProvider } from "react-router/dom";
import RegisterPage from "../pages/RegisterPage.jsx";
import HomePage from "../pages/HomePage.jsx";
import MainLayout from "../layout/MainLayout.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import CreateRecipe from "../pages/CreateRecipe.jsx";
import RecipeDetailPage from "../pages/RecipeDetailPage.jsx";
import UpdateRecipePage from "../pages/UpdateRecipePage.jsx";
import MyRecipesPage from "../pages/MyRecipesPage.jsx";
import { useContext } from "react";
import AuthContext from "../context/AuthContext.jsx";
import MyProfilePage from "../pages/MyProfilePage.jsx";

const MainRouter = () => {
  const { user } = useContext(AuthContext);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: user ? <HomePage /> : <Navigate to={"/register"} />,
        },
        {
          path: "/create",
          element: user ? <CreateRecipe /> : <Navigate to={"/register"} />,
        },
        {
          path: "/recipe/:id",
          element: user ? <RecipeDetailPage /> : <Navigate to={"/register"} />,
        },
        {
          path: "/recipe-update/:id",
          element: user ? <UpdateRecipePage /> : <Navigate to={"/register"} />,
        },
        {
          path: "/my-recipes",
          element: user ? <MyRecipesPage /> : <Navigate to={"/register"} />,
        },
        {
          path: "/profile",
          element: user ? <MyProfilePage /> : <Navigate to={"/register"} />,
        },
      ],
    },
    {
      path: "/register",
      element: !user ? <RegisterPage /> : <Navigate to={"/"} />,
    },
    {
      path: "/login",
      element: !user ? <LoginPage /> : <Navigate to={"/"} />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default MainRouter;
