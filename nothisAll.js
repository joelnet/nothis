const nothis = require('./nothis')
const isFunction = require('./utils/isFunction')

const exclude = ['constructor']

const getKeys = obj => Object.getOwnPropertyNames(Object.getPrototypeOf(obj))

const nothisAll = obj =>
  getKeys(obj)
    .filter(key => isFunction(obj[key]) && exclude.indexOf(key) === -1)
    .forEach(key => (obj[key] = nothis(obj[key])))

module.exports = nothisAll
