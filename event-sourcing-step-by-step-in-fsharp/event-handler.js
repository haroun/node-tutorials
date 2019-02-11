const assert = require('assert').strict
const domain = require('./domain')

const addTask = state => event => {
  const task = domain.task({...event.data, isComplete: false})

  return {...state, tasks: state.tasks.concat(task)}
}

const removeTask = state => event => {
  const newTasks = state.tasks.filter(task => task.id !== event.data.id)

  return {...state, tasks: newTasks}
}

const clearAllTasks = state => ({...state, tasks: []})

const completeTask = state => event => {
  const newTasks = state.tasks.map(task =>
    task.id === event.data.id
      ? {...task, isComplete: true}
      : task
  )

  return {...state, tasks: newTasks}
}

const changeTaskDueDate = state => event => {
  const newTasks = state.tasks.map(task =>
    task.id === event.data.id
      ? {...task, dueDate: event.data.dueDate}
      : task
  )

  return {...state, tasks: newTasks}
}

const apply = state => event =>
  // FIXME use constants for command name matching
  event.name === 'task-added'
    ? addTask(state)(event)
    : event.name === 'task-removed'
    ? removeTask(state)(event)
    : event.name === 'all-tasks-cleared'
    ? clearAllTasks(state)
    : event.name === 'task-completed'
    ? completeTask(state)(event)
    : event.name === 'task-due-date-changed'
    ? changeTaskDueDate(state)(event)
    : assert.fail('event not found')

module.exports.apply = apply
