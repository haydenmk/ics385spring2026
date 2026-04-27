import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import Property from "../models/Property.js";

const router = express.Router();

router.get("/dashboard", isAuthenticated, async (req, res) => {
  try {
    const properties = await Property.find({});

    const reviewCount = properties.reduce((total, property) => {
      return total + (property.reviews ? property.reviews.length : 0);
    }, 0);

    res.render("admin/dashboard", {
      user: req.user,
      properties,
      reviewCount
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

export default router;