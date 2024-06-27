const db = require("../database/db");

// Favorite model to add, remove, and find favorites
const Favorites = {
  add: (userId, movieId, title, callback) => {
    db.run(
      "INSERT INTO favorites (user_id, movie_id, title) VALUES (?, ?, ?)",
      [userId, movieId, title],
      function (err) {
        if (err) return callback(err);
        callback(null, this.lastID);
      },
    );
  },

  remove: (userId, movieId, callback) => {
    db.run(
      "DELETE FROM favorites WHERE user_id = ? AND movie_id = ?",
      [userId, movieId],
      function (err) {
        if (err) return callback(err);
        callback(null, this.lastID);
      },
    );
  },

  findByUserId: (userId, callback) => {
    db.all(
      "SELECT * FROM favorites WHERE user_id = ?",
      [userId],
      (err, favorites) => {
        if (err) return callback(err);
        callback(null, favorites);
      },
    );
  },
};

module.exports = Favorites;
