# Author: Hayden Suzuki

# Week 10

## Overview
- ChatGPT was used to break study guides/rubrics down into step-by-step formats. All code used was initially provided by the instructions then edited by the author.

## Project Details
- Island: Oahu
- Property type: Vacation rentals
- Target Visitors: Families with children

## How to Run
1. Open project folder in VS Code
2. Open terminal in project folder
3. Run "npm install"
4. Connect Atlas using the .env file
5. Run "npm run seed"
6. Property records should show on MongoDB Atlas.

## Purpose/Function of Code
- The project connects to MongoDB Atlas using Mongoose in order to create a Property schema, then inserts 5 vacation rentals for use as data.

------------------------------------------------------------
# Week 11

## Overview
- ChatGPT was used to break study guides and rubrics down into step-by-step formats. All code used was either based on the assignment instructions and edited by the author.

## Weekly Tasks Completed
- Added an embedded Review schema to the Property model with guestName, rating, comment, and date fields
- Built the "GET /properties" route
- Built the "GET /properties/:id" route
- Built the "POST /properties/:id/reviews" route to add a review to a property
- Added query filtering using Mongoose operators for island and minimum rating
- Created a basic EJS page at "/properties" to list all properties
- Tested the required routes in Postman
- Exported the Postman collection JSON for submission

## Purpose/Function of Code
- The project connects to MongoDB Atlas using Mongoose, adds embedded guest reviews to each property document, creates Express CRUD-style routes for viewing properties and adding reviews, and renders a basic EJS webpage that lists the Oahu vacation rental properties.
