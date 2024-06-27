const db = require("../database/db");

// User model to create and find users

// callback is a function that is passed as an argument to another function

const User = {
  create: (username, password, callback) => {
    db.run(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, password],
      function (err) {
        if (err) return callback(err);
        callback(null, this.lastID);
      }
    );
  },
  findByUsername: (username, callback) => {
    db.get(
      "SELECT * FROM users WHERE username = ?",
      [username],
      (err, user) => {
        if (err) return callback(err);
        callback(null, user);
      }
    );
  },
  findById: (id, callback) => {
    db.get("SELECT * FROM users WHERE id = ?", [id], (err, user) => {
      if (err) return callback(err);
      callback(null, user);
    });
  },
};

module.exports = User;
