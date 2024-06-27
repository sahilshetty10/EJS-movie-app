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
router.use(isLoggedIn, require("./movieHome"));

router.post("/favorites/add", isLoggedIn, async (req, res) => {
  try {
    const { movieId, title } = req.body;
    await Favorite.add(req.session.userId, movieId, title);

    const favorites = await Favorite.findByUserId(req.session.userId);
    res.render("partials/sidebar", { favorites });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/favorites/remove", isLoggedIn, async (req, res) => {
  try {
    const { movieId } = req.body;
    console.log(movieId);
    await Favorite.remove(req.session.userId, movieId, (err) => {
      if (err) throw err;
    });
    const favorites = await Favorite.findByUserId(req.session.userId);
    res.render("partials/sidebar", { favorites });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
