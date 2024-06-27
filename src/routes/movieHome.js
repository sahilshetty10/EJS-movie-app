const express = require("express");
const router = express.Router();
const Favorites = require("../model/Favorites");

// Fetch data from TMDB API
const api_key = "1f54bd990f1cdfb230adb312546d765d";

// Home route to display movies and TV shows
router.get("/", (req, res) => {
  Favorites.findByUserId(req.session.userId, (err, favorites) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }

    if (!favorites) {
      favorites = [];
    }

    // Fetch all data in parallel
    Promise.all([
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}`),
      fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}`,
      ),
      fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}`),
      fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${api_key}`),
      fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${api_key}`),
      fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${api_key}`),
    ])
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then(
        ([
          featuredMoviesData,
          trendingMoviesData,
          topRatedMoviesData,
          featuredTvData,
          trendingTvData,
          topRatedTvData,
        ]) => {
          res.render("movie", {
            title: "Movie Home",
            featuredMovies: featuredMoviesData.results,
            trendingMovies: trendingMoviesData.results,
            topRatedMovies: topRatedMoviesData.results,
            featuredTvShows: featuredTvData.results,
            trendingTvShows: trendingTvData.results,
            topRatedTvShows: topRatedTvData.results,
            favorites,
          });
        },
      )
      .catch((err) => {
        console.error(err);
        res.status(500).send("Internal Server Error");
      });
  });
});

module.exports = router;
