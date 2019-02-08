const domain = require('./domain')
const commandHandler = require('./command-handler')
const eventHandler = require('./event-handler')

// Aggregate
// aggregate :: () -> aggregate {init i, execute e, apply a}
//   init :: () -> state
//   execute :: state -> command -> state
//   apply :: state -> event -> [event]

// Task aggregate
// taskAggregate  :: () -> aggregate
const taskAggregate = {
  init: domain.init,
  execute: commandHandler.execute,
  apply: eventHandler.apply
}

module.exports.taskAggregate = taskAggregate
