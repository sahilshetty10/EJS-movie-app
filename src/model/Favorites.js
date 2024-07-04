const db = require("../database/db");

// Favorite model to add, remove, and find favorites
const Favorites = {
  add: (userId, movieId, title, callback) => {
    db.run(
      "INSERT INTO favorites (user_id, movie_id, title) VALUES (?, ?, ?)",
      [userId, movieId, title],
      function (err) {
        if (err) {
          console.error(`Error adding favorite: ${err}`);
          return callback(err);
        }
        console.log(`Added to favorites: ${title}`);
        callback(null, this.lastID);
      },
    );
  },

  remove: (userId, movieId, callback) => {
    db.run(
      "DELETE FROM favorites WHERE user_id = ? AND movie_id = ?",
      [userId, movieId],
      (err) => {
        if (err) {
          console.error(`Error removing favorite: ${err}`);
          return callback(err);
        }
        console.log(`Removed from favorites: ${movieId}`);
        callback(null);
      },
    );
  },

  findByUserId: (userId, callback) => {
    db.all(
      "SELECT * FROM favorites WHERE user_id = ? ORDER BY id",
      [userId],
      (err, rows) => {
        if (err) {
          console.error(`Error fetching favorites: ${err}`);
          return callback(err);
        }
        callback(null, rows);
      },
    );
  },
};

module.exports = Favorites;
