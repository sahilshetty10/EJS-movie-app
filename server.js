const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;

// Set EJS as the templating engine
app.set("views", "src/views");
app.set("view engine", "ejs");

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Use the express-session middleware
app.use(
  session({
    secret: "wddm120project2",
    resave: false,
    saveUninitialized: false,
  }),
);

// Serve static files from the "public" directory
app.use(express.static("public"));

// Routes
app.use("/auth", require("./src/routes/auth"));
app.use("/movie", require("./src/routes/movie"));

app.get("/", (req, res) => {
  res.redirect("/movie");
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
