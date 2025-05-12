//! Dark Light mode start

const ball = document.querySelector(".toggle-ball")
const items = document.querySelectorAll("body, .onerilenler, .content, .container, .navbar, .navbar a, .navbar span, .navbar i, .sidebar, .sidebar i, .toggle, .toggle-ball, .movie-list-filter select, .movie-list-container h1, .toggle i, .featured-content, .featured-content-wrapper, .featured-desc")

ball.addEventListener("click", function(){
    items.forEach(item => {
        item.classList.toggle("active")
    });
})

//! Dark Light mode end


//! listem start


window.addEventListener("DOMContentLoaded", function () {
  const movieListElement = document.querySelector(".movie-list");
  const filmListem = JSON.parse(localStorage.getItem("filmListem")) || [];

  filmListem.forEach((film) => {
    const li = document.createElement("li");
    li.classList.add("movie-item");
    li.innerHTML = `
      <img class="movie-item-img" src="${film.imgSrc}" alt="" />
      <div class="movie-item-info">
        <span class="movie-item-title">${film.title}</span>
        <div class="movie-item-buttons">
          <i class="bi bi-play-circle-fill"></i>
          <i class="bi bi-hand-thumbs-up-fill"></i>
          <i class="bi bi-hand-thumbs-down-fill"></i>
          <i class="bi bi-plus-circle-fill"></i>
        </div>
      </div>
    `;
    movieListElement.appendChild(li);
  });
});





//! listem end