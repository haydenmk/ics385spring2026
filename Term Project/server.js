import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Property from "./models/Property.js";

dotenv.config();

const app = express();
const PORT = 3000;

// Parses form data and JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sets EJS as the view engine
app.set("view engine", "ejs");

// Connects to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Basic home route
app.get("/", (req, res) => {
  res.send("Week 11 Term Project server is running.");
});

app.get("/properties", async (req, res) => {
  try {
    const query = {};

    if (req.query.island) {
      query.island = req.query.island;
    }

    if (req.query.minRating) {
      query["reviews.rating"] = { $gte: Number(req.query.minRating) };
    }

    const properties = await Property.find(query);
    res.render("properties", { properties });
  } catch (error) {
    res.status(500).send("Error loading properties");
  }
});

app.get("/properties/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).send("Property not found");
    }

    res.json(property);
  } catch (error) {
    res.status(500).send("Error loading property");
  }
});

app.post("/properties/:id/reviews", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).send("Property not found");
    }

    const newReview = {
      guestName: req.body.guestName,
      rating: req.body.rating,
      comment: req.body.comment
    };

    property.reviews.push(newReview);
    await property.save();

    res.status(201).json(property);
  } catch (error) {
    res.status(500).send("Error adding review");
  }
});

// Temporary test route for properties
app.get("/properties-test", async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(500).send("Error loading properties");
  }
});

// Starts the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});