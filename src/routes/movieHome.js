const express = require("express");
const router = express.Router();
const Favorites = require("../model/Favorites");

// fetch data from tmdb api
const api_key = "1f54bd990f1cdfb230adb312546d765d";

router.get("/", async (req, res) => {
  // Get favorites for the logged-in user
  //   const favorites = Favorites.findByUserId(req.session.userId);

  // Fetch all data in parallel
  const [
    featuredMoviesResponse,
    trendingMoviesResponse,
    topRatedMoviesResponse,
    featuredTvResponse,
    trendingTvResponse,
    topRatedTvResponse,
  ] = await Promise.all([
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}`),
    fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}`),
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}`),
    fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${api_key}`),
    fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${api_key}`),
    fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${api_key}`),
  ]);

  // Parse JSON responses
  const [
    featuredMoviesData,
    trendingMoviesData,
    topRatedMoviesData,
    featuredTvData,
    trendingTvData,
    topRatedTvData,
  ] = await Promise.all([
    featuredMoviesResponse.json(),
    trendingMoviesResponse.json(),
    topRatedMoviesResponse.json(),
    featuredTvResponse.json(),
    trendingTvResponse.json(),
    topRatedTvResponse.json(),
  ]);

  res.render("movie", {
    title: "Movie Home",
    featuredMovies: featuredMoviesData.results,
    trendingMovies: trendingMoviesData.results,
    topRatedMovies: topRatedMoviesData.results,
    featuredTvShows: featuredTvData.results,
    trendingTvShows: trendingTvData.results,
    topRatedTvShows: topRatedTvData.results,
    // favorites,
  });
});

module.exports = router;
