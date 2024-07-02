const showMovie = () => {
  document.getElementById("movie").style.display = "block";
  document.getElementById("tv").style.display = "none";
};
const showTv = () => {
  document.getElementById("movie").style.display = "none";
  document.getElementById("tv").style.display = "block";
};

// Add to Favourites
// function to post to /favourites/add with movie id
const addToFavorites = (event) => {
  const { movieId, title } = event.target.dataset;
  fetch("/movie/favorites/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ movieId, title }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Already in to favorites");
      }
      return res.text();
    })
    .then((data) => {
      document.getElementById("sidebar").innerHTML = data;
    })
    .catch((err) => {
      console.error(`Error: ${err.message}`);
      alert(err.message);
    });
};

// Remove from Favourites
// function to post to /favourites/remove with movie id
const removeFromFavorites = (event) => {
  const { movieId } = event.target.dataset;
  fetch("/movie/favorites/remove", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ movieId }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to remove from favorites");
      }
      return res.text();
    })
    .then((data) => {
      document.getElementById("sidebar").innerHTML = data;
    })
    .catch((err) => {
      console.error(`Error: ${err.message}`);
      alert(err.message);
    });
};
