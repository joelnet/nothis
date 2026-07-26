const nothis = require('./nothis')
const isFunction = require('./utils/isFunction')

const exclude = ['constructor']

const getKeys = obj => Object.getOwnPropertyNames(Object.getPrototypeOf(obj))

/**
 * Rewrites all prototype methods of an instance so they receive the instance
 * as their first argument instead of relying on `this`. Call it from the
 * constructor, e.g. `fixThisClass(this)`.
 *
 * @param {Object} obj instance whose prototype methods should be rewritten
 * @returns {void}
 */
const fixThisClass = obj =>
  getKeys(obj)
    .filter(key => isFunction(obj[key]) && exclude.indexOf(key) === -1)
    .forEach(key => (obj[key] = nothis(obj[key])))

module.exports = fixThisClass
