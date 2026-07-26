const fixThisClass = require('../fixThisClass')
const nothisAll = require('../nothisAll')

describe('fixThisClass', () => {
  class Cat {
    constructor() {
      this.sound = 'meow'
      fixThisClass(this)
    }
    speak(ctx) {
      return ctx.sound
    }
  }

  test('prototype methods receive the instance as first argument', () => {
    const cat = new Cat()
    expect(cat.speak()).toBe('meow')
  })

  test('methods destructured from ctx keep their context', () => {
    class Dog {
      constructor() {
        this.sound = 'woof'
        fixThisClass(this)
      }
      speak(ctx) {
        return ctx.sound
      }
      run(ctx) {
        const { speak } = ctx
        return speak()
      }
    }
    const dog = new Dog()
    expect(dog.run()).toBe('woof')
  })

  test('nothisAll remains a working alias', () => {
    expect(nothisAll).toBe(fixThisClass)
  })
})
