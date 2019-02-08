const store = require('./store')
const {pipe} = require('./functional')
const read = require('./read')
const commands = require('./commands')

const log = prefix => (...args) => console.log(prefix, ...args)
const state = store.create()

const pipeline = command => pipe(
  store.handle(state),
  read.handle
)(command)

const printState = (description = '') =>
  pipe(
    state.getCurrentState,
    log(description.toUpperCase())
  )

const application = {
  run: () => {
    printState('initial')()

    pipeline(commands.addTask({
      id: 'abc',
      name: 'event sourcing step by step',
      dueDate: Date.now() + (24 * 60 * 60 * 1000)
    }))
    printState('after task added')()

    pipeline(commands.completeTask({id: 'abc'}))
    printState('after task completed')()

    pipeline(commands.clearAllTasks())
    printState('after clear')()
  }
}

application.run()
