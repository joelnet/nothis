const clone = require('../utils/clone')

describe('clone', () => {
  test('copies own properties to a new object', () => {
    const source = { sound: 'meow' }
    const copy = clone(source)
    expect(copy).not.toBe(source)
    expect(copy.sound).toBe('meow')
  })

  test('preserves the prototype chain', () => {
    class Cat {
      constructor() {
        this.sound = 'meow'
      }
      speak() {
        return this.sound
      }
    }
    const copy = clone(new Cat())
    expect(copy).toBeInstanceOf(Cat)
    expect(copy.speak()).toBe('meow')
  })

  test('preserves getters', () => {
    const source = {
      get sound() {
        return 'meow'
      }
    }
    const copy = clone(source)
    expect(copy.sound).toBe('meow')
  })

  test('preserves the internal value of boxed primitives', () => {
    expect(clone(Object(1)).valueOf()).toBe(1)
    expect(clone(Object('O')).valueOf()).toBe('O')
    expect(clone(Object(true)).valueOf()).toBe(true)
  })

  test('copied methods are rebindable even when source is frozen', () => {
    const source = Object.freeze({
      sound: 'meow',
      speak: function () {
        return this.sound
      }
    })
    const copy = clone(source)
    copy.speak = copy.speak.bind(copy)
    const speak = copy.speak
    expect(speak()).toBe('meow')
  })

  test('preserves internal slots of Date, RegExp, Map and Set', () => {
    const date = clone(new Date(0))
    expect(date.getTime()).toBe(0)

    const regexp = clone(/meow/g)
    expect(regexp.test('meow')).toBe(true)

    const map = clone(new Map([['sound', 'meow']]))
    expect(map.get('sound')).toBe('meow')

    const set = clone(new Set(['meow']))
    expect(set.has('meow')).toBe(true)
  })

  test('clones arrays as real arrays', () => {
    const copy = clone([1, 2, 3])
    expect(Array.isArray(copy)).toBe(true)
    expect(JSON.stringify(copy)).toBe('[1,2,3]')
  })

  test('returns primitives and null unchanged', () => {
    expect(clone(1)).toBe(1)
    expect(clone('meow')).toBe('meow')
    expect(clone(null)).toBe(null)
    expect(clone(undefined)).toBe(undefined)
  })
})
