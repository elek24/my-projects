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

dayday.innerHTML = `${days} ${hours}:${minutes}`;

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
  let temperature = document.querySelector("div.weather-temp");
  let temp = Math.round(response.data.main.temp);
  temperature.innerHTML = `${temp}°C`;
  let description = document.querySelector(".weather-desc");
  description.innerHTML = response.data.weather[0].main;
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
