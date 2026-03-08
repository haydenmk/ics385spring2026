async function loadWeather() {

	const weather = await getWeatherData(); // get weather data from the API client

	document.getElementById("weather").innerHTML =
		"City: " + weather.name + "<br>" +
		"Temp: " + weather.main.temp + " °F<br>" +
		"Conditions: " + weather.weather[0].description + "<br>" +
		"Humidity: " + weather.main.humidity + "%<br>" +
		"Wind: " + weather.wind.speed + " mph"; // display weather data on the page

}



async function loadJokes() {

	const prog = await getProgrammingJoke(); // get programming joke
	const chuck = await getChuckJoke(); // get Chuck Norris joke

	document.getElementById("progJoke").innerHTML =
		prog.joke || (prog.setup + " " + prog.delivery); // supports either single jokes or setup/delivery format

	document.getElementById("chuckJoke").innerHTML =
		chuck.data?.joke || chuck.joke || chuck.value || "Chuck Norris joke unavailable."; // checks multiple possible response formats before displaying fallback

}



window.onload = function () {

	loadWeather(); // load weather when the page first loads
	loadJokes(); // load jokes when the page first loads

};