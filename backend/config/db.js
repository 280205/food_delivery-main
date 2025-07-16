import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        if (!mongoURI) {
            throw new Error("MONGO_URI is not defined in .env file");
        }
        await mongoose.connect(mongoURI);
        console.log("DB Connected");
    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
        process.exit(1); // Exit the process if connection fails
    }
};