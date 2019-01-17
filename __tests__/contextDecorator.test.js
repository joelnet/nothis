const context = require('../contextDecorator')

describe('decorator', () => {
  class Cat {
    sound = 'meow'

    @context
    speak(ctx) {
      return ctx.sound
    }

    @context
    speak2 = ctx => ctx.sound
  }

  test('decorates function', () => {
    const expected = 'meow'
    const cat = new Cat()
    const actual = cat.speak()
    expect(actual).toBe(expected)
  })

  test('decorates arrow function', () => {
    const expected = 'meow'
    const cat = new Cat()
    const actual = cat.speak2()
    expect(actual).toBe(expected)
  })
})
