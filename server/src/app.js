import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/dbConnect.js";
import cookieParser from "cookie-parser";
import recipeRoutes from "./routes/RecipeRoutes.js";
import userRoutes from "./routes/UserRoutes.js";
import { protect } from "./middlewares/authMiddleware.js";

dotenv.config({
  path: ".env",
});

const app = express();
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/recipes", protect, recipeRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
