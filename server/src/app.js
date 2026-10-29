import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/dbConnect.js";

dotenv.config({
  path: ".env",
});

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
