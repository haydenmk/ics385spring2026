import { useState, useEffect } from "react";

const KEY = import.meta.env.VITE_WEATHER_KEY;

// Sunset Beach, Oahu
const SUNSET_BEACH = {
  name: "Sunset Beach",
  lat: 21.6701,
  lon: -158.0457
};

function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${SUNSET_BEACH.lat}&lon=${SUNSET_BEACH.lon}&units=imperial&appid=${KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeather(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Weather fetch error:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading weather...</p>;
  }

  if (!weather || weather.cod !== 200) {
    return <p>Weather data unavailable.</p>;
  }

  return (
    <div className="weather-card">
      <h2>Current Weather</h2>
      <h3>{SUNSET_BEACH.name}</h3>
      <p>
        {Math.round(weather.main.temp)}°F — {weather.weather[0].description}
      </p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind: {Math.round(weather.wind.speed)} mph</p>
    </div>
  );
}

export default WeatherWidget;