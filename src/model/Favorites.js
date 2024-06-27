const db = require("../database/db");

// Favorite model to add, remove, and find favorites
const Favorites = {
  add: (userId, movieId, title) => {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO favorites (user_id, movie_id, title) VALUES (?, ?, ?)",
        [userId, movieId, title],
        function (err) {
          if (err) return reject(err);
          resolve(this.lastID);
        },
      );
    });
  },

  remove: (userId, movieId) => {
    return new Promise((resolve, reject) => {
      db.run(
        "DELETE FROM favorites WHERE user_id = ? AND movie_id = ?",
        [userId, movieId],
        function (err) {
          if (err) return reject(err);
          resolve(this.lastID);
        },
      );
    });
  },

  findByUserId: (userId) => {
    return new Promise((resolve, reject) => {
      db.all(
        "SELECT * FROM favorites WHERE user_id = ?",
        [userId],
        (err, favorites) => {
          if (err) return reject(err);
          resolve(favorites);
        },
      );
    });
  },
};

module.exports = Favorites;
