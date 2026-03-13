require('dotenv').config(); // Loads the .env file

async function getWeather() { 

  const apiKey = process.env.OPENWEATHER_KEY; // Gets the API key from the .env file
  const lon = "-156.45"; // Longitute for the location (Kahului)
  const lat = "20.87"; // Latitude for the location (Kahului)

  const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`); // Fetches weather data from the OpenWeather API key using longitude and latitude
  const weatherData = await weather.json(); // Converts the response to JSON format

  console.log("Description:", weatherData.weather[0].description); 
  console.log("Temp:", weatherData.main.temp);
  console.log("Icon:", weatherData.weather[0].icon);
  console.log("Humidity:", weatherData.main.humidity);
  console.log("Wind Speed:", weatherData.wind.speed);
  console.log("Cloudiness:", weatherData.clouds.all);
}

getWeather();