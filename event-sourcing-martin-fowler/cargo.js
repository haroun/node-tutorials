const country = require('./country')

const cargo = name => {
  let port = null
  let hasBeenInCanada = false

  const handleArrival = event => {
    if (country.CANADA === event.port.country) {
      hasBeenInCanada = true
    }
  }

  const handleLoad = event => {
    event.priorPort = port
    port = null
    const {ship} = event
    ship.handleLoad(event)
  }

  return {
    get name() {
      return name
    },
    get hasBeenInCanada() {
      return hasBeenInCanada
    },
    handleArrival,
    handleLoad
  }
}

const find = code => cargo(code)

module.exports = cargo
module.exports.find = find
