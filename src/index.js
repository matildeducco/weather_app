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

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
}

function showForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;
    forecast.forEach(function(forecastDay, index) {
        if (index < 6) {
        forecastHTML = forecastHTML + `<div class="col-2 forecast">
                <span class="forecast-day">${formatDay(forecastDay.dt)}</span>
                <img
                  src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                  alt=""
                  width="58"
                  id="forescast-icon"
                />
                <span class="forecast-max">${Math.round(forecastDay.temp.max)}°</span> |
                <span class="forecast-min">${Math.round(forecastDay.temp.min)}°</span>
              </div>`;
    }});
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    let apiKey = "e450bc345a80a08ada69fd5c714d871d";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showForecast);
}

function showTemperature(response) {
    let temperatureElement = document.querySelector("#temp");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#day-time");
    let iconElement = document.querySelector("#icon");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
    celsiusTemperature = response.data.main.temp;
    
    document.getElementById("fahrenheit").onclick = function() {
    document.getElementById("wind").innerHTML = Math.round(response.data.wind.speed / 1.609344);
    document.getElementById("wind-units").innerHTML = "mph";
}

    document.getElementById("celsius").onclick = function() {
    document.getElementById("wind").innerHTML = Math.round(response.data.wind.speed);
    document.getElementById("wind-units").innerHTML = "km/h";
}

    getForecast(response.data.coord);    
}

function search(city) {
    let apiKey = `e450bc345a80a08ada69fd5c714d871d`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-input");
    search(cityInput.value);
}

function showFahrenheitTemperature(event) {
event.preventDefault();
let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
let temperatureElement = document.querySelector("#temp");
temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
celsiusLink.classList.remove("active");
fahrenheitLink.classList.add("active");
}

function showCelsiusTemperature(event) {
event.preventDefault();
let temperatureElement = document.querySelector("#temp");
temperatureElement.innerHTML = Math.round(celsiusTemperature);
celsiusLink.classList.add("active");
fahrenheitLink.classList.remove("active");
}



let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("London");






