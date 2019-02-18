import test from 'tape'
import {shallowMount} from '@vue/test-utils'
import rating from './rating.vue'

const setup = () => {
  const fixtures = {}
  fixtures.wrapper = shallowMount(rating, {
    propsData: {
      maxStars: 6,
      grade: 3
    }
  })

  return fixtures
}

const teardown = fixtures => {
  fixtures.wrapper.destroy()
}

test('renders a list of stars', assert => {
  const fixtures = setup()

  const message = 'should have class "active" equal to prop.grade'

  const actual = fixtures.wrapper.findAll('.active').length
  const expected = 3

  assert.equal(actual, expected, message)

  assert.end()
  teardown(fixtures)
})

test('user input click', assert => {
  const fixtures = setup()

  const message = 'should add "active" class on inactive star'

  const fourthStar = fixtures.wrapper.findAll('.star').at(3)
  fourthStar.trigger('click')

  const actual = fourthStar.classes().includes('active')
  const expected = true

  assert.equal(actual, expected, message)

  assert.end()
  teardown()
})
