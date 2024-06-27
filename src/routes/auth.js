const express = require("express");
const router = express.Router();
const User = require("../model/User");

// Middleware to check if the user is logged in
function isLoggedIn(req, res, next) {
  if (req.session.userId) {
    return res.redirect("/movie");
  }
  next();
}

// Render login or signup page if user is not already logged in
router.get("/login", isLoggedIn, (req, res) => {
  res.render("login", { title: "Login" });
});

router.get("/signup", isLoggedIn, (req, res) => {
  res.render("signup", { title: "Sign Up" });
});

// Login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  User.findByUsername(username, (err, user) => {
    if (err) {
      console.error(err);
      return res.redirect("/auth/login");
    }
    if (!user || user.password !== password) {
      return res.redirect("/auth/login");
    }
    req.session.userId = user.id;
    res.redirect("/movie");
  });
});

// Signup
router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  // Check if username already exists
  User.findByUsername(username, (err, user) => {
    if (err) {
      console.error(err);
      return res.redirect("/auth/login");
    }
    if (user) {
      return res.redirect("/auth/login");
    }
    // Create a new user
    User.create(username, password, (err, userId) => {
      if (err) {
        console.error(err);
        return res.redirect("/auth/login");
      }
      req.session.userId = userId;
      res.redirect("/movie");
    });
  });
});

// Logout
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/auth/login");
});

module.exports = router;
