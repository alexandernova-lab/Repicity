import mongoose from "mongoose";

export const connectDB = async () => {
  let DB_CONNECTION_STRING = "";

  try {
    if (process.env.NODE_ENV === "development") {
      DB_CONNECTION_STRING = process.env.MONGO_LOCAL_API_URL;
    }
    if (process.env.NODE_ENV === "production") {
      DB_CONNECTION_STRING = process.env.MONGO_API_URL;
    }
    const dbResponse = await mongoose.connect(DB_CONNECTION_STRING);
    console.log("Database Connected Successfully", dbResponse.connection.host);
  } catch (error) {
    console.log("Database Connected Failed", error);
    process.exit(1);
  }
};
