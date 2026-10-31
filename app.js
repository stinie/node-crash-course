// Import the Express framework.
const express = require("express");

// Create an Express application.
const app = express();

// Use EJS to render templates into HTML.
app.set("view engine", "ejs");

// Optionally use a custom templates folder instead of the default "views" folder.
// app.set("views", "myviews");

// Start the server on port 3000.
app.listen(3000);

// Without next() or a response, this middleware logs the request but leaves it waiting.
// app.use((req, res) => {
//   console.log("new request made");
//   console.log("host: ", req.hostname);
//   console.log("path: ", req.path);
//   console.log("method: ", req.method);
// });

// Log the request, then call next() so Express can continue to the next matching handler.
app.use((req, res, next) => {
  console.log("new request made");
  console.log("host: ", req.hostname);
  console.log("path: ", req.path);
  console.log("method: ", req.method);
  next();
});

// Run after the previous middleware calls next(), then pass control onward with next().
app.use((req, res, next) => {
  console.log("the next middleware");
  next();
});



// Respond to GET requests for the homepage.
app.get("/", (req, res) => {
  const blogs = [
    { title: "Yoshi finds eggs", snippet: "A little curiosity leads Yoshi to a colourful discovery." },
    { title: "Mario finds stars", snippet: "Every star marks another small adventure completed." },
    { title: "How to turtle pace", snippet: "Take your time, understand each step, and keep moving. 🐢" }
  ];
  res.render("index", {
    title: "Home",
    // Shorthand for blogs: blogs because the property and variable names match.
    blogs
  });
});

// Render views/about.ejs into HTML and send it to the browser.
app.get("/about", (req, res) => {
  // res.render("about");
  res.render("about", {
    title: "About"
  })
});

// Render the create-blog page for GET requests to /blogs/create.
app.get("/blogs/create", (req, res) => {
  // res.render("create");
  res.render("create", {
    title: "Create a new Blog"
  })
});

// Send the 404 page with status 404 for unmatched requests. Keep this after all routes.
// Render views/404.ejs into HTML and send it to the browser.
app.use((req, res) => {
  //  res.status(404).render("404");
  res.status(404).render("404", {
    title: "404"
  });
});