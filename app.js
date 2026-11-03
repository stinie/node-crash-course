// Import the Express framework.
const express = require("express");

// Import Morgan, a middleware library for logging HTTP requests.
const morgan = require("morgan");

// Import Mongoose to connect to MongoDB and work with schemas and models.
const mongoose = require("mongoose");

// Import the blogRoutes module, which defines routes for handling blog-related requests.
const blogRoutes = require("./routes/blogRoutes");

// Create an Express application.
const app = express();

// // Load local environment variables from .env.
process.loadEnvFile();

// Read the MongoDB connection URI from the environment.
const dbURI = process.env.MONGODB_URI;

// Connect to node-crash-course, then start the server on port 3000.
mongoose.connect(dbURI, { dbName: "node-crash-course" })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// Use EJS to render templates into HTML.
app.set("view engine", "ejs");

// Serve files from "public" at the site root, so public/styles.css is available at /styles.css.
app.use(express.static("public"));

// Parse URL-encoded bodies (form submissions) into req.body.
app.use(express.urlencoded({ extended: true })); 

// Log HTTP requests using Morgan's minimal "tiny" format.
app.use(morgan("tiny"));

// Redirect homepage requests to /blogs.
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

// Render views/about.ejs into HTML and send it to the browser.
app.get("/about", (req, res) => {
  // res.render("about");
  res.render("about", {
    title: "About"
  })
});

// Scope all blog routes under the /blogs URL prefix.
app.use("/blogs", blogRoutes);

// Send the 404 page with status 404 for unmatched requests. Keep this after all routes.
// Render views/404.ejs into HTML and send it to the browser.
app.use((req, res) => {
  //  res.status(404).render("404");
  res.status(404).render("404", {
    title: "404"
  });
});