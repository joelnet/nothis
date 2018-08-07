# NO THIS

The complete elimination and eradication of JavaScript's _this_.

![Tombstone - this 1995-2018](assets/headstone.png)

If _this_ is so difficult to reason about, why don't we just stop using it? Seriously. Why. don't. we. just. stop. using. it.?

When a function is decorated with the `nothis` function decorator it will pass `this` as the first argument. [More on function decorators](https://dev.to/joelnet/function-decorators-part-2-javascript-4km9).

Now you can remove all those `var self = this`!

## Installation

```bash
npm install nothis
```

## Functions

- `nothis` - passes `this` as an argument.
- `fixthis` - Prevents the rebinding of `this`.

## nothis(function)

### Example 1: Basics

Basic JavaScript object

```javascript
// GROSS: this
const cat = {
  sound: 'meow',
  speak: function() {
    return this.sound
  }
}

// LIT: nothis
import nothis from 'nothis'

const cat = {
  sound: 'meow',
  speak: nothis(function(ctx) {
    return ctx.sound
  })
}
```

### Example 2: Arrow functions

Arrow functions with `this` won't work. But with `nothis` you can still access the context.

```javascript
// GROSS: this
const cat = {
  sound: 'meow',
  speak: () => this.sound
}
cat.speak()
//=> undefined

// LIT: nothis
const cat = {
  sound: 'meow',
  speak: nothis(ctx => ctx.sound)
}
cat.speak()
/=> "meow"
```

### Example 3: Multiple arguments

```javascript
const cat = {
  sound: 'meow',
  speak: nothis((ctx, end) => ctx.sound + end)
}
cat.speak('!')
// => "meow!"
```

### Example 3: Clarity

Easily know what your context is.

```javascript
// GROSS: this
const cat = {
  sound: 'meow',
  speak: function() {
    return this.sound
  },
  crazy: function() {
    setInterval(function() {
      console.log(this.speak())
    }, 1000)
  }
}
cat.speak()
//=> Error: this.speak is not a function

// LIT: nothis
const cat = {
  sound: 'meow',
  speak: function() {
    return this.sound
  },
  crazy: nothis(function(ctx) {
    setInterval(function() {
      console.log(ctx.speak())
    }, 1000)
  })
}
cat.crazy()
// => "meow"
// => "meow"
// => "meow"
```

### Example 4: 3rd Party Libraries

3rd party libraries sometimes require you to use `this`. F that.

```javascript
// GROSS: this
$('p').on('click', function() {
  console.log($(this).text())
})

// LIT: nothis
$('p').on('click', nothis(ctx => console.log($(ctx).text())))
```

You can also use parameter destructuring in ES6 arrow functions.

```javascript
import { EventEmitter2 } from 'eventemitter2'
const events = new EventEmitter2({ wildcard: true })

// GROSS: this
events.on('button.*', function() {
  console.log('event:', this.event)
})

// LIT: nothis
events.on('button.*', nothis(({ event }) => console.log('event', event)))

events.emit('button.click')
```

## fixthis(object)

Sometimes `this` will get rebound to another context when you least expect it. Consider this example.

```javascript
// GROSS: this
const cat = {
  sound: 'meow',
  speak: function() {
    return this.sound
  }
}
const meow = cat.meow

meow()
// => undefined
```

You can prevent this from happening by using `fixthis`.

```javascript
// LIT: fixthis

const cat = fixthis({
  sound: 'meow',
  speak: function() {
    return this.sound
  }
})
const speak = cat.speak

speak()
// => "meow"
```
