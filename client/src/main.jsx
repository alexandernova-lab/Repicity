import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MainRouter from "./routes/MainRouter.jsx";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster />
    <AuthContextProvider>
      <MainRouter />
    </AuthContextProvider>
  </StrictMode>,
);
