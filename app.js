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

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperature.innerHTML = `${Math.round(fahrenheitTemp)}°F`;
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${Math.round(celsiusTemp)}°C`;
}

let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);
