const clone = require('lodash.clone')
const isFunction = require('./utils/isFunction')
const getAllkeys = require('./utils/getAllKeys')

const selfBind = (obj, key) => {
  obj[key] = obj[key].bind(obj)
  return obj
}

const selfBindReducer = (acc, key) =>
  isFunction(acc[key]) ? selfBind(acc, key) : acc

const fixthis = obj => getAllkeys(obj).reduce(selfBindReducer, clone(obj))

module.exports = fixthis
