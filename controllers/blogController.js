// Import the Blog model to create and query blog documents in MongoDB.
const Blog = require("../models/blog");


// Retrieve blogs newest first and render them in the index template.
const blog_index = (req, res) => {
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
};

// Render the create-blog page for GET requests to /create.
const blog_create_get =  (req, res) => {
  // res.render("create");
  res.render("create", {
    title: "Create a new Blog"
  })
};

// Handle POST requests to create a new blog.
const blog_create_post = (req, res) => {
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
};

// Retrieve a specific blog by its ID and render the details page.
const blog_details = (req, res) => {
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
};

// Delete a specific blog by its ID and return a redirect URL.
const blog_delete = (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
};


module.exports = {
  blog_index,
  blog_create_get,
  blog_create_post,
  blog_details,
  blog_delete
};