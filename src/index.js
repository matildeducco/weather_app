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
celsiusLink.addClassList.add("active");
fahrenheitLink.addClassList.remove("active");
}

function displayForecast() {
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;
    let days = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];
    days.forEach(function(day) {
        forecastHTML = forecastHTML + `<div class="col-2 forecast">
                <span class="forecast-day">${day}</span>
                <img
                  src="https://openweathermap.org/img/wn/04d@2x.png"
                  alt=""
                  width="60"
                  id="forescast-icon"
                />
                <span class="forecast-max">18°</span> |
                <span class="forecast-min">12°</span>
              </div>`
    });
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsiusTemperature);


let celsiusTemperature = null;


let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

displayForecast();

search("London");






