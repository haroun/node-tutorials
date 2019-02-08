// Create task
// task :: {id: String, name: String, dueDate: Date} -> Task
const task = ({id, name, dueDate}) => ({
  id,
  name,
  dueDate,
  isComplete: false
})

// State init
// state :: Array -> {tasks: [Task]}
const init = (tasks = []) => ({
  tasks
})

module.exports.task = task
module.exports.init = init
