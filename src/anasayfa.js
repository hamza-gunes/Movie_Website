
//! Arrow start
const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");

arrows.forEach((arrow, i) => {
  let clickCounter = 0;
  const movieList = movieLists[i];
  const movieItems = movieList.querySelectorAll(".movie-item");
  const itemWidth = 230; // her bir itemin genişliği + margin

  arrow.addEventListener("click", () => {
    clickCounter++;

    if (clickCounter >= movieItems.length) {
      
      clickCounter = 0;
    }

    movieList.style.transform = `translateX(-${clickCounter * itemWidth}px)`;
  });
});

//! Arrow end


//! Dark Light mode start

const ball = document.querySelector(".toggle-ball")
const items = document.querySelectorAll(".content, .container, .navbar, .navbar a, .navbar span, .navbar i, .sidebar, .sidebar i, .toggle, .toggle-ball, .movie-list-filter select, .movie-list-container h1, .toggle i, .featured-content, .featured-content-wrapper, .featured-desc")

ball.addEventListener("click", function(){
    items.forEach(item => {
        item.classList.toggle("active")
    });
})

//! Dark Light mode end


//!responsive start


let width = movieLists[0].getBoundingClientRect().width;
console.log("Bounding Width:", width);

const movieListItem = document.querySelectorAll(".movie-item-img");
console.log(movieListItem[0])
let width2 = movieListItem[0].getBoundingClientRect().width;
console.log(width2)


//!responsive end




//! api start - Populer, Trend, New

const apiKey = "5e3ab634";


const urls = {
  popular: `https://www.omdbapi.com/?apikey=${apiKey}&s=war&type=movie&page=1`,
  trending: `https://www.omdbapi.com/?apikey=${apiKey}&s=batman&type=movie&page=1`,
  newReleases: `https://www.omdbapi.com/?apikey=${apiKey}&s=spider-man&type=movie&page=1`
};


async function fetchMovies(category, url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.Response === "True") {
      displayMovies(data.Search, category);
    } else {
      console.error(`No movies found for ${category}`);
    }
  } catch (error) {
    console.error(`Error fetching ${category} movies:`, error);
  }
}


function displayMovies(movies, category) {
  const movieList = document.getElementById(category);
  if (!movieList) return;

  movieList.innerHTML = "";

  movies.forEach(movie => {
    const movieItem = document.createElement("li");
    movieItem.classList.add("movie-item");

    const movieImage = document.createElement("img");
    movieImage.classList.add("movie-item-img");
    movieImage.src = movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg";

    const movieInfo = document.createElement("div");
    movieInfo.classList.add("movie-item-info");

    const movieTitle = document.createElement("span");
    movieTitle.classList.add("movie-item-title");
    movieTitle.textContent = movie.Title;

    const movieButtons = document.createElement("div");
    movieButtons.classList.add("movie-item-buttons");
    movieButtons.innerHTML = `
      <i class="bi bi-play-circle-fill"></i>
      <i class="bi bi-hand-thumbs-up-fill"></i>
      <i class="bi bi-hand-thumbs-down-fill"></i>
      <i class="bi bi-plus-circle-fill"></i>
    `;

    movieInfo.appendChild(movieTitle);
    movieInfo.appendChild(movieButtons);
    movieItem.appendChild(movieImage);
    movieItem.appendChild(movieInfo);
    movieList.appendChild(movieItem);
  });
}


window.onload = () => {
  fetchMovies("popular", urls.popular);
  fetchMovies("trending", urls.trending);
  fetchMovies("newReleases", urls.newReleases);
};

//! api end - Populer, Trend, New


//! listem start


document.addEventListener("click", function (e) {
  if (e.target.classList.contains("bi-plus-circle-fill")) {
    const movieItem = e.target.closest(".movie-item");
    const title = movieItem.querySelector(".movie-item-title").innerText;
    const imgSrc = movieItem.querySelector(".movie-item-img").getAttribute("src");

    // Film objesi
    const film = { title, imgSrc };

    // Mevcut listeyi getir
    const currentList = JSON.parse(localStorage.getItem("filmListem")) || [];

    // Zaten varsa ekleme (aynı isimde film varsa)
    const exists = currentList.some((item) => item.title === title);
    if (!exists) {
      currentList.push(film);
      localStorage.setItem("filmListem", JSON.stringify(currentList));
      alert("Film listenize eklendi!");
    } else {
      alert("Bu film zaten listenizde var.");
    }
  }
});



//! listem end