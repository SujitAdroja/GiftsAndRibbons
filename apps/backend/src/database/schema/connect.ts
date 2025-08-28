import mongoose, { Connection, STATES } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoUri = process.env.MONGO_URI as string;
if (!mongoUri) {
  throw new Error("MONGO_URI environment variable is not defined");
}
let isConnected = false;

export const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoUri);
    isConnected = true;
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1); // Exit the app if DB connection fails
  }
};
