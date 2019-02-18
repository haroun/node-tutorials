const infrastructure = require('./infrastructure')

const initialize = () => {
  let history = []

  return infrastructure.initialize({
    get: () => history,
    append: events => {
      history = history.concat(events)

      return events
    }
  })
}

module.exports.initialize = initialize
