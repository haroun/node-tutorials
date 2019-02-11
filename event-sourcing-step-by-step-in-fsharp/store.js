const assert = require('assert').strict
const {pipe} = require('./functional')
const aggregate = require('./aggregate')
const commands = require('./commands')
const domain = require('./domain')

const create = () => {
  let events = []
  const getEvents = () => events
  const appendEvents = newEvents => {
    events = events.concat(newEvents)

    return events
  }

  return {
    getCurrentState: () => {
      const events = getEvents()
      const state = events.reduce(
        (accumulator, event) => aggregate.taskAggregate.apply(accumulator)(event),
        domain.init()
      )

      return domain.init(state.tasks)
    },
    append: events => appendEvents(events)
  }
}

const validate = command => {
  const isDueDateInTheFuture = command.data.dueDate - Date.now() > 0

  // FIXME use constants for command name matching
  switch (command.action) {
  case 'add-task':
    assert.ok(command.data.name.length, 'Give me some name please!')
    break
  case 'change-task-due-date':
    assert.ok(isDueDateInTheFuture, 'Are you Marty McFly?!')
    break
  default:
    break
  }

  return command
}

const handleCommand = store => command => {
  const currentState = store.getCurrentState()
  const newEvent = aggregate.taskAggregate.execute(currentState)(command)
  store.append(newEvent)

  return newEvent
}

const handle = store => command => pipe(
  validate,
  handleCommand(store)
)(command)

module.exports.create = create
module.exports.handle = handle
