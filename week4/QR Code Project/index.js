/*
  =====================================================
  **** 
  Name: Hayden Suzuki
  Date: 2/5/2026
  Course: ICS 385 Spring 2026
  Assignment: 2.4 QR Code Project
  Notes: This document has been edited using ChatGPT for certain sections. Comments left next to code blocks indicate which sections were generated with the help of AI and which were written by me.
  =====================================================
  Setup: 
  npm install
  npm install inquirer
  npm install qr-image
  =====================================================
  This javascript file is a QR code generator using a link input into the terminal.
*/ 

import inquirer from "inquirer"; /* Imports the inquirer npm package, which allows us to get user input from the terminal. */
import qr from "qr-image"; /* Imports the qr-image npm package, which allows us to turn the text input into the terminal by the user into a QR code image. */
import fs from "fs"; /* Imports the native fs node module, which allows us to create a txt file to save the user input. */

inquirer
  .prompt(
    {
        message: "Type in your URL:", /* From Udemy lesson. Used to display the message "Type in your URL:" to the terminal. */
        name: "URL", /* From Udemy lesson. Displays in the terminal restating the user's input. */
        validate: function (input) {  /* Generated with ChatGPT, this function is used to validate the user's input. It checks if the input is empty or only contains whitespace. */
            if (input.trim() === "") { /* Generated with ChatGPT, checks if the user input is empty or only contains whitespace. If it is, it returns an error message prompting the user to enter a valid URL. */
                return "URL cannot be empty. Please enter a valid URL."; /* Coded by student, returns an error message if the user tries to submit an empty input. */
        }
        return true; /* Coded by student, allows the user's input to be submitted if it is not empty */
    },
    })
  .then((answers) => {
    const url = answers.URL; /* From Udemy lesson. The user's input from the previous section is stored in a key named "URL" and turns it into a variable. */
    var qr_svg = qr.image(url); /* From Udemy lesson. The qr.image() function from the qr-image package is used to generate a QR code image based on the URL provided by the user. The resulting QR code image is stored in the variable qr_svg. */
    qr_svg.pipe(fs.createWriteStream("qr_img.png")); /* Fom Udemy lesson. The generated QR code image (qr_svg) is sent to a writeable stream created using the fs module's createWriteStream() function. This saves the QR code image as a file named "qr_img.png in the directory. */

    fs.writeFile("URL.txt", url, (err) => { /*From Udemy lesson. The writefile function is used to create a new text file named "URL.txt" and logs the user's input. The (err) section handles any potential errors. */
        if (err) throw err; /* From Udemy lesson. If there is an error during the file writing process, it will throw an error and stop the execution of the program. */
        console.log ("URL saved to URL.txt"); /* From Udemy lesson. The fs.writeFile() function is used to create a new text file named "URL.txt" and write the user's input (the URL) into that file. If there is an error during this process, it will throw an error. If the file is successfully created and written to, it will log "URL saved to URL.txt" in the terminal. */
        
    });
})
.catch((error) => { /* From Udemy lesson, handles any errors that may occur during program's execution. */
    if (error.isTtyError) { 
        console.error("Prompt couldn't be rendered in the current environment"); /* Coded by student, returns an error message if the prompt cannot be rendered. */
    } else {
        console.error("An error occurred:", error); /* Coded by student, returns an error message if any other error occurs during the execution of the code. */
    }
});


