// Import the Express framework.
const express = require("express");

// Create an Express application.
const app = express();

// Start the server on port 3000.
app.listen(3000);

// Respond to GET requests for the homepage.
app.get("/", (req, res) => {
  // Send HTML; Express sets the content type and defaults to status 200.
  // res.send("<p>Home page</p>")
  res.sendFile("./views/index.html", { root: __dirname });
});

// Respond to GET requests for the about page.
app.get("/about", (req, res) => {
  // res.send("<p>About page</p>")
  res.sendFile("./views/about.html", { root: __dirname });
});

// Redirect GET requests from /about-us to /about.
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});


// Send the 404 page for unmatched requests. Keep this after all routes.
// app.use((req, res) => {
//   res.sendFile("./views/404.html", { root: __dirname });
// });
// Send the 404 page with status 404 for unmatched requests. Keep this after all routes.
app.use((req, res) => {
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});