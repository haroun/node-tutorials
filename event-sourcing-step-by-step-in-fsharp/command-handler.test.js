const test = require('tape')
const commandHandler = require('./command-handler')

test('add task', assert => {
  const message = 'should create a task added event'

  const initialState = {tasks: []}
  const command = {
    action: 'add-task',
    data: {id: 'abc', name: 'test', dueDate: 1}
  }

  const actual = commandHandler.execute(initialState)(command)
  const expected = {
    name: 'task-added',
    data: {id: 'abc', name: 'test', dueDate: 1}
  }

  assert.deepEqual(actual, expected, message)
  assert.notDeepEqual(actual.tasks, initialState.tasks, 'should not mutate initial state')

  assert.end()
})

test('remove task', assert => {
  const message = 'should create a remove task event'

  const initialState = {
    tasks: [
      {id: 'abc', name: 'test', dueDate: 1, isComplete: false}
    ]
  }
  const command = {
    action: 'remove-task',
    data: {id: 'abc'}
  }

  const actual = commandHandler.execute(initialState)(command)
  const expected = {
    name: 'task-removed',
    data: {id: 'abc'}
  }

  assert.deepEqual(actual, expected, message)
  assert.notDeepEqual(actual.tasks, initialState.tasks, 'should not mutate initial state')

  assert.end()
})

test('clear all tasks', assert => {
  const message = 'should create an all tasks cleared event'

  const initialState = {
    tasks: [
      {id: 'abc', name: 'test', dueDate: 1, isComplete: false},
      {id: 'def', name: 'toast', dueDate: 2, isComplete: false}
    ]
  }
  const command = {
    action: 'clear-all-tasks',
    data: {}
  }

  const actual = commandHandler.execute(initialState)(command)
  const expected = {
    name: 'all-tasks-cleared',
    data: {}
  }

  assert.deepEqual(actual, expected, message)
  assert.notDeepEqual(actual.tasks, initialState.tasks, 'should not mutate initial state')

  assert.end()
})

test('complete task', assert => {
  const message = 'should create a task completed event'

  const initialState = {
    tasks: [
      {id: 'abc', name: 'test', dueDate: 1, isComplete: false},
      {id: 'def', name: 'toast', dueDate: 2, isComplete: false}
    ]
  }
  const command = {
    action: 'complete-task',
    data: {id: 'def'}
  }

  const actual = commandHandler.execute(initialState)(command)
  const expected = {
    name: 'task-completed',
    data: {id: 'def'}
  }

  assert.deepEqual(actual, expected, message)
  assert.notDeepEqual(actual.tasks, initialState.tasks, 'should not mutate initial state')

  assert.end()
})

test('change task due date', assert => {
  const message = 'should create an task due date changed event'

  const initialState = {
    tasks: [
      {id: 'abc', name: 'test', dueDate: 1, isComplete: false},
      {id: 'def', name: 'toast', dueDate: 2, isComplete: false}
    ]
  }
  const command = {
    action: 'change-task-due-date',
    data: {id: 'def', dueDate: 7}
  }

  const actual = commandHandler.execute(initialState)(command)
  const expected = {
    name: 'task-due-date-changed',
    data: {id: 'def', dueDate: 7}
  }

  assert.deepEqual(actual, expected, message)
  assert.notDeepEqual(actual.tasks, initialState.tasks, 'should not mutate initial state')

  assert.end()
})

test('error: handle unknown command', assert => {
  const message = 'should throw an error'

  const initialState = {}
  const command = {}

  try {
    commandHandler.execute(initialState)(command)
  } catch (error) {
    const actual = error.message
    const expected = 'command not found'

    assert.equal(actual, expected, message)
    assert.end()

    return
  }

  assert.fail(message)
  assert.end()
})

test('error: trying to add a task that already exists', assert => {
  const message = 'should throw an error'

  const initialState = {
    tasks: [
      {id: 'abc', name: 'test', dueDate: 1, isComplete: false}
    ]
  }
  const command = {
    action: 'add-task',
    data: {id: 'abc', name: 'test', dueDate: 1}
  }

  try {
    commandHandler.execute(initialState)(command)
  } catch (error) {
    const actual = error.message
    const expected = 'Task already exists'

    assert.equal(actual, expected, message)
    assert.end()

    return
  }

  assert.fail(message)
  assert.end()
})

test('error: trying to remove a non existing task', assert => {
  const message = 'should throw an error'

  const initialState = {
    tasks: []
  }
  const command = {
    action: 'remove-task',
    data: {id: 'abc'}
  }

  try {
    commandHandler.execute(initialState)(command)
  } catch (error) {
    const actual = error.message
    const expected = 'Task does not exists'

    assert.equal(actual, expected, message)
    assert.end()

    return
  }

  assert.fail(message)
  assert.end()
})

test('error: trying to complete a non existing task', assert => {
  const message = 'should throw an error'

  const initialState = {
    tasks: []
  }
  const command = {
    action: 'complete-task',
    data: {id: 'abc'}
  }

  try {
    commandHandler.execute(initialState)(command)
  } catch (error) {
    const actual = error.message
    const expected = 'Task does not exists'

    assert.equal(actual, expected, message)
    assert.end()

    return
  }

  assert.fail(message)
  assert.end()
})

test('error: trying to change due date of a non existing task', assert => {
  const message = 'should throw an error'

  const initialState = {
    tasks: []
  }
  const command = {
    action: 'change-task-due-date',
    data: {id: 'abc'}
  }

  try {
    commandHandler.execute(initialState)(command)
  } catch (error) {
    const actual = error.message
    const expected = 'Task does not exists'

    assert.equal(actual, expected, message)
    assert.end()

    return
  }

  assert.fail(message)
  assert.end()
})

test('error: trying to change due date of an already finished task', assert => {
  const message = 'should throw an error'

  const initialState = {
    tasks: [
      {id: 'abc', name: 'test', dueDate: 1, isComplete: true}
    ]
  }
  const command = {
    action: 'change-task-due-date',
    data: {id: 'abc'}
  }

  try {
    commandHandler.execute(initialState)(command)
  } catch (error) {
    const actual = error.message
    const expected = 'Task already finished'

    assert.equal(actual, expected, message)
    assert.end()

    return
  }

  assert.fail(message)
  assert.end()
})
