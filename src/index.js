//current Date and Time
let currentTime = new Date();

function getCurrentDate(date) {
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day}, ${hours}:${minutes}`;
}

function changeTime(event) {
  let timeNow = document.querySelector("h3");

  timeNow.innerHTML = getCurrentDate(currentTime);
}
changeTime();

function getCurrentDay(date) {
  let monthes = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Nov",
    "Dec"
  ];

  let month = monthes[date.getMonth()];
  let number = date.getDate();
  let year = date.getFullYear();
  let dayNow = `${month} ${number}, ${year}`;
  return dayNow;
}
function changeDay(event) {
  let dayNow = document.querySelector(".weather-date");
  dayNow.innerHTML = getCurrentDay(currentTime);
}
changeDay();

window.addEventListener("load", changeTime);
window.addEventListener("load", changeDay);

function getForecast(coordinates) {
    
    let apiKey = "e0dced0781a18aa3906255142be14578";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

///searching
function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  
  let iconElement = document.querySelector("#icon");
   iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
  
  celsiusTemperature = response.data.main.temp;
  
  getForecast(response.data.coord);  
}

function searchCity(city) {
  let apiKey = "e0dced0781a18aa3906255142be14578";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "e0dced0781a18aa3906255142be14578";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//fahrenheit - link
function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    
    let fahrenheitTemperature = (celsiusTemperature*9)/5+32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitLink = document.querySelector("#temp-farengeit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

//celsius-link
function displayCelsiusTemperature(event) {
    event.preventDefault();
    
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    
}

let celsiusTemperature = null;

let celsiusLink = document.querySelector("#temp-celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

//forecast
function formatDay(timestamp){
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
        if (index < 6) {
            forecastHTML =
                forecastHTML + `<div class="col-2">
            <div class="weather-forecast-date">
    ${formatDay(forecastDay.dt)}</div>
        <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
        alt = ""
        width = "42"/>
    <div class="weather-forecast-temperatures">
    <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}°</span>
    <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
    </div></div>`;
        }
    });

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "e0dced0781a18aa3906255142be14578";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

searchCity("Dnipro");

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);