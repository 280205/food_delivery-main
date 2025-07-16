// config/db.js
import mongoose from "mongoose";

export const connectDB = async () => {
  console.log("💥 MONGO_URI =", process.env.MONGO_URI); // Add this line to confirm
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ DB Connected"))
    .catch((err) => {
      console.error("❌ DB Connection Error:", err.message);
      process.exit(1);
    });
};
