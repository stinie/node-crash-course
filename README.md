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