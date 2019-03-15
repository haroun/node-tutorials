const test = require('tape')
const country = require('./country')
const port = require('./port')
const ship = require('./ship')
const cargo = require('./cargo')
const event = require('./event')
const eventProcessor = require('./event-processor')

const setup = () => {
  const fixtures = {}

  fixtures.eProcessor = eventProcessor()
  fixtures.refactoring = cargo('refactoring')
  fixtures.kingRoy = ship('King Roy')
  fixtures.sanFrancisco = port('San Francisco', country.US)
  fixtures.losAngeles = port('Los Angeles', country.US)
  fixtures.vancouver = port('Vancouver', country.CANADA)

  return fixtures
}

const teardown = fixtures => {
  delete fixtures.refactoring
  delete fixtures.kingRoy
  delete fixtures.sanFrancisco
  delete fixtures.losAngeles
  delete fixtures.vancouver
}

test('arrival sets ships location', assert => {
  const fixtures = setup()
  const {eProcessor, sanFrancisco, kingRoy} = fixtures

  eProcessor.process(event.arrivalEvent(Date.parse('2005/11/01'), sanFrancisco, kingRoy))

  const message = 'should put the ship location to the last arrival location'

  const actual = kingRoy.port
  const expected = sanFrancisco

  assert.deepEqual(actual, expected, message)

  teardown(fixtures)
  assert.end()
})

test('departure puts ship out to sea', assert => {
  const fixtures = setup()
  const {eProcessor, losAngeles, sanFrancisco, kingRoy} = fixtures

  eProcessor.process(event.arrivalEvent(Date.parse('2005/10/01'), losAngeles, kingRoy))
  eProcessor.process(event.arrivalEvent(Date.parse('2005/11/01'), sanFrancisco, kingRoy))
  eProcessor.process(event.departureEvent(Date.parse('2005/11/01'), sanFrancisco, kingRoy))

  const message = 'should put the ship port at sea'

  const actual = kingRoy.port
  const expected = port.AT_SEA

  assert.deepEqual(actual, expected, message)

  teardown(fixtures)
  assert.end()
})

test('visiting Canada marks cargo', assert => {
  const fixtures = setup()
  const {eProcessor, refactoring, vancouver, sanFrancisco, kingRoy} = fixtures

  eProcessor.process(event.loadEvent(Date.parse('2005/11/01'), refactoring, kingRoy))
  eProcessor.process(event.arrivalEvent(Date.parse('2005/11/02'), vancouver, kingRoy))
  eProcessor.process(event.departureEvent(Date.parse('2005/11/03'), vancouver, kingRoy))
  eProcessor.process(event.arrivalEvent(Date.parse('2005/11/04'), sanFrancisco, kingRoy))
  eProcessor.process(event.unloadEvent(Date.parse('2005/11/05'), refactoring, kingRoy))

  const message = 'should mark the cargo with Canada'

  const actual = refactoring.hasBeenInCanada
  const expected = true

  assert.equal(actual, expected, message)

  teardown(fixtures)
  assert.end()
})
