const uniq = require('./uniq')

const getAllkeys = obj => {
  const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(obj))
  const keys = Object.keys(obj)
  return uniq(methods.concat(keys))
}

module.exports = getAllkeys
