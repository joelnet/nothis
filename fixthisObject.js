const isFunction = require("./utils/isFunction")

const selfBind = (obj, key) => {
  obj[key] = obj[key].bind(obj)
  return obj
}

const selfBindReducer = (acc, key) =>
  isFunction(acc[key]) ? selfBind(acc, key) : acc

const clone = obj => Object.assign({}, obj)

const fixthisObject = obj =>
  Object.keys(obj).reduce(selfBindReducer, clone(obj))

module.exports = fixthisObject
