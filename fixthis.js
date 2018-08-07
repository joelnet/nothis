const clone = require('lodash.clone')
const uniq = require('lodash.uniq')
const isFunction = require('./utils/isFunction')

const selfBind = (obj, key) => {
  obj[key] = obj[key].bind(obj)
  return obj
}

const selfBindReducer = (acc, key) =>
  isFunction(acc[key]) ? selfBind(acc, key) : acc

const fixthis = obj => {
  const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(obj))
  const keys = Object.keys(obj)
  return uniq(methods.concat(keys)).reduce(selfBindReducer, clone(obj))
}

module.exports = fixthis
