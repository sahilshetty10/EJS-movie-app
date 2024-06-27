const express = require("express");
const router = express.Router();
const User = require("../model/User");

// Middleware to check if the user is logged in
function isLoggedIn(req, res, next) {
  if (req.session.userId) {
    res.redirect("/movies");
  }
  next();
}

// render login or signup page if user is not already logged in
router.get("/login", isLoggedIn, (req, res) => {
  res.render("login", { title: "Login" });
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

// login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  User.findByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user || user.password !== password) {
      return res.redirect("/auth/login");
    }
    req.session.userId = user.id;
    res.redirect("/movies");
  });
});

// signup
router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  // check if username already exists and redirect to login page if it does
  User.findByUsername(username, (err, user) => {
    if (err) throw err;
    if (user) {
      return res.redirect("/auth/login");
    }
  });
  // create a new user and redirect to movies page

  User.create(username, password, (err, userId) => {
    if (err) throw err;
    req.session.userId = userId;
    res.redirect("/movies");
  });
});

// logout
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/auth/login");
});

module.exports = router;
