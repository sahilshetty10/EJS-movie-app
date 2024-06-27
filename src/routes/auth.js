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

// Handle login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  User.findByUsername(username, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
    if (!user || user.password !== password) {
      return res.status(401).send("Invalid username or password");
    }
    req.session.userId = user.id;
    res.redirect("/movie");
  });
});

// Handle signup
router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  User.findByUsername(username, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
    if (user) {
      return res.status(400).send("Username already exists");
    }
    User.create(username, password, (err, userId) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
      }
      req.session.userId = userId;
      res.redirect("/movie");
    });
  });
});

// Handle logout
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/auth/login");
});

module.exports = router;
