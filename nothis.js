const nothis = func =>
  function nothis_() {
    return func.apply(
      this,
      [this].concat(Array.prototype.slice.call(arguments))
    )
  }

module.exports = nothis
