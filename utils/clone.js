const isBoxedPrimitive = obj =>
  obj instanceof Number || obj instanceof String || obj instanceof Boolean

// Builds an empty clone target that carries over the internal slots of
// exotic built-ins; returns null for ordinary objects.
const exoticTarget = obj => {
  if (isBoxedPrimitive(obj)) return Object(obj.valueOf())
  if (Array.isArray(obj)) return []
  if (obj instanceof Date) return new Date(obj.getTime())
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags)
  if (obj instanceof Map) return new Map(obj)
  if (obj instanceof Set) return new Set(obj)
  return null
}

// Shallow clone preserving the prototype chain, own property descriptors
// and the internal slots of boxed primitives, arrays, dates, regexps,
// maps and sets. Primitives pass through.
const clone = obj => {
  if (obj === null || typeof obj !== 'object') return obj

  const target = exoticTarget(obj)
  if (target === null) {
    return Object.defineProperties(
      Object.create(Object.getPrototypeOf(obj)),
      writable(Object.getOwnPropertyDescriptors(obj), () => false)
    )
  }
  Object.setPrototypeOf(target, Object.getPrototypeOf(obj))
  return Object.defineProperties(
    target,
    writable(Object.getOwnPropertyDescriptors(obj), key =>
      Object.prototype.hasOwnProperty.call(target, key)
    )
  )
}

// Marks copied data properties writable so fixthis can rebind them by
// assignment (matching lodash.clone, which produced writable properties).
// Properties the target already owns non-configurably (array length,
// string indices, regexp lastIndex) keep their original descriptors.
const writable = (descriptors, existsOnTarget) => {
  Reflect.ownKeys(descriptors).forEach(key => {
    const descriptor = descriptors[key]
    if ('value' in descriptor && !existsOnTarget(key)) {
      descriptor.writable = true
    }
  })
  return descriptors
}

module.exports = clone
