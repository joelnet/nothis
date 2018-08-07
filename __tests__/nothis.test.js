const nothis = require('../nothis')

describe('nothis', () => {
  function whoami() {
    return this
  }

  const whoamiNoThis = nothis(function whoami(context) {
    return context
  })

  const whoamiEs6 = nothis(context => context)

  test('this is not changed', () => {
    const expected = whoami()
    const actual = nothis(whoami)()
    expect(actual).toBe(expected)
  })

  test('nothis works with arrow function', () => {
    const expected = whoami()
    const actual = whoamiEs6()
    expect(actual).toBe(expected)
  })

  test('this becomes first argument', () => {
    const expected = whoami()
    const actual = whoamiNoThis()
    expect(actual).toBe(expected)
  })

  test('this behaves the same when this is unset', () => {
    const expected = (0, whoami)()
    const actual = (0, whoamiNoThis)()
    expect(actual).toBe(expected)
  })

  test('this behaves the same when changed', () => {
    const context = {}
    const expected = whoami.call(context)
    const actual = whoamiNoThis.call(context)
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
