# EJS Movie App

This project is a movie app that allows users to sign up and access the latest movies and shows, including trending and top-rated content. The app is built using Node.js, Express, EJS, Tailwind, and SQLite3

## Features

- User Signup and Login
- Display Latest Movies and Shows
- Show Trending and Top-Rated Content
- User Favorite List Management
- Error Handling

## Installation

- Clone the repo

```bash
git clone https://github.com/sahilshetty10/EJS-movie-app.git
cd movie-app
```

- Install dependencies

```bash
npm install
```

- Start the server

```bash
node server.js
```

## Usage

- Navigate to http://localhost:3000 in your web browser.
- Sign up for a new account.
- Browse the latest movies and shows.
- Add movies and shows to your favorites list.
- View your favorite movies and shows in the sidebar.

## Project Structure

- **server.js**: The main application file where the Express server is set up.
- **src/routes/**: The authentication and home page route handlers.
- **src/databse/**: Contains file to initialize database.
- **src/model/**: Contains User model and Favorites model to interact with database.
- **src/views/**: Contains ejs templates for different routes
- **public/**: Contains css files and images

## Project Requirements

- Create Nodejs and Express application
- Multiple pages handled with EJS as the templating engine
- Handle and process user input form
- Error Handling for invalid routes

## Implementation

- The project is made with Nodejs and Express. The app uses PORT 3000. Feel free to change it in server.js.
- EJS is used to render multiple pages (login, signup, and home). Many partials are also used (head, header, sidebar, featuredCard, movieCard) which are all rendered dynamically.
- The user has to fill out a signup form and the user input is handled by the server on the backend. The server checks to see if the username already exists and if it does the user is given an alert. If successful, the user is then redirected to the home page.
  The user can also go to the login page if he has an account already. The server then checks if username and password are correct. If successful, user is redirected to home page.
  The home page displays the users favorite movies/shows in the sidebar. The favorites list is retried from the database and then passed to the ejs template to be rendered.
- If the user tries to access the home page without having logged in, he will be redirected to the login page. If the user is already logged in and goes to the login or signup route, he will be redirected to the home page. If an invalid route is accessed, the user will be redirected to a 404 page.
- The server logs a message to the console when a user accesses restricted route, successfully logins or signups, adds a favorite, removes a favorite, logouts, etc. The server also gives appropriate error messages if it encounters any.
