const express = require("express"); // Imports express, lets us use our code to create a website
const bodyParser = require("body-parser"); // body-parser lets us see what is input by the user

const app = express(); // uses express to create the web application
app.use(bodyParser.urlencoded({ extended: true })); // reads the data from the users input

app.get("/", function (req, res) {
  res.send("To use the converter, go to https://g2378n-3000.csb.app/f2c");
});

app.get("/f2c", function (req, res) {
  res.sendFile(__dirname + "/f2cCalc.html"); // the app (using express) gets the request (req) as well as responds (res) with the html page
});

app.post("/f2c", function (req, res) {
  var num1 = Number(req.body.Fahrenheit); // confirms the input by the user

  var result = ((num1 - 32) * 5) / 9; // uses the input in the fahrenheit to celsius equation labeled as the variable "result"
  result = Math.round(result); // rounds the result to create an integer

  res.send("The result of the conversion is " + result); // displays the result of the fahrenheit to celsius equation in the browser
});

app.listen(3000, function () {
  //
  console.log("Server is running on port 3000"); // Outputs that the server is currently running to the terminal
});
