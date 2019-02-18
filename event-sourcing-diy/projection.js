const domain = require('./domain')
const {pipe} = require('./functional')

// Projection
// initialize :: state -> state
// update :: state -> event -> state
const projection = ({initialize, update}) => ({
  initialize,
  update
})

const project = (projection, events) =>
  events.reduce(projection.update, projection.initialize)

const soldOfFlavour = flavour => state =>
  (state && state[flavour]) || 0

const updateSoldFlavours = (state, event) => {
  const {flavour} = event.payload

  return event.name === domain.flavourSold().name
    ? pipe(
      soldOfFlavour(flavour),
      portions => ({...state, [flavour]: portions + 1})
    )(state)
    : state
}

const soldFlavours = projection({
  initialize: [],
  update: updateSoldFlavours
})

module.exports.project = project
module.exports.soldFlavours = soldFlavours
module.exports.soldOfFlavour = soldOfFlavour
