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

## Lesson 3 — Clients & Servers

I created a server with Node.js’s built-in `http` module and listened for requests on `localhost:3000`. Each request runs a callback and logs a message. The server does not send a response yet.

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

## Lesson 6 — Express Apps

I installed Express as a regular dependency and created `app.js` to replace the plain Node server.

I practised handling GET requests with `app.get()`, sending HTML with `res.send()`, and serving HTML files with `res.sendFile()` using `__dirname` as the root.

I added a redirect from `/about-us` to `/about` and placed a catch-all middleware after all routes to send the 404 page with status `404`.

Because I installed nodemon locally, I use `npm run dev` instead of the instructor’s global `nodemon` command. I updated my scripts to run `app.js`:

```json
"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js"
}
```

I deleted `server.js` after replacing its functionality with Express. The earlier implementation remains preserved on previous lesson branches.


## Lesson 7 — View Engines

### Setting up EJS

I installed EJS as a regular dependency:

```bash
npm install ejs
```

I registered it with `app.set("view engine", "ejs")`. Express looks for templates in `views/` by default; I also noted how to configure a different folder.

### Rendering views

I started replacing HTML file responses with `res.render()`, which renders an EJS template into HTML and sends it to the browser.

I added a `/blogs/create` route and a `create.ejs` form with required title, snippet and body fields. The form is displayed only; saving posts comes later.

### Personal touches

I named the site “Christine’s Code Journal” and added a personal tagline and About text to reflect my own learning journey.

### Correcting documentation across branches

I noticed that Lesson 3 was documented on `lesson-3` but missing from later READMEs. I restored the section separately on branches `lesson-4` through `lesson-7`, committing and pushing each correction.

This taught me that updating one branch does not automatically update existing branches. I practised switching branches and chose to repeat the small edit manually rather than use merging or cherry-picking.

### EJS syntax and dynamic titles

I practised using `<% %>` to run JavaScript and `<%= %>` to display a value with a temporary `name` example in `index.ejs`, then removed it.

I now pass a `title` from each route through the second argument of `res.render()` and display it in each EJS template:

```html
<title>Node.js Crash Course | <%= title %></title>
```

I deleted the old HTML files from `views/` and removed earlier commented-out code as I became comfortable with the EJS approach. Previous versions remain preserved in Git.

### Displaying blog data

I created an array of sample blogs in `app.js` and passed it to `index.ejs` through `res.render()`. I learned that `blogs` is shorthand for `blogs: blogs` when the property and variable names match.

In EJS, I used plain JavaScript (“vanilla JavaScript”) to check `blogs.length`, loop with `forEach()`, and show a fallback message when the array is empty.

I displayed each blog’s title and snippet with `<%= %>` and added EJS comments with `<%# %>`. I’m getting used to reading JavaScript mixed with HTML inside the templates.

### Server-side rendering and partials

I learned that EJS processes templates on the server, combining HTML with data and JavaScript logic. The browser receives the resulting HTML.

I moved the shared head, navigation and footer into `views/partials/` and included them in my pages:

```ejs
<%- include("./partials/nav.ejs") %>
```

The `<%- %>` tag outputs HTML without escaping it, allowing the partial’s markup to render correctly.

Using partials reduces duplication: I can update shared content in one place instead of editing every page. I also personalised the footer and credited The Net Ninja’s course.

### Adding shared styles

I typed the code myself while following the tutorial. For this step, I copied the provided CSS from The Net Ninja’s `lesson-7` branch into a `<style>` block in `views/partials/head.ejs`. Earlier, I also copied a long block of sample text for the file and stream exercises.

Every page includes the head partial, so the styles are shared across the site. They add the Noto Serif font, a centred layout, navigation and footer styling, and formatting for the create-blog form.

This completes Lesson 7: my pages now use EJS templates, dynamic data, reusable partials and shared styling.

## Lesson 8 — Middleware

### Middleware order and next()

I learned that middleware runs between an incoming request and its response. Route handlers are middleware too, but match a specific HTTP method and path.

I added custom middleware to log the request’s hostname, path and method. Without sending a response or calling `next()`, it leaves the request waiting.

Calling `next()` passes control to the next matching middleware or route handler. I added a second logger to follow this sequence and understand why registration order matters. My 404 handler stays last to handle unmatched requests.

I kept the version without `next()` commented out as a reminder of what happens when control is not passed onward.

### Third-party middleware: Morgan

I installed Morgan with `npm install morgan` and registered it with `app.use()` to log HTTP requests. I tried its concise `"dev"` and minimal `"tiny"` formats.

I kept my custom logging middleware commented out as a learning reference while replacing it with Morgan.

The installation reported a moderate vulnerability in `minimatch`, a dependency of nodemon. I ran `npm audit` to inspect it and deferred the fix: the suggested `--force` command would downgrade nodemon to an older version with breaking changes. The warning remains unresolved.

### Serving static files

I registered `express.static("public")` with `app.use()` to make files in `public/` accessible to the browser.

I moved the CSS from the shared head partial into `public/styles.css` and linked it with `href="/styles.css"`. The URL leaves out `public` because Express uses that folder as the root for static files.

This completes Lesson 8: I practised custom middleware, `next()`, request logging with Morgan, and serving static files with Express.

## Lesson 9 — MongoDB

### Setting up MongoDB Atlas

I used my existing Atlas account, enabled email MFA, and created a free cluster named `node-crash-course` on AWS in Frankfurt.

The current Atlas interface differs from the tutorial. Automatic security setup added my IP address and created an administrator database user. I then created a separate application user, `node-crash-course-user`, with `readWrite` access limited to the `node-crash-course` database.

I created that database with an empty `blogs` collection. I also renamed the downloaded credentials file to `.env` and confirmed that Git ignores it using `git check-ignore .env`.

### Connecting with Mongoose

I installed Mongoose with `npm install mongoose` and used `mongoose.connect(dbURI)` to connect successfully to Atlas.

I moved `app.listen(3000)` into `.then()` so the server starts only after the database connection succeeds, and added `.catch()` to log connection errors. My version did not show the tutorial’s deprecation warnings, so I did not add its older connection options.

### Creating a schema and model

In `models/blog.js`, I defined a schema with three required string fields: `title`, `snippet` and `body`. Setting `timestamps: true` adds automatic `createdAt` and `updatedAt` fields.

I created the model with `mongoose.model("Blog", blogSchema)`, exported it, and imported it into `app.js`. The `Blog` model works with the `blogs` collection.

### Practising database operations

I started a temporary `/add-blog` route that creates a blog document and calls `blog.save()`. The promise’s `.then()` sends the saved document back to the browser. I also learned that `.catch()` belongs on the promise chain after `.then()`, rather than on `res.send()`.

### Selecting the database and saving a blog

I saved my first blog with `blog.save()` and sent the saved document to the browser.

At first, Atlas refused the insert into `test.blogs`. The tutorial specifies the database inside its connection string; mine had no database name, so it defaulted to `test`. My application user only has read/write access to `node-crash-course`.

I selected the database explicitly:

```js
mongoose.connect(dbURI, { dbName: "node-crash-course" })
```

I also corrected the promise chain: `.catch()` follows `.then()` to handle save errors. Catching an error prevents an unhandled rejection; it does not fix the underlying database problem.

### Keeping credentials outside the code

I replaced the hardcoded connection string with `process.env.MONGODB_URI` and used Node.js’s built-in `process.loadEnvFile()` to load it from my local `.env` file.

The connection uses my application user’s credentials. `.env` is ignored by Git, so I can commit the code without including those credentials. The server starts on port 3000 after the database connection succeeds.

### Inspecting saved documents

I inspected my saved blogs in Atlas. Refreshing `/add-blog` created another document with the same content, but a different `_id` and timestamps. Each visit to this practice route saves a new blog.

I also learned that inserting into a missing collection can create it automatically, provided the user has permission. Collection names need care: Mongoose uses `blogs` for the `Blog` model by default.

### Retrieving blogs with the model

I added `/all-blogs` using `Blog.find()` to retrieve all blog documents and send them to the browser as JSON.

`Blog` is the model; `blog = new Blog(...)` is one document instance. `blog.save()` saves that document, while `Blog.find()` queries the collection.

I then added `/single-blog` using `Blog.findById()`. My documents use MongoDB ObjectIds; Mongoose converts a valid ID string when querying. I replaced the example ID with an actual `_id` from my collection and successfully retrieved one blog.

### Building debugging confidence

I practised following my intuition and checking the result. I also learned that `node --check app.js` produces no output when the syntax check passes. The earlier syntax error and the example ID were separate issues.

I started using code completion near the end of Lesson 9, while writing the /single-blog route. This helped me practise checking suggestions against my own data and understanding.

### Rendering blogs from MongoDB

I replaced the sample blog array with documents retrieved from MongoDB. The homepage now redirects to `/blogs`, where `Blog.find()` fetches the blogs and passes them to `index.ejs` for rendering.

I added `.sort({ createdAt: -1 })` to display the newest blogs first. The value `-1` means descending order.

I removed the temporary `/add-blog`, `/all-blogs` and `/single-blog` practice routes. Their code remains preserved in earlier Git commits.

## Lesson 10 - Get, Post & Delete Requests

### What I learned

- **HTTP methods:** The same route can handle different requests. The method determines the action (`GET`, `POST`, `DELETE`).
- **Route parameters:** `/blogs/:id` identifies a specific blog dynamically.
- **HTML forms:** `action` defines the destination, `method` the request type, and `name` identifies the submitted fields.
- **Middleware:** `express.urlencoded()` parses form submissions into `req.body`. Without it, `req.body` would be `undefined` in this example.

### Connection to my Timeline

I recognized that I'm already using `POST` to create and delete posts.

**To revisit:** Explore replacing the POST-based deletion with an HTTP `DELETE` request, keeping in mind that HTML forms don't support DELETE directly.

