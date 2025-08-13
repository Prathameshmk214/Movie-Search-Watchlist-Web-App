const API_KEY = "YOUR_OMDB_API_KEY"; // Replace with your OMDb API key
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const movieList = document.getElementById("movieList");

// Fetch movies from API
async function fetchMovies(query) {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
    const data = await res.json();
    return data.Search || [];
}

// Render movies to DOM
function displayMovies(movies) {
    movieList.innerHTML = "";
    movies.forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("movie-card");
        card.innerHTML = `
            <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/180x270'}" alt="${movie.Title}">
            <h3>${movie.Title} (${movie.Year})</h3>
            <button class="add-btn" onclick="addToWatchlist('${movie.imdbID}')">+ Add to Watchlist</button>
        `;
        movieList.appendChild(card);
    });
}

// Add movie to local storage watchlist
function addToWatchlist(id) {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    if (!watchlist.includes(id)) {
        watchlist.push(id);
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        alert("Added to Watchlist!");
    } else {
        alert("Already in Watchlist!");
    }
}

// Event listener for search
searchBtn.addEventListener("click", async () => {
    const query = searchInput.value.trim();
    if (query) {
        const movies = await fetchMovies(query);
        displayMovies(movies);
    }
});
