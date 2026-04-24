import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";

import User from "./models/User.js";
import initializePassport from "./passport-config.js";
import isAuthenticated from "./middleware/isAuthenticated.js";

dotenv.config();

const app = express();
const PORT = 3000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: { secure: false }
  })
);

initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.redirect("/login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.send("User already exists.");
    }

    const newUser = new User({
      email,
      password
    });

    await newUser.save();
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error registering user.");
  }
});

app.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/profile");
  }

  const error = req.query.error
    ? "Invalid email or password. Please try again."
    : null;

  const logoutMessage = req.query.logout
    ? "You have been logged out successfully."
    : null;

  res.render("login", { error, logoutMessage });
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login?error=1"
  })
);

app.get("/profile", isAuthenticated, (req, res) => {
  res.render("profile", {
    user: req.user
  });
});

app.get("/logout", (req, res, next) => {
  req.logout((error) => {
    if (error) return next(error);

    req.session.destroy(() => {
      res.redirect("/login?logout=1");
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});