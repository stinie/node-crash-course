// Import Mongoose to connect to MongoDB and work with schemas and models.
const mongoose = require("mongoose");

// Get Mongoose's Schema constructor to define the structure of blog documents.
const Schema = mongoose.Schema;

// Create a schema to define the fields and rules for blog documents.
const blogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  snippet: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
}, { timestamps: true });

// Create the Blog model from blogSchema to work with the blogs collection.
const Blog = mongoose.model("Blog", blogSchema);

// Export the Blog model so other files can use it to work with blog documents.
module.exports = Blog;