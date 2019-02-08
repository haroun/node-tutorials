// Add task
// addTask :: {id: String, name: String, dueDate: Date} -> Command
const addTask = ({id, name, dueDate}) => ({
  action: 'add-task',
  data: {
    id,
    name,
    dueDate
  }
})

// Remove task
// removeTask :: {id: String} -> Command
const removeTask = ({id}) => ({
  action: 'remove-task',
  data: {
    id
  }
})
// Complete task
// completeTask :: {id: String} -> Command
const completeTask = ({id}) => ({
  action: 'complete-task',
  data: {
    id
  }
})

// Change task due date
// changeTaskDueDate :: {id: String, dueDate: Date} -> Command
const changeTaskDueDate = ({id, dueDate}) => ({
  action: 'change-task-due-date',
  data: {
    id,
    dueDate
  }
})

// Clear all tasks
// clearAllTasks :: () -> Command
const clearAllTasks = () => ({
  action: 'clear-all-tasks',
  data: {}
})

module.exports.addTask = addTask
module.exports.removeTask = removeTask
module.exports.completeTask = completeTask
module.exports.changeTaskDueDate = changeTaskDueDate
module.exports.clearAllTasks = clearAllTasks
