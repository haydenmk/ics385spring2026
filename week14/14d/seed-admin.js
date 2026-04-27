import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./models/User.js";

dotenv.config();

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existing = await User.findOne({ email: "haydenmk@hawaii.edu" });

    if (existing) {
      console.log("Admin already exists.");
      process.exit(0);
    }

    const admin = new User({
      email: "haydenmk@hawaii.edu",
      password: "SecurePass123!"
    });

    await admin.save();
    console.log("Admin user created successfully!");

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding admin:", error);
  }
}

seedAdmin();