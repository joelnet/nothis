const nothis = require('../nothis')

describe('nothis', () => {
  const context = {
    test: 'success',
    whoami: function whoami() {
      return this
    },
    whoamiNoThis: nothis(function whoami(context) {
      return context
    }),
    whoamiEs6: nothis(context => context)
  }

  test('this is not changed', () => {
    const expected = 'success'
    const actual = context.whoamiNoThis().test
    expect(actual).toBe(expected)
  })

  test('nothis works with arrow function', () => {
    const expected = 'success'
    const actual = context.whoamiEs6().test
    expect(actual).toBe(expected)
  })

  test('this becomes first argument', () => {
    const expected = 'success'
    const actual = context.whoamiNoThis().test
    expect(actual).toBe(expected)
  })

  test('methods on context cannot be rebound', () => {
    const expected = 'success'
    const myComponent = {
      state: 'success',
      handler: function() {
        return this.state
      },
      render: nothis(ctx => {
        return ctx.handler.call({})
      })
    }
    const actual = myComponent.render()
    expect(actual).toBe(expected)
  })

  test('this received as first argument with multiple arguments', () => {
    const func = nothis((context, a, b, c) => [context, a, b, c])
    const actual = func.call(1, 2, 3, 4)
    expect(actual).toEqual([1, 2, 3, 4])
  })

  test('nested this has separate contexts', () => {
    const expected = { outerContext: 'O', innerContext: 'I' }
    const outer = nothis(function outer(outerContext) {
      return nothis(function inner(innerContext) {
        return { outerContext, innerContext }
      })
    })
    const actual = outer.call('O').call('I')
    expect(actual).toMatchObject(expected)
  })
})
