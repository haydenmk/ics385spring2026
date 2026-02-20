/*
  =====================================================
  **** 
  Name: Hayden Suzuki
  Date: 2/20/2026
  Course: ICS 385 Spring 2026
  Assignment: Random Course Generator
  Notes: This code used ChatGPT to explain functions, but not for code generation. 
  The only changes made were replacing variables and the array lists from the base code.
  =====================================================
*/

import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => { // Manages the GET request to the root URL
  res.render("solution.ejs");
});

app.post("/submit", (req, res) => { // Manages the form submission
  const randomID = courseID[Math.floor(Math.random() * courseID.length)]; // Generates a random course ID
  const randomName = courseName[Math.floor(Math.random() * courseName.length)]; // Generates a random course name
  res.render("solution.ejs", { // Renders the solution.ejs file and sends it to the web app
    ID: randomID, // Sends the random course ID to the ejs file
    name: randomName, // Sends the random course name to the ejs file
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const courseID = [ // List of course IDs
 "ICS 320",
  "ICS 169",
  "ICS 385",
  "ICS 360",
  "ENG 316",
  "CHEM 101",
  "MATH 101",
  "PHYS 101",
  "BIO 101",
  "GEO 101",
];

const courseName = [ // List of course names
  "Database Design",
  "Chemistry and Society",
  "Web Development",
  "Calculus",
  "Statistics",
  "Advanced Research Writing",
  "Biology",
  "Geography",
  "Physics",
  "Algebra 2",
];
