const db = require("../database/db");

// User model to find, create, and delete users
const User = {
  findByUsername: (username, callback) => {
    db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
      if (err) {
        console.error(`Error finding user: ${err}`);
        return callback(err);
      }
      callback(null, row);
    });
  },

  create: (username, password, callback) => {
    db.run(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, password],
      function (err) {
        if (err) {
          console.error(`Error creating user: ${err}`);
          return callback(err);
        }
        console.log(`User created: ${username}`);
        callback(null, this.lastID);
      },
    );
  },
};

module.exports = User;
