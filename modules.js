// Import the whole exported value without destructuring.
// const xyz = require("./people");
// console.log(xyz);

// console.log(people); // people is not defined; the imported value is named xyz.

// import multiple things
const { people, ages } = require("./people");


console.log(people, ages);

// Import built-in module
const os = require("os");
// console.log(os);
// console.log(os.platform(), os.homedir());
console.log(os.platform());
console.log(os.homedir());