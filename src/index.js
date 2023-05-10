function formatDate(timestamp) {
    let date = new Date(timestamp);
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function showTemperature(response) {
    let temperature = document.querySelector("#temp");
    let city = document.querySelector("#city");
    let description = document.querySelector("#description");
    let humidity = document.querySelector("#humidity");
    let wind = document.querySelector("#wind");
    temperature.innerHTML = Math.round(response.data.main.temp);
    city.innerHTML = response.data.name;
    description.innerHTML = response.data.weather[0].description;
    humidity.innerHTML = response.data.main.humidity;
    wind.innerHTML = Math.round(response.data.main.wind.speed);
}

let apiKey = `e450bc345a80a08ada69fd5c714d871d`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then.showTemperature();