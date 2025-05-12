//! Dark Light mode start

const ball = document.querySelector(".toggle-ball")
const items = document.querySelectorAll("body, .onerilenler, .content, .container, .navbar, .navbar a, .navbar span, .navbar i, .sidebar, .sidebar i, .toggle, .toggle-ball, .movie-list-filter select, .movie-list-container h1, .toggle i, .featured-content, .featured-content-wrapper, .featured-desc")

ball.addEventListener("click", function(){
    items.forEach(item => {
        item.classList.toggle("active")
    });
})

//! Dark Light mode end






const apiKey = "5e3ab634";



//! api start - Search

const searchInput = document.getElementById("searchInput")
const searchButton = document.getElementById("searchButton")

//? No search start

const url1 = `https://www.omdbapi.com/?apikey=${apiKey}&s=man&type=movie`

  fetch(url1)
    .then(response => response.json())
    .then(data => {
      if (data.Response === "True") {
        displayMovies1(data.Search);
      } else {
        alert("Film bulunamadı.");
      }
    })
    .catch(error => {
      console.error("Hata oluştu:", error);
    });

    function displayMovies1(movies) {
    const movieList = document.querySelector(".movie-list");
    movieList.innerHTML = "";
    

     movies.forEach(movie => {

    if(movie.Poster !== "N/A"){
    const li = document.createElement("li");
    li.classList.add("movie-item");

    li.innerHTML = `
      <img class="movie-item-img" src="${movie.Poster !== "N/A" ? movie.Poster : "img/carlogo.png"}" alt="${movie.Title}" />
      <div class="movie-item-info">
        <span class="movie-item-title">${movie.Title}</span>
        <div class="movie-item-buttons">
          <i class="bi bi-play-circle-fill"></i>
          <i class="bi bi-hand-thumbs-up-fill"></i>
          <i class="bi bi-hand-thumbs-down-fill"></i>
          <i class="bi bi-plus-circle-fill"></i>
        </div>
      </div>
    `;
    
    movieList.appendChild(li);
    }
});
    }
//? No search end



//? Search start

searchButton.addEventListener("click", ()=>{

  const query = searchInput.value.trim()
  if(query){
    searchMovie(query)
  }
  const onerilenler = document.getElementById("onerilenler")
  onerilenler.style.display = "none"
  const movieList = document.querySelector(".movie-list");
  movieList.style.marginTop = "-30px"

})

function searchMovie(query){

  const url2 = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}&type=movie`

  fetch(url2)
    .then(response => response.json())
    .then(data => {
      if (data.Response === "True") {
        displayMovies(data.Search);
      } else {
        alert("Film bulunamadı.");
      }
    })
    .catch(error => {
      console.error("Hata oluştu:", error);
    });
}

function displayMovies(movies) {
  const movieList = document.querySelector(".movie-list");
  movieList.innerHTML = "";

  movies.forEach(movie => {

    if(movie.Poster !== "N/A"){
    const li = document.createElement("li");
    li.classList.add("movie-item");

    li.innerHTML = `
      <img class="movie-item-img" src="${movie.Poster !== "N/A" ? movie.Poster : "img/carlogo.png"}" alt="${movie.Title}" />
      <div class="movie-item-info">
        <span class="movie-item-title">${movie.Title}</span>
        <div class="movie-item-buttons">
          <i class="bi bi-play-circle-fill"></i>
          <i class="bi bi-hand-thumbs-up-fill"></i>
          <i class="bi bi-hand-thumbs-down-fill"></i>
          <i class="bi bi-plus-circle-fill"></i>
        </div>
      </div>
    `;
    
    movieList.appendChild(li);
    }
  });
}

//? Search end





//! api end - Search


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