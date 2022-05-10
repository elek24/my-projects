let now = new Date();
let dayday = document.querySelector("div.weather-detail__text");
let day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let days = day[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

dayday.innerHTML = `Last updated: <br/>${days} ${hours}:${minutes}`;

function handleSubmit(event) {
  event.preventDefault();
  let typeCity = document.querySelector("input.form-control");
  console.log(typeCity.value);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${typeCity.value}`.trim();
}

let form = document.querySelector("#city");
form.addEventListener("submit", handleSubmit);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  let forecastElement = document.querySelector("#forecast-panel");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `<div class="col-sm-2">
                      <div class="forecast-day">${formatDay(
                        forecastDay.dt
                      )}</div>
                      <img src="http://openweathermap.org/img/wn/${
                        forecastDay.weather[0].icon
                      }@2x.png"></img>
                      <div class="forecast-temperature-max">${Math.round(
                        forecastDay.temp.max
                      )}°C</div>
                      <div class="forecast-temperature-min">${Math.round(
                        forecastDay.temp.min
                      )}°C</div>
                      <div class="weather-desc">${
                        forecastDay.weather[0].main
                      }</div>
                    </div>
`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = `1d1d2ce4cc71e9ff6b42a9d2ea913c92`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function getTemp(response) {
  console.log(response.data);
  celsiusTemp = response.data.main.temp;
  let temperature = document.querySelector("div.weather-temp");
  let temp = Math.round(celsiusTemp);
  temperature.innerHTML = `${temp}°C`;
  let description = document.querySelector(".weather-desc");
  description.innerHTML = response.data.weather[0].main;
  let lookingOutside = document.querySelector("h3.description");
  lookingOutside.innerHTML = `Hows it looking outside 👀: <hr/>${response.data.weather[0].description.toUpperCase()}`;
  let feelslike = document.querySelector(".feels-like");
  feelslike.innerHTML = `Feels Like: ${Math.round(
    response.data.main.feels_like
  )}°C`;
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let wind = document.querySelector(".wind");
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed * 3.6)} km/h`;
  let mintemp = document.querySelector(".min-temp");
  mintemp.innerHTML = `Min 🌡: ${Math.round(response.data.main.temp_min)}°C`;
  let maxtemp = document.querySelector(".max-temp");
  maxtemp.innerHTML = `Max 🌡: ${Math.round(response.data.main.temp_max)}°C`;
  let mainicon = document.querySelector("#weather-main-icon");
  mainicon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function typeCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector(".form-control");
  let changeCity = document.querySelector("h1");
  changeCity.innerHTML = searchCity.value;

  let apiKey = `1d1d2ce4cc71e9ff6b42a9d2ea913c92`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&units=metric&appid=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(getTemp);
}

let searchBar = document.querySelector("#city");
searchBar.addEventListener("submit", typeCity);

function showPosition(position) {
  console.log(position);
}
navigator.geolocation.getCurrentPosition(showPosition);
