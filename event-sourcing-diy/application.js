const domain = require('./domain')
const inMemoryEventStore = require('./in-memory-event-store')
const helper = require('./helper')
const projection = require('./projection')
// const {pipe} = require('./functional')

const run = () => {
  const eventStore = inMemoryEventStore.initialize()
  eventStore.append([domain.flavourRestocked(domain.flavour.vanilla, 3)])
  eventStore.append([domain.flavourSold(domain.flavour.vanilla)])
  eventStore.append([domain.flavourSold(domain.flavour.vanilla)])
  eventStore.append([domain.flavourSold(domain.flavour.vanilla), domain.flavourWentOutOfStock(domain.flavour.vanilla)])
  eventStore.append([domain.flavourSold(domain.flavour.strawberry)])

  const events = eventStore.get()

  // Using pipe
  // pipe(
  //   eventStore.get,
  //   helper.printEvents
  // )()

  helper.printEvents(events)

  const sold = projection.project(
    projection.soldFlavours,
    events
  )

  helper.printSoldFlavour(domain.flavour.vanilla)(sold)
  helper.printSoldFlavour(domain.flavour.strawberry)(sold)
}

run()
