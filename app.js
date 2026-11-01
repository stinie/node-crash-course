// Import the Express framework.
const express = require("express");

// Import Morgan, a middleware library for logging HTTP requests.
const morgan = require("morgan");

// Import Mongoose to connect to MongoDB and work with schemas and models.
const mongoose = require("mongoose");

// Import the Blog model to create and query blog documents in MongoDB.
const Blog = require("./models/blog");

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


// Temporary routes for practising MongoDB operations with Mongoose.
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "Small steps into MongoDB",
    snippet: "Connecting my code journal to a database, one step at a time.",
    body: "Today I created a blog schema and model with Mongoose. After practising with sample arrays, I’m learning to store my blog posts in MongoDB. There are many new concepts, so I’m taking my time to understand each step. 🐢"
  });

  blog.save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });

});


// Use EJS to render templates into HTML.
app.set("view engine", "ejs");

// Optionally use a custom templates folder instead of the default "views" folder.
// app.set("views", "myviews");


// Serve files from "public" at the site root, so public/styles.css is available at /styles.css.
app.use(express.static("public"));


// Log HTTP requests using Morgan's concise "dev" format.
// app.use(morgan("dev"));

// Log HTTP requests using Morgan's minimal "tiny" format.
app.use(morgan("tiny"));

// Without next() or a response, this middleware logs the request but leaves it waiting.
// app.use((req, res) => {
//   console.log("new request made");
//   console.log("host: ", req.hostname);
//   console.log("path: ", req.path);
//   console.log("method: ", req.method);
// });

// Log the request, then call next() so Express can continue to the next matching handler.
// app.use((req, res, next) => {
//   console.log("new request made");
//   console.log("host: ", req.hostname);
//   console.log("path: ", req.path);
//   console.log("method: ", req.method);
//   next();
// });

// Run after the previous middleware calls next(), then pass control onward with next().
// app.use((req, res, next) => {
//   console.log("the next middleware");
//   next();
// });



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