async function getForecast() {

    const point = await fetch("https://api.weather.gov/points/20.8893,-156.4729");
    const pointData = await point.json();

    const forecast = await fetch(pointData.properties.forecastHourly);
    const forecastData = await forecast.json();

    console.log(forecastData.properties.periods[0].detailedForecast);
}

getForecast();
