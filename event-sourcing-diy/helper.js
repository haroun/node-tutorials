const projection = require('./projection')

const print = (...args) => console.log(...args)
const printEvent = (event, index) => print(index + 1, event)
const printEvents = events => {
  print(`History (length: ${events.length})`)
  events.map(printEvent)
}

const printSoldFlavour = flavour => state =>
  print(`Sold ${flavour}:`, projection.soldOfFlavour(flavour)(state))

module.exports.printEvents = printEvents
module.exports.printSoldFlavour = printSoldFlavour
