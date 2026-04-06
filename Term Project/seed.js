import mongoose from "mongoose";
import dotenv from "dotenv";
import Property from "../models/Property.js";

dotenv.config();

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    await Property.deleteMany({});
    console.log("Old property records deleted");

    await Property.insertMany([
      {
        name: "North Shore Family Condo",
        island: "Oahu",
        type: "vacation rental",
        description: "A family-friendly Waikiki condo with beach access, a full kitchen, accommodates up to 6 guests. Perfect for families looking to enjoy the beach and the North Shore's variety of attractions and shopping.",
        amenities: ["wifi", "pool", "kitchen", "beach access", "multiple bedrooms"],
        targetSegment: "Family",
        imageURL: "/images/north-shore-house.jpg"
      },
      {
        name: "Laie Beach Retreat",
        island: "Oahu",
        type: "vacation rental",
        description: "Spacious Beach Retreat for large families, located in Laie, Oahu, with easy access to the beach and family-friendly attractions such as the Polynesian Cultural Center.",
        amenities: ["wifi", "air conditioning", "kitchen", "parking", "washer", "beachfront"],
        targetSegment: "Family",
        imageURL: "/images/laie-house.jpg"
      },
      {
        name: "Kahuku Sunset Family Home",
        island: "Oahu",
        type: "vacation rental",
        description: "A spacious, luxurious family home in Kahuku, accommodates up to 12 guests, complete with a beautiful view of the sunset.",
        amenities: ["wifi", "pool", "kitchen", "balcony", "ocean view"],
        targetSegment: "Family",
        imageURL: "/images/kahuku-house.jpg"
      },
      {
        name: "Newly Remodeled Turtle Bay Family Condo",
        island: "Oahu",
        type: "vacation rental",
        description: "A newly remodeled family condo in Turtle Bay, Oahu, offering modern amenities and a comfortable stay for families.",
        amenities: ["wifi", "parking", "kitchen", "extra beds"],
        targetSegment: "Family",
        imageURL: "/images/turtle-bay.jpg"
      },
      {
        name: "Hauula Beach House",
        island: "Oahu",
        type: "vacation rental",
        description: "A spacious beach house in Hauula, Oahu, perfect for families looking for a relaxing beach getaway with easy access to local cuisine.",
        amenities: ["wifi", "pool", "kitchen", "family seating area", "beach access"],
        targetSegment: "Family",
        imageURL: "/images/hauula-house.jpg"
      }
    ]);

    console.log("Seed complete - 5 properties inserted");

    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seedDatabase();
