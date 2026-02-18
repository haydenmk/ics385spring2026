const express = require("express"); /* imports express, allows the code to create a web server*/
const bodyParser = require("body-parser"); /* imports body-parser, allows the code to read data sent through the web app*/

const date = require(__dirname + "/date.js"); /* loads date.js, lets the code use its functions */

const app = express(); /* creates express as an app, letting us use it as a web server */

let chores = ["Do Laundry", "Wash Dishes", "Take Out Trash"]; /* creates the chores array, stores 3 items */
let camping = ["Tent", "Sleeping Bag", "Flashlight"]; /* creates the camping array, stores 3 items */

app.set('view engine', 'ejs'); /* sets the view engine to ejs, lets us use JavaScript for HTML files */

app.use(bodyParser.urlencoded({extended: true})); /* lets express read data sent through the web app */

app.use(express.static("public")); /* lets the server send the images in the public folder */

app.get("/", function(req, res) { 
    let day = date.getDate(); /* uses date.js to get the current date, runs when the page is opened*/
    res.render("list", {listTitle: day, newListTasks: chores}); /* loads list.ejs with the date and the items from chores*/
    
});

app.post("/", function(req, res) { 
    let item = req.body.newItem; /* gets the new item from the form */

    if (req.body.list === "Chores") { /* adds the new item to the chores array then refreshes the page */
        chores.push(item); 
        res.redirect("/chores"); 
    } 

    else if (req.body.list === "Camping") { /* adds the new item to the camping array then refreshes the page */
        camping.push(item);
        res.redirect("/camping");
    }

    else {
        res.redirect("/"); /* redirects to the home page if neither form is selected */

    }
});

app.get("/chores", function(req, res){
  res.render("list", {listTitle: "Chores", newListTasks: chores}); /* loads and displays the chores list */
});

app.get("/camping", function(req, res){
  res.render("list", {listTitle: "Camping", newListTasks: camping}); /* loads and displays the camping list */
});

app.listen(3000, function() {
  console.log("Server is running on port 3000"); /* runs the server on port 3000, prints a message in terminal that it has started */
});
