const test = require('tape')
const store = require('./store')

test('create initial state', assert => {
  const message = 'should create a state with no tasks'

  const currentStore = store.create()

  const actual = currentStore.getCurrentState()
  const expected = {
    tasks: []
  }

  assert.deepEqual(actual, expected, message)

  assert.end()
})

test('create append single event', assert => {
  const message = 'should have the latest added task in the state'

  const currentStore = store.create()
  currentStore.append({
    name: 'task-added',
    data: {id: 'abc', name: 'test', dueDate: 1}
  })

  const actual = currentStore.getCurrentState()
  const expected = {
    tasks: [
      {id: 'abc', name: 'test', dueDate: 1, isComplete: false}
    ]
  }

  assert.deepEqual(actual, expected, message)

  assert.end()
})

test('create append multiple events', assert => {
  const message = 'should have the latest added task in the state'

  const currentStore = store.create()
  currentStore.append([
    {
      name: 'task-added',
      data: {id: 'abc', name: 'test', dueDate: 1}
    },
    {
      name: 'task-added',
      data: {id: 'def', name: 'toast', dueDate: 2}
    },
    {
      name: 'task-completed',
      data: {id: 'abc'}
    }
  ])

  const actual = currentStore.getCurrentState()
  const expected = {
    tasks: [
      {id: 'abc', name: 'test', dueDate: 1, isComplete: true},
      {id: 'def', name: 'toast', dueDate: 2, isComplete: false}
    ]
  }

  assert.deepEqual(actual, expected, message)

  assert.end()
})

test('handle', assert => {
  const message = 'should append new event'

  const currentStore = store.create()

  const actual = store.handle(currentStore)({
    action: 'add-task',
    data: {id: 'abc', name: 'test', dueDate: 1}
  })
  const expected = {
    name: 'task-added',
    data: {id: 'abc', name: 'test', dueDate: 1}
  }

  assert.deepEqual(actual, expected, message)

  assert.end()
})

test('error: trying to add a task without a name', assert => {
  const message = 'should require a task name'

  const currentStore = store.create()

  try {
    store.handle(currentStore)({
      action: 'add-task',
      data: {id: 'abc', name: '', dueDate: 1}
    })
  } catch (error) {
    const actual = error.message
    const expected = 'Give me some name please!'

    assert.equal(actual, expected, message)
    assert.end()

    return
  }

  assert.fail(message)
  assert.end()
})

test('error: trying to change due date in the past', assert => {
  const message = 'should require a due date in the future'

  const currentStore = store.create()
  currentStore.append([
    {
      name: 'task-added',
      data: {id: 'abc', name: 'test', dueDate: 1}
    },
    {
      name: 'task-added',
      data: {id: 'def', name: 'toast', dueDate: 2}
    }
  ])

  try {
    store.handle(currentStore)({
      action: 'change-task-due-date',
      data: {id: 'def', dueDate: 1}
    })
  } catch (error) {
    const actual = error.message
    const expected = 'Are you Marty McFly?!'

    assert.equal(actual, expected, message)
    assert.end()

    return
  }

  assert.fail(message)
  assert.end()
})
