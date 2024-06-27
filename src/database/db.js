// db/database.js
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("db.sqlite");

// db with 2 tables: users and favorites

// users will store the account details

// favorites will store the user's favorite movies/tv shows

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)",
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS favorites (id INTEGER PRIMARY KEY, user_id INTEGER, movie_id INTEGER, title TEXT, UNIQUE(user_id, movie_id), FOREIGN KEY(user_id) REFERENCES users(id))",
  );
});

module.exports = db;
