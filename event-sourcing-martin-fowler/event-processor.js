const eventProcessor = () => {
  const log = []

  const process = event => {
    event.process()
    log.push(event)
  }

  return {
    process
  }
}

module.exports = eventProcessor
