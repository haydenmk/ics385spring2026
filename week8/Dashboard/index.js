import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config(); // loads environment variables from the .env file

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(__dirname)); // serves the front-end files to the browser



app.get("/weather", async (req, res) => {

	try {

		const result = await axios.get(
			"https://api.openweathermap.org/data/2.5/weather",
			{
				params: {
					q: "Kahului,US",
					units: "imperial",
					appid: process.env.OPENWEATHER_API_KEY // reads the API key from the .env file
				}
			}
		);

		res.json(result.data); // sends weather data back to the browser

	} catch (error) {

		console.log("Weather error:", error.message); // logs the API error in the terminal

		res.json({
			name: "Kahului",
			main: { temp: 78, humidity: 60 },
			weather: [{ description: "partly cloudy" }],
			wind: { speed: 10 }
		}); // sends fallback weather data if the API fails

	}

});



app.get("/programming-joke", async (req, res) => {

	try {

		const result = await axios.get(
			"https://sv443.net/jokeapi/v2/joke/Programming",
			{
				params: { type: "single" }
			}
		);

		res.json(result.data); // sends programming joke data to the browser

	} catch (error) {

		res.json({
			joke: "Why do programmers prefer dark mode? Because light attracts bugs!"
		}); // fallback joke if the API fails

	}

});



app.get("/chuck-joke", async (req, res) => {

	try {

		const result = await axios.get(
			"https://chuck-norris-jokes-api-apiverve.p.rapidapi.com/",
			{
				headers: {
					"X-RapidAPI-Key": process.env.RAPIDAPI_KEY, // reads RapidAPI key from .env
					"X-RapidAPI-Host": process.env.RAPIDAPI_HOST // reads API host from .env
				}
			}
		);

		res.json(result.data); // sends Chuck Norris joke data to the browser

	} catch (error) {

		res.json({
			data: {
				joke: "Chuck Norris counted to infinity. Twice."
			}
		}); // fallback joke if the API fails

	}

});



app.listen(port, () => {

	console.log(`Server running at http://localhost:${port}`); // confirms the server started successfully

});