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
    "September",
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
    minutes = `0${minutes}`;
  }

  let fullDate = document.querySelector(".date");
  fullDate.innerHTML = `${day}, ${month} ${date} | ${hour}:${minutes}`;
}

function cityWeather(response) {
  document.querySelector(".city").innerHTML = response.data.name;
  celsius = response.data.main.temp;
  document.querySelector(".degrees").innerHTML = Math.round(celsius);
  document.querySelector(".description").innerHTML =
    response.data.weather[0].description;
  document.querySelector(
    ".humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector(".wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `src/images/${response.data.weather[0].icon}.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(cityName) {
  let apiKey = "7762efb07698ed321bcc404f01844d19";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(cityWeather);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector(".form-control");
  let cityName = city.value;
  let displayCitySearch = document.querySelector(".city");
  displayCitySearch.innerHTML = cityName;
  search(cityName);
  displayCelsius(event);
}

function showCurrentCelsius(response) {
  let celsiusTemp = document.querySelector(".degrees");
  let celsiusTemperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  celsiusTemp.innerHTML = celsiusTemperature;
}

function displayFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".degrees");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsius * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".degrees");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsius);
}

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "7762efb07698ed321bcc404f01844d19";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showCurrentCelsius);
  axios.get(apiUrl).then(cityWeather);
}

function currentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
  displayCelsius(event);
}

function getForecast(coordinates) {
  let apiKey = "7762efb07698ed321bcc404f01844d19";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-card">
          <div class="week-day">${formatDay(forecastDay.dt)}</div>
          <div class="weather-icon">
            <img
              src="src/images/${forecastDay.weather[0].icon}.png"
              alt=""
              width="30"
            />
          </div>
          <span class="afternoon-temp" id="max-temp">${Math.round(
            forecastDay.temp.max
          )} |</span>
          <span class="morning-temp" id="min-temp">${Math.round(
            forecastDay.temp.min
          )}</span>
        </div>
      </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

currentDate();

let celsius = null;

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", currentPosition);

let searchForm = document.querySelector(".search-city-form");
searchForm.addEventListener("submit", searchCity);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

search("Ljubljana");
