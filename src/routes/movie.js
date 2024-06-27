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

// Use movieHome router for home page
router.use(isLoggedIn, require("./movieHome"));

// Add favorite movie
router.post("/favorites/add", isLoggedIn, (req, res) => {
  const { movieId, title } = req.body;
  Favorite.add(req.session.userId, movieId, title, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
    Favorite.findByUserId(req.session.userId, (err, favorites) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
      }
      res.render("partials/sidebar", { favorites });
    });
  });
});

// Remove favorite movie
router.delete("/favorites/remove", isLoggedIn, (req, res) => {
  const { movieId } = req.body;
  Favorite.remove(req.session.userId, movieId, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
    Favorite.findByUserId(req.session.userId, (err, favorites) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
      }
      res.render("partials/sidebar", { favorites });
    });
  });
});

module.exports = router;
