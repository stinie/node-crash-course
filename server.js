// Import Node.js's built-in http module.
const http = require("http");

// Create a server and run this callback for each incoming request.
const server = http.createServer((req, res) => {
  console.log("Request made");
});

// Listen on localhost:3000 and log when the server is ready.
server.listen(3000, "localhost", () => {
  console.log("Listening for requests on port 3000");
});