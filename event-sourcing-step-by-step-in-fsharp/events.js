// Task added
// taskAdded :: {id: String, name: String, dueDate: Date} -> Event
const taskAdded = ({id, name, dueDate}) => ({
  name: 'task-added',
  data: {
    id,
    name,
    dueDate
  }
})

// Task removed
// taskRemoved :: {id: String} -> Event
const taskRemoved = ({id}) => ({
  name: 'task-removed',
  data: {
    id
  }
})

// Task completed
// taskCompleted :: {id: String} -> Event
const taskCompleted = ({id}) => ({
  name: 'task-completed',
  data: {
    id
  }
})

// Task due date changed
// taskDueDateChanged :: {id: String, dueDate: Date} -> Event
const taskDueDateChanged = ({id, dueDate}) => ({
  name: 'task-due-date-changed',
  data: {
    id,
    dueDate
  }
})

// All tasks cleared
// allTasksCleared :: () -> Event
const allTasksCleared = () => ({
  name: 'all-tasks-cleared',
  data: {}
})

module.exports.taskAdded = taskAdded
module.exports.taskRemoved = taskRemoved
module.exports.taskCompleted = taskCompleted
module.exports.taskDueDateChanged = taskDueDateChanged
module.exports.allTasksCleared = allTasksCleared
