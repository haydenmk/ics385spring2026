import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/admin/dashboard");
  }

  const error = req.query.error
    ? "Invalid credentials. Please try again."
    : null;

  const logoutMessage = req.query.logout
    ? "You have been logged out successfully."
    : null;

  res.render("admin/login", { error, logoutMessage });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/admin/dashboard",
    failureRedirect: "/admin/login?error=1"
  })
);

router.get("/logout", (req, res, next) => {
  req.logout((error) => {
    if (error) return next(error);

    req.session.destroy(() => {
      res.redirect("/admin/login?logout=1");
    });
  });
});

export default router;