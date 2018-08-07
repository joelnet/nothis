const fixthis = require('./fixthis')

const nothis = func =>
  function nothis_() {
    return func.apply(
      this,
      [fixthis(this)].concat(Array.prototype.slice.call(arguments))
    )
  }

module.exports = nothis
