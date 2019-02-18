const {pipe} = require('./functional')

const eventStore = (history = []) => ({
  get: () => history,
  append: events => history.concat(events)
})

const initialize = ({get, append}) => {
  const myEventStore = eventStore()

  return {
    get: pipe(myEventStore.get, get),
    append: pipe(myEventStore.append, append)
  }
}

module.exports.initialize = initialize
