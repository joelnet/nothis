const uniq = require('./uniq')

// from: http://code.fitness/post/2016/01/javascript-enumerate-methods.html

const excluded = [
  'constructor',
  '__defineGetter__',
  '__defineSetter__',
  '__lookupGetter__',
  '__lookupSetter__',
  'hasOwnProperty',
  'propertyIsEnumerable',
  'isPrototypeOf',
  'toString',
  'valueOf',
  'toLocaleString'
]

function hasMethod(obj, name) {
  const desc = Object.getOwnPropertyDescriptor(obj, name)
  return !!desc && typeof desc.value === 'function'
}

function getInstanceMethodNames(obj, stop) {
  let array = []
  let proto = Object.getPrototypeOf(obj)
  while (proto && proto !== stop) {
    Object.getOwnPropertyNames(proto).forEach(name => {
      if (excluded.indexOf(name) === -1) {
        if (hasMethod(proto, name)) {
          array.push(name)
        }
      }
    })
    proto = Object.getPrototypeOf(proto)
  }
  return array
}

const getAllKeys = obj => {
  const methods = getInstanceMethodNames(obj)
  const keys = Object.keys(obj)
  return uniq(methods.concat(keys))
}

module.exports = getAllKeys
