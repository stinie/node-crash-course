// Import Express to create the router.
const express = require("express");

// Create an Express router to handle related routes.
const router = express.Router();

// Import the Blog model to create and query blog documents in MongoDB.
const Blog = require("../models/blog");

// Render the create-blog page for GET requests to /blogs/create.
router.get("/blogs/create", (req, res) => {
  // res.render("create");
  res.render("create", {
    title: "Create a new Blog"
  })
});

// Retrieve blogs newest first and render them in the index template.
router.get("/blogs", (req, res) => {
  Blog.find().sort({ createdAt: -1 })
  .then((result) => { 
    res.render("index", {
      title: "All Blogs",
      blogs: result
    })
  })
  .catch((err) => {
    console.log(err);
  });
});

// Handle POST requests to create a new blog.
router.post("/blogs", (req, res) => {
  // Create a new blog document using the Blog model.
  const blog = new Blog(req.body); 

  // Save the blog document to the database.
  blog.save()
    .then((result) => {
      // Redirect to /blogs after successful save.
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});

// Retrieve a specific blog by its ID and render the details page.
router.get("/blogs/:id", (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then((result) => {
      res.render("details", {
        blog: result,
        title: "Blog Details"
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Delete a specific blog by its ID and return a redirect URL.
router.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;