const cargo = require('./cargo')
const ship = require('./ship')

const domainEvent = time => {
  const occured = time
  const recorded = Date.now()

  return {
    get occured() {
      return occured
    },
    get recorded() {
      return recorded
    },
    process: () => {}
  }
}

const departureEvent = (time, port, ship) => {
  const event = {
    ...domainEvent(time),
    get port() {
      return port
    },
    get ship() {
      return ship
    }
  }

  event.process = () => {
    ship.handleDeparture(event)
  }

  return event
}

const arrivalEvent = (time, port, ship) => {
  const event = {
    ...domainEvent(time),
    get port() {
      return port
    },
    get ship() {
      return ship
    }
  }

  event.process = () => {
    ship.handleArrival(event)
  }

  return event
}

const loadEvent = (time, cargo, ship) => {
  let priorPort = null

  const event = {
    ...domainEvent(time),
    get ship() {
      return ship
    },
    get cargo() {
      return cargo
    },
    get priorPort() {
      return priorPort
    },
    set priorPort(port) {
      priorPort = port
    }
  }

  event.process = () => {
    event.cargo.handleLoad(event)
  }

  return event
}

const unloadEvent = time => domainEvent(time)

module.exports.departureEvent = departureEvent
module.exports.arrivalEvent = arrivalEvent
module.exports.loadEvent = loadEvent
module.exports.unloadEvent = unloadEvent
