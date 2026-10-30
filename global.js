// Global object

// console.log(global);

// global.setTimeout(() => {
//   console.log("In the timeout");
// });

setTimeout(() => {
  console.log("In the timeout");
  clearInterval(int);
}, 3000);

const int = setInterval(() => {
  console.log("In the interval");
}, 1000);


console.log(__dirname);
console.log(__filename);

// ReferenceError: document is not defined
// Document is in the window object
// We don't have that in the global namespace of Node.js
// console.log(document.querySelector);