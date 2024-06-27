const express = require("express");
const router = express.Router();
const Favorite = require("../model/Favorites"); // Import the Favorite model

// Middleware to check if the user is logged in
function isLoggedIn(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.redirect("/auth/login");
  }
}

// home page
router.use(require("./movieHome"));

router.post("/favorites/add", isLoggedIn, (req, res) => {
  const { movieId } = req.body;
  Favorite.add(req.session.userId, movieId, (err) => {
    if (err) throw err;
    res.redirect("/movies");
  });
});

router.post("/favorites/remove", isLoggedIn, (req, res) => {
  const { movieId } = req.body;
  Favorite.remove(req.session.userId, movieId, (err) => {
    if (err) throw err;
    res.redirect("/movies");
  });
});

module.exports = router;
