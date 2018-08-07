const fixthis = require("../fixthis")

describe("fixthis", () => {
  const cat = {
    sound: "meow",
    speak: function() {
      return this.sound
    }
  }

  test("does not modify source", () => {
    const expected = cat.speak
    fixthis(cat)
    const actual = cat.speak
    expect(actual).toBe(expected)
  })

  test("method will not rebind", () => {
    const expected = "meow"
    const fixedCat = fixthis(cat)
    const actual = fixedCat.speak.call({ sound: "woof" })
    expect(actual).toBe(expected)
  })

  test("method will not lose context", () => {
    const expected = "meow"
    const fixedCat = fixthis(cat)
    const speak = fixedCat.speak
    const actual = speak()
    expect(actual).toBe(expected)
  })
})
