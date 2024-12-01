// Кнопки
const themeBtn = document.getElementById("themeChange")
const searchBtn = document.getElementById("searchBtn")

// Слушатели событий 
themeBtn.addEventListener("click", changeTheme)
searchBtn.addEventListener("click", findMovie)

// Смена темы
function changeTheme(){
    const body = document.querySelector("body")
    body.classList.toggle("dark")
}

// Поиск фильма
async function findMovie() {
    let search = document.getElementsByName("search")[0].value
    let data = {apikey: "20fe8931", t: search}

    let response = await sendRequest("http://www.omdbapi.com/", "GET", data );
    return console.log(response);
    
}



async function sendRequest(url, method, data) {
    if(method == "POST") {
        let response = await fetch(url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    
        response = await response.json()
        return response
    } else if(method == "GET") {
        url = url+"?"+ new URLSearchParams(data)
        let response = await fetch(url, {
            method: "GET"
        })
        response = await response.json()
        return response
    }
}

