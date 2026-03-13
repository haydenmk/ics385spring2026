async function getForecast() {

    const point = await fetch("https://api.weather.gov/points/20.8893,-156.4729"); // Gathers data from weather.gov's API with latitude and longitude for Kahului
    const pointData = await point.json(); // Converts the response to JSON format

    const forecast = await fetch(pointData.properties.forecast); // Fetches the forecast data from the URL provided previously
    const forecastData = await forecast.json(); // Converts the response to JSON format

    console.log(forecastData.properties.periods[0].detailedForecast); // Logs the detailed forecast in the console
}

getForecast();
