function currentDate() {
  let currentTime = new Date();
  let date = currentTime.getDate();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "October",
    "November",
    "December",
  ];
  let month = months[currentTime.getMonth()];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentTime.getDay()];

  let hour = currentTime.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    hour = `0${minutes}`;
  }

  let fullDate = document.querySelector(".date");
  fullDate.innerHTML = `${day}, ${month} ${date} (${hour}:${minutes})`;
}

function cityWeather(response) {
  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector(".degrees").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".description").innerHTML =
    response.data.weather[0].description;
  document.querySelector(
    ".humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector(".wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
}

function displayCity(cityName) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(cityWeather);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector(".form-control");
  let cityName = city.value;

  let displayCitySearch = document.querySelector(".city");
  displayCitySearch.innerHTML = cityName;
  displayCity(cityName);
}

function showCurrentCelsius(response) {
  let celsiusTemp = document.querySelector(".degrees");
  let celsiusTemperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  celsiusTemp.innerHTML = celsiusTemperature;
}

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showCurrentCelsius);
  axios.get(apiUrl).then(cityWeather);
}

function currentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

currentDate();

let apiKey = "7762efb07698ed321bcc404f01844d19";
let units = "metric";

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", currentPosition);

let searchForm = document.querySelector(".search-city-form");
searchForm.addEventListener("submit", searchCity);
