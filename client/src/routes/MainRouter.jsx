import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RegisterPage from "../pages/RegisterPage.jsx";
import HomePage from "../pages/HomePage.jsx";
import MainLayout from "../layout/MainLayout.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import CreateRecipe from "../pages/CreateRecipe.jsx";
import RecipeDetailPage from "../pages/RecipeDetailPage.jsx";
import UpdateRecipePage from "../pages/UpdateRecipePage.jsx";

const MainRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/create",
          element: <CreateRecipe />,
        },
        {
          path: "/recipe/:id",
          element: <RecipeDetailPage />,
        },
        {
          path: "/recipe-update/:id",
          element: <UpdateRecipePage />,
        },
      ],
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default MainRouter;
