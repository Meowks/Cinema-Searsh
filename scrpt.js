let main = document.getElementsByClassName("main")[0];
let movieTitle = document.getElementsByClassName("movieTitle")[0];
let simularMovieTitle = document.getElementsByClassName("movieTitle")[1];
let movie = document.getElementsByClassName("movie")[0];
console.log(movieTitle);

// Кнопки
const themeBtn = document.getElementById("themeChange");
const searchBtn = document.getElementById("searchBtn");

// Слушатели событий
themeBtn.addEventListener("click", changeTheme);
searchBtn.addEventListener("click", findMovie);

// Смена темы
function changeTheme() {
  const body = document.querySelector("body");
  body.classList.toggle("dark");
}

// Поиск фильма
async function findMovie() {
  main.style.display = "none";
  let search = document.getElementsByName("search")[0].value;

  let loader = document.getElementsByClassName("loader")[0];
  loader.style.display = "block";

  let data = { apikey: "20fe8931", t: search };

  let result = await sendRequest("http://www.omdbapi.com/", "GET", data);
  loader.style.display = "none";

  if (result.Response == "False") {
    movie.style.display = "none";
    main.style.display = "block";
    movieTitle.style.display = "block";
    movieTitle.innerHTML = `${result.Error}`;
  } else {
    showMovie(result);
    console.log(result);
  }
}

function showMovie(movie) {
  main.style.display = "block";
  movieTitle.style.display = "block";
  document.getElementsByClassName("movie")[0].style.display = "flex";
  document.getElementById(
    "movieImg"
  ).style.backgroundImage = `url(${movie.Poster})`;
  movieTitle.innerHTML = `${movie.Title}`;

  const movieDesc = document.getElementsByClassName("movieDescription")[0];
  movieDesc.innerHTML = "";
  let params = [
    "imdbRating",
    "Year",
    "Released",
    "Genre",
    "Country",
    "Language",
    "Director",
    "Writer",
    "Actors",
  ];

  params.forEach((key) => {
    movieDesc.innerHTML += `
        <div class="desc">
            <span class="title">${key}</span>
            <span class="Subtitle">${movie[key]}</span>
        </div>
        `;
  });
}

async function sendRequest(url, method, data) {
  if (method == "POST") {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    response = await response.json();
    return response;
  } else if (method == "GET") {
    url = url + "?" + new URLSearchParams(data);
    let response = await fetch(url, {
      method: "GET",
    });
    response = await response.json();
    return response;
  }
}