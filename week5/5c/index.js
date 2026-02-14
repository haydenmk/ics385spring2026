const express = require("express"); // Imports express, lets us use our code to create a website
const bodyParser = require("body-parser"); // body-parser lets us see what is input by the user

const app = express(); // uses express to create the web application
app.use(bodyParser.urlencoded({ extended: true })); // reads the data from the users input

app.get("/", function (req, res) {
  res.send("To use the calculator, go to https://vy4nhy-3000.csb.app/VolCalc"); // Displays where the user should go if they are directed to https://vy4nhy-3000.csb.app
});

app.get("/VolCalc", function (req, res) {
  res.sendFile(__dirname + "/VolCalculator.html"); // the app (using express) gets the request (req) as well as responds (res) with the html page
});

app.post("/VolCalc", function (req, res) {
  var height = Number(req.body.Height); // confirms the "height" input by the user and turns it into a variable
  var radius = Number(req.body.Radius); // confirms the "radius" input by the user and turns it into a variable

  var volume = Math.PI * (Math.pow(radius, 2) * height); // uses the input from the user to perform the cylindrical volume equation, result is labeled as the variable "volume"
  volume = volume.toFixed(2); // rounds the result of the volume to the nearest 2 decimals

  res.send("The volume of the cylinder is " + volume); // displays the result of the cylindrical volume equation in the browser
});

app.listen(3000, function () {
  //
  console.log("Server is running on port 3000"); // Outputs that the server is currently running to the terminal
});
