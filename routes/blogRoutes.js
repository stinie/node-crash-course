// Import Express to create the router.
const express = require("express");

// Create an Express router to handle related routes.
const router = express.Router();

// Import the controller functions that handle blog requests.
const blogController = require("../controllers/blogController");

// Define blog routes and delegate requests to their controller functions.
router.get("/create", blogController.blog_create_get);
router.get("/", blogController.blog_index);
router.post("/", blogController.blog_create_post);
router.get("/:id", blogController.blog_details);
router.delete("/:id", blogController.blog_delete);

module.exports = router;