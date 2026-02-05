# Author: Hayden Suzuki
# QR-Code (ICS 385 Week 4 / Assignment 4b)

## Overview
This Node.js program generates a QR code and text document based on user input.

## Packages Used
- Inquirer.js
- qr-image
  
## How to Run
Enter the following into the terminal:
- npm install
- node index.js

## Output Files
- qr_img.png
- URL.txt

## Changes Made
- Added input validation to prevent blank user input
- Added a confirmation message to display when both the QR code and text file are generated.
- Added comments explaining functionality and user vs. AI-assisted input.

## Problems Encountered:
- One problem that I encountered with this code is that it was allowing me to input blank text when I accidentally pressed enter with nothing typed. I determined that it was a big issue with the user experience.
- Original code did not display when there was an error with the user input or execution.
