let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
let days = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`
];
let day = days[now.getDay()];

let h4 = document.querySelector("h4");
h4.innerHTML = `${day} ${hours}:${minutes}`;

//Search city/display temperature

function displayTemperature(response) {
  document.querySelector("h2").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
}

function searchCity(city) {
  let apiKey = "96bcb985ac672416e81cc95dd54dabe4";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  let h2 = document.querySelector("h2");
  let inputCity = document.querySelector("#enter-city");

  h2.innerHTML = inputCity.value;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;
  searchCity(city);
}

let searchButton = document.querySelector("#search-city");
searchButton.addEventListener("click", handleSubmit);

searchCity("Miami");

// Current location //
function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "96bcb985ac672416e81cc95dd54dabe4";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayTemperature);
}

function displayCurrentTemp(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationBtn = document.querySelector("#current-location");
currentLocationBtn.addEventListener("click", displayCurrentTemp);

//Celsius/Fahrenheit
function convertToFarenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = "75°F";
}

let fahrenheitLink = document.querySelector("#celsius");
fahrenheitLink.addEventListener("click", convertToFarenheit);
