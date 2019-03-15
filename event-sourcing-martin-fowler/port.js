const AT_SEA = 'at sea'

const port = (name, country) => {
  return {
    get name() {
      return name
    },
    get country() {
      return country
    }
  }
}

module.exports = port
module.exports.AT_SEA = port(AT_SEA, null)
