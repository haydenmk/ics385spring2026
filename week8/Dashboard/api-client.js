async function getWeatherData() {

	try {

		const response = await fetch(CONFIG.weatherURL); // request weather data from the Express server
		const data = await response.json(); // convert JSON response to a JavaScript object

		return data;

	} catch (error) {

		console.log("Weather API error"); // logs an error if the weather request fails

		return {
			name: "Kahului",
			main: { temp: 78, humidity: 60 },
			weather: [{ description: "partly cloudy" }],
			wind: { speed: 10 }
		}; // fallback weather data if the API fails

	}

}



async function getProgrammingJoke() {

	try {

		const response = await fetch(CONFIG.programmingJokeURL); // request a programming joke from the server
		const data = await response.json(); // convert the JSON response to an object

		return data;

	} catch (error) {

		return {
			joke: "Why do programmers prefer dark mode? Because light attracts bugs!"
		}; // fallback joke if the API fails

	}

}



async function getChuckJoke() {

	try {

		const response = await fetch(CONFIG.chuckJokeURL); // request the Chuck Norris joke from the server
		const data = await response.json(); // convert the JSON response to an object

		return data;

	} catch (error) {

		return {
			data: {
				joke: "Chuck Norris counted to infinity. Twice."
			}
		}; // fallback joke if the API fails

	}

}