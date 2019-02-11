const assert = require('assert').strict
const {pipe} = require('./functional')
const commands = require('./commands')
const events = require('./events')

const onlyIfTaskDoesNotAlreadyExists = state => id => {
  const task = state.tasks.find(task => task.id === id)
  assert.equal(task, undefined, 'Task already exists')

  return state
}

const onlyIfTaskExists = state => id => {
  const task = state.tasks.find(task => task.id === id)
  assert.ok(task, 'Task does not exists')

  return task
}

const onlyIfNotAlreadyFinished = task => {
  assert.equal(task.isComplete, false, 'Task already finished')

  return task
}

const execute = state => command => {
  // FIXME use constants for command name matching
  const event = command.action === 'add-task'
    ? onlyIfTaskDoesNotAlreadyExists(state)(command.data.id) && events.taskAdded(command.data)
    : command.action === 'remove-task'
    ? onlyIfTaskExists(state)(command.data.id) && events.taskRemoved(command.data)
    : command.action === 'clear-all-tasks'
    ? events.allTasksCleared(command.data)
    : command.action === 'complete-task'
    ? onlyIfTaskExists(state)(command.data.id) && events.taskCompleted(command.data)
    : command.action === 'change-task-due-date'
    ? pipe(onlyIfTaskExists(state), onlyIfNotAlreadyFinished)(command.data.id) && events.taskDueDateChanged(command.data)
    : assert.fail('command not found')

  return event
}

module.exports.execute = execute
