// Import Node.js's built-in file system module.
const fs = require("fs");

// Without an encoding, chunks are Buffers.
// const readStream = fs.createReadStream("./docs/blog-3.txt");

// Read chunks as UTF-8 text.
const readStream = fs.createReadStream("./docs/blog-3.txt", {
  encoding: "utf8"
});

// Create the output file if missing, or overwrite it if it exists.
// The parent directory must already exist.
const writeStream = fs.createWriteStream("./docs/blog-4.txt");

// Listen for data chunks and write each one manually.
// readStream.on("data", (chunk) => {
//   console.log("--- NEW CHUNK ---");
//   console.log(chunk); // Already text because UTF-8 encoding is set.
//   writeStream.write("\nNEW CHUNK\n");
//   writeStream.write(chunk);
// });

// Pipe chunks directly from the readable stream to the writable stream.
// Automatically manage the flow and end the writable stream when reading finishes.
readStream.pipe(writeStream);