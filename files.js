// Import Node.js's built-in file system module.
const fs = require("fs");

// Read a file asynchronously.
// Using a missing file, such as ./docs/blog-2.txt, produces an ENOENT error.
fs.readFile("./docs/blog-1.txt", (err, data) => {
  if(err) {
    console.log(err);
    return; // Callback stops after logging an error,
  }
  // console.log(data); // Prints the file contents as a Buffer.
  console.log(data.toString()); // Converts the Buffer to readable text.
})

// Write files asynchronously.
// No error check yet: "File was written" also prints if writing fails.

// Overwrite the contents of an existing file.
fs.writeFile("./docs/blog-1.txt", "Hello, love 🫶", () => {
  console.log("File was written");
}); 

// Create the file if it does not exist; its parent directory must already exist.
fs.writeFile("./docs/blog-2.txt", "Hello, love 🫶", () => {
  console.log("File was written"); 
}); 

// Create or remove a directory.
// existsSync checks synchronously, blocking execution until the check finishes.
// mkdir and rmdir run asynchronously.
// No early returns yet: success messages also print if an operation fails.
if (! fs.existsSync("./assets")) {
  // Create the directory if it does not exist.
  fs.mkdir("./assets", (err) => {
  if(err) {
    console.log(err);
  }
  console.log("Folder created 📂");
});
} else {
  // Remove the directory if it exists and is empty.
  fs.rmdir("./assets", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Folder delted 🗑️");
  })
}

// Delete a file asynchronously if it exists.
// existsSync checks synchronously; unlink removes the file asynchronously.
// No early return yet: the success message also prints if deletion fails.
if (fs.existsSync("./docs/deleteme.txt")) {
  fs.unlink("./docs/deleteme.txt", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("File deleted 🗑️");
  })
}

console.log("Last line 🫷");
