# Node Crash Course

My code-along for the Node.js Crash Course on [The Net Ninja YouTube channel](https://www.youtube.com/@NetNinja), as part of my Matrix Master studies.

## Learning goals

- Practise Node.js, Express and MongoDB by coding along.
- Learn to create, switch between and publish Git branches for the first time.

## Approach

The `master` branch contains the initial setup. I’ll create a branch for each lesson, named `lesson-1`, `lesson-2`, and so on, to preserve my progress.

## Lesson 1 — Introduction & Setup

Run a JavaScript file with Node.js from the terminal:

```bash
node test.js
```

The script prints `mario`. This is my first step towards understanding how JavaScript runs outside the browser.

## Lesson 2 — Node.js Basics

### Keeping earlier practice files

I’m keeping `test.js` during Lesson 2 as a record of my code-along practice, even though it is absent from the instructor’s `lesson-2` branch. I may remove it in a later lesson; it will remain preserved on the earlier branches.

### The global object

I practised using Node.js timers and explored `__dirname` and `__filename`. Unlike the browser, Node.js has no built-in `document` object, so browser DOM code does not run here.

### Modules and exports

I practised exporting values with `module.exports` and loading them with `require()`. Without an explicit export, my module returned an empty object `{}`.

I learned to use the whole exported object or destructure individual values, and to load Node.js’s built-in `os` module to read the platform and home directory.


### Working with files and directories

I practised reading, writing and deleting files, and creating and removing directories with Node.js’s `fs` module.

I learned that `existsSync()` checks synchronously, while the callback-based file operations run asynchronously. Missing files can produce `ENOENT`; creating an existing directory can produce `EEXIST`.

Logging an error does not stop a callback. I added an early return when reading files to avoid calling `data.toString()` after a failed read. The other examples still follow the tutorial and can print success messages even when an operation fails.

### Streams

I practised reading and writing files in chunks using streams. UTF-8 encoding gives me readable text instead of Buffers.

I used `pipe()` to pass data from a readable stream to a writable stream. `createWriteStream()` creates the output file if it is missing or overwrites it if it exists.

## Lesson 4 - Requests & Responses

### Inspecting requests and sending HTML

I inspected the request URL and HTTP method, set the response content type, and sent HTML using `res.write()` and `res.end()`.

When running with `node server.js`, I need to restart the server after changing the code.

### Sending an HTML file

I used `fs.readFile()` to read an HTML file asynchronously and send its contents with `res.end(data)`. If reading fails, the server logs the error and ends the response.

### Simple routing

I used a `switch` statement to choose an HTML file based on `req.url`. The homepage and About page have their own routes; other URLs show a 404 page.

### Status codes

I set `res.statusCode` to `200` for the homepage and About page, and `404` for unknown routes. This tells the client the response status alongside the HTML page.

### Redirects

I used status code `301` and the `Location` header to permanently redirect `/about-me` to `/about`.

Working with routing, headers and responses directly in Node.js helps me understand what Express will simplify later.

## Lesson 5 — NPM

I ran `npm init` to create `package.json`, then installed nodemon locally as a development dependency instead of globally:

```bash
npm install nodemon --save-dev
npm i --save lodash
```

The first installation created `package-lock.json` and `node_modules/`, which was already in my `.gitignore`. Lodash is a regular dependency; nodemon is a development tool.

Using knowledge from a previous project, I added scripts: `npm start` runs the server, and `npm run dev` runs it with nodemon to restart automatically after code changes.

When downloading a project or restoring it without `node_modules/`, I can run `npm install` to install the dependencies listed in `package.json`.