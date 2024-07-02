const express = require("express");
const router = express.Router();
const User = require("../model/User");

// Middleware to check if the user is logged in
function isLoggedIn(req, res, next) {
  if (req.session.userId) {
    console.log(`User already logged in: ${req.session.userId}`);
    return res.redirect("/movie");
  }
  next();
}

// Render login or signup page if user is not already logged in
router.get("/login", isLoggedIn, (req, res) => {
  res.render("login", { title: "Login", error: null });
});

router.get("/signup", isLoggedIn, (req, res) => {
  res.render("signup", { title: "Sign Up", error: null });
});

// Handle login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  User.findByUsername(username, (err, user) => {
    if (err) {
      console.error(`Error during login: ${err}`);
      return res
        .status(500)
        .render("login", { title: "Login", error: "Internal Server Error" });
    }
    if (!user || user.password !== password) {
      console.log(`Invalid login attempt for username: ${username}`);
      return res
        .status(401)
        .render("login", {
          title: "Login",
          error: "Invalid username or password",
        });
    }
    req.session.userId = user.id;
    req.session.username = user.username;
    console.log(`User logged in: ${username}`);
    res.redirect("/movie");
  });
});

// Handle signup
router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  User.findByUsername(username, (err, user) => {
    if (err) {
      console.error(`Error during signup: ${err}`);
      return res
        .status(500)
        .render("signup", { title: "Sign Up", error: "Internal Server Error" });
    }
    if (user) {
      console.log(`Signup attempt with existing username: ${username}`);
      return res
        .status(400)
        .render("signup", {
          title: "Sign Up",
          error: "Username already exists",
        });
    }
    User.create(username, password, (err, userId) => {
      if (err) {
        console.error(`Error during user creation: ${err}`);
        return res
          .status(500)
          .render("signup", {
            title: "Sign Up",
            error: "Internal Server Error",
          });
      }
      req.session.userId = userId;
      console.log(`User signed up: ${username}`);
      res.redirect("/movie");
    });
  });
});

// Handle logout
router.get("/logout", (req, res) => {
  req.session.destroy();
  console.log(`User logged out`);
  res.redirect("/auth/login");
});

module.exports = router;
