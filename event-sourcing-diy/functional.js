// Create a pipeline of functions to iterate over left to right
// pipe(...functions: [...Function]) => initial => result
const pipe = (...functions) => initial =>
  functions.reduce((accumulator, current) => current(accumulator), initial)

module.exports.pipe = pipe
