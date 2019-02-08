const {pipe} = require('./functional')
const events = require('./events')

const log = (...args) => console.log('console handler says:', ...args)
const query = (...args) => console.log(...args)

const handleEventToConsole = event => {
  switch (event.name) {
  case events.taskAdded.name:
    log(`hurray, we have a task ${event.data.name}`)
    break
  case events.taskCompleted.name:
    log(`task with id ${event.data.id} is completed`)
    break
  case events.allTasksCleared.name:
    log('...and now they are all gone')
    break
  default:
    break
  }

  return event
}

const handleEventToSql = event => {
  switch (event.name) {
  case events.taskAdded.name:
    query('insert into task values (:id, :name, :dueDate, :isComplete)', event.data)
    break
  case events.taskCompleted.name:
    query('update task set name=:name, dueDate=:dueDate', event.data)
    break
  case events.allTasksCleared.name:
    query('truncate task')
    break
  default:
    break
  }

  return event
}

const handle = pipe(
  handleEventToConsole,
  handleEventToSql
)

module.exports.handle = handle
