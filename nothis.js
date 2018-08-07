module.exports = function nothis(func) {
  return function nothis_() {
    return func.apply(
      this,
      [this].concat(Array.prototype.slice.call(arguments))
    )
  }
}
