import mongoose from "mongoose";

// Review schema for embedded guest reviews
const reviewSchema = new mongoose.Schema({
  guestName: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Property schema for Oahu family vacation rentals
const propertySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    island: {
      type: String,
      required: true,
      enum: ["Maui", "Oahu", "Hawaii Island", "Kauai", "Molokai", "Lanai"]
    },
    type: {
      type: String,
      required: true,
      enum: ["hotel", "vacation rental"]
    },
    description: {
      type: String,
      maxlength: 500
    },
    amenities: [String],
    targetSegment: String,
    imageURL: String,
    reviews: [reviewSchema]
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", propertySchema);

export default Property;
