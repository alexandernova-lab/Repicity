import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/dbConnect.js";
import recipeRoutes from "./routes/RecipeRoutes.js";

dotenv.config({
  path: ".env",
});

const app = express();
app.use(express.json());

// Routes
app.use("/api/recipes", recipeRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
