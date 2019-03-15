const domainPort = require('./port')

const ship = name => {
  let port = null
  const cargo = []

  const handleDeparture = () => {
    port = domainPort.AT_SEA
  }

  const handleArrival = event => {
    port = event.port

    cargo.forEach(c => c.handleArrival(event))
  }

  const handleLoad = event => {
    cargo.push(event.cargo)
  }

  return {
    get name() {
      return name
    },
    get port() {
      return port
    },
    get cargo() {
      return cargo
    },
    handleDeparture,
    handleArrival,
    handleLoad
  }
}

const find = code => ship(code)

module.exports = ship
module.exports.find = find
