// Import Node.js's built-in http module.
const http = require("http");

// Create a server and run this callback for each incoming request.
const server = http.createServer((req, res) => {
  // console.log("Request made");
  // console.log(req);
  console.log(req.url, req.method);

  // Set the response content type.
  // res.setHeader("Content-Type", "text/plain");
  res.setHeader("Content-Type", "text/html");

  // Write a plain-text response.
  // res.write("Hello, turtle");

  // Write an HTML response.
  res.write("<head><link rel='stylesheet' href='#'></head>");
  res.write("<p>Hello, turtle</p>");
  res.write("<p>Hello, again turtle</p>");

  // End the response.
  res.end();
});

// Listen on localhost:3000 and log when the server is ready.
server.listen(3000, "localhost", () => {
  console.log("Listening for requests on port 3000");
});