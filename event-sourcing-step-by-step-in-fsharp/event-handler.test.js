const test = require('tape')
const eventHandler = require('./event-handler')

test('add task', assert => {
  const message = 'should add task to a new state'

  const initialState = {tasks: []}
  const event = {
    name: 'task-added',
    data: {id: 'abc', name: 'test', dueDate: 1}
  }

  const actual = eventHandler.apply(initialState)(event)
  const expected = {
    tasks: [
      {id: 'abc', name: 'test', dueDate: 1, isComplete: false}
    ]
  }

  assert.deepEqual(actual, expected, message)
  assert.notDeepEqual(actual.tasks, initialState.tasks, 'should not mutate initial state')

  assert.end()
})

test('remove task', assert => {
  const message = 'should remove one task'

  const initialState = {
    tasks: [
      {id: 'abc', name: 'test', dueDate: 1, isComplete: false}
    ]
  }
  const event = {
    name: 'task-removed',
    data: {id: 'abc'}
  }

  const actual = eventHandler.apply(initialState)(event)
  const expected = {
    tasks: []
  }

  assert.deepEqual(actual, expected, message)
  assert.notDeepEqual(actual.tasks, initialState.tasks, 'should not mutate initial state')

  assert.end()
})

test('clear all tasks', assert => {
  const message = 'should remove all tasks'

  const initialState = {
    tasks: [
      {id: 'abc', name: 'test', dueDate: 1, isComplete: false},
      {id: 'def', name: 'toast', dueDate: 2, isComplete: false}
    ]
  }
  const event = {
    name: 'all-tasks-cleared',
    data: {}
  }

  const actual = eventHandler.apply(initialState)(event)
  const expected = {
    tasks: []
  }

  assert.deepEqual(actual, expected, message)
  assert.notDeepEqual(actual.tasks, initialState.tasks, 'should not mutate initial state')

  assert.end()
})

test('complete task', assert => {
  const message = 'should mark the task as complete'

  const initialState = {
    tasks: [
      {id: 'abc', name: 'test', dueDate: 1, isComplete: false},
      {id: 'def', name: 'toast', dueDate: 2, isComplete: false}
    ]
  }
  const event = {
    name: 'task-completed',
    data: {id: 'def'}
  }

  const actual = eventHandler.apply(initialState)(event)
  const expected = {
    tasks: [
      {id: 'abc', name: 'test', dueDate: 1, isComplete: false},
      {id: 'def', name: 'toast', dueDate: 2, isComplete: true}
    ]
  }

  assert.deepEqual(actual, expected, message)
  assert.notDeepEqual(actual.tasks, initialState.tasks, 'should not mutate initial state')

  assert.end()
})

test('change task due date', assert => {
  const message = 'should update the task due date'

  const initialState = {
    tasks: [
      {id: 'abc', name: 'test', dueDate: 1, isComplete: false},
      {id: 'def', name: 'toast', dueDate: 2, isComplete: false}
    ]
  }
  const event = {
    name: 'task-due-date-changed',
    data: {id: 'def', dueDate: 7}
  }

  const actual = eventHandler.apply(initialState)(event)
  const expected = {
    tasks: [
      {id: 'abc', name: 'test', dueDate: 1, isComplete: false},
      {id: 'def', name: 'toast', dueDate: 7, isComplete: false}
    ]
  }

  assert.deepEqual(actual, expected, message)
  assert.notDeepEqual(actual.tasks, initialState.tasks, 'should not mutate initial state')

  assert.end()
})

test('error: handle unknown event', assert => {
  const message = 'should throw an error'

  const initialState = {}
  const event = {}

  try {
    eventHandler.apply(initialState)(event)
  } catch (error) {
    const actual = error.message
    const expected = 'event not found'

    assert.equal(actual, expected, message)
    assert.end()

    return
  }

  assert.fail(message)
  assert.end()
})
