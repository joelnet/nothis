const decorateArrow = (property, descriptor) => {
  var original = descriptor.initializer
  descriptor.initializer = function initializer() {
    // sets the name of the function to `property`
    const temp = {
      [property]() {
        return original().apply(
          this,
          [this].concat(Array.prototype.slice.call(arguments))
        )
      }
    }

    return temp[property]
  }
}

const decorateFunction = (property, descriptor) => {
  const original = descriptor.value

  // sets the name of the function to `property`
  const temp = {
    [property]() {
      return original.apply(
        this,
        [this].concat(Array.prototype.slice.call(arguments))
      )
    }
  }

  descriptor.value = temp[property]
}

const isArrow = descriptor => typeof descriptor.initializer === 'function'
const isFunction = descriptor => typeof descriptor.value === 'function'

const contextDecorator = (target, property, descriptor) => {
  if (isArrow(descriptor)) decorateArrow(property, descriptor)
  if (isFunction(descriptor)) decorateFunction(property, descriptor)
}

module.exports = contextDecorator
