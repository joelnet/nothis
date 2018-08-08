# NO. THIS.

The complete elimination and eradication of JavaScript's _this_.

![Tombstone - this 1995-2018](https://github.com/joelnet/nothis/raw/master/assets/headstone.png)

If _this_ is so difficult to reason about, why don't we just stop using it? Seriously. **Why. don't. we. just. stop. using. it.**?

When a function is decorated with the `nothis` function decorator it will pass `this` as the first argument. [Read more on function decorators here](https://dev.to/joelnet/function-decorators-part-2-javascript-4km9).

Now you can remove all those annoying `var self = this` lines as they are now completely unnecessary!

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
// 😞 GROSS: this
const cat = {
  sound: 'meow',
  speak: function() {
    return this.sound
  }
}

// 🔥 LIT: nothis
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
// 😞 GROSS: this
const cat = {
  sound: 'meow',
  speak: () => this.sound
}
cat.speak()
//=> undefined

// 🔥 LIT: nothis
const cat = {
  sound: 'meow',
  speak: nothis(ctx => ctx.sound)
}
cat.speak()
//=> "meow"
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

### Example 4: Clarity

Easily know what your context is.

```javascript
// 😞 GROSS: this
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

// 🔥 LIT: nothis
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

### Example 5: 3rd Party Libraries

3rd party libraries sometimes require you to use `this`. F that.

```javascript
// 😞 GROSS: this
$('p').on('click', function() {
  console.log($(this).text())
})

// 🔥 LIT: nothis
$('p').on('click', nothis(ctx => console.log($(ctx).text())))
```

You can also use parameter destructuring in ES6 arrow functions.

```javascript
import { EventEmitter2 } from 'eventemitter2'
const events = new EventEmitter2({ wildcard: true })

// 😞 GROSS: this
events.on('button.*', function() {
  console.log('event:', this.event)
})

// 🔥 LIT: nothis + destructuring!
events.on('button.*', nothis(({ event }) => console.log('event', event)))

events.emit('button.click')
```

### Example 6: React

Restore some sanity to React components!

Stop writing code like this:

```javascript
class Counter extends React.Component {
  constructor() {
    // 😞 GROSS: this
    this.increment = this.increment.bind(this)
  }

  increment() {
    // 😞 GROSS: this
    this.setState(s => ({ count: s.count + 1 }))
  }

  render() {
    return (
      <div>
        <!-- 😞 GROSS: this -->
        <button onClick={() => this.increment}>{this.state.count}</button>

        <!-- 😞 GROSS: this EVEN WORSE! -->
        <button onClick={this.increment.bind(this)}>{this.state.count}</button>
      </div>
    )
  })
}
```

instead you can write code like this:

```javascript
class Counter extends React.Component {
  state = { count: 0 }

  // 🔥 LIT: nothis + destructuring!
  increment = nothis(({ setState }) => setState(s => ({ count: s.count + 1 })))

  // 🔥 LIT: nothis + destructuring!
  render = nothis(({ increment, state: { count } }) => (
    <div>
      <button onClick={increment}>{count}</button>
    </div>
  ))
}
```

## fixthis(object)

Sometimes `this` will get rebound to another context when you least expect it. Consider this example.

```javascript
// 😞 GROSS: this
const cat = {
  sound: 'meow',
  speak: function() {
    return this.sound
  }
}
const speak = cat.speak

speak()
// => undefined
```

You can prevent this from happening by using `fixthis`.

```javascript
// 🔥 LIT: fixthis
import fixthis from 'nothis/fixthis'

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

### ES6 Classes

Classes won't save you from the problems of `this`.

```javascript
// 😞 GROSS: this
class Cat {
  constructor() {
    this.sound = 'meow'
  }
  speak() {
    return this.sound
  }
}

const cat = new Cat()
const speak = cat.speak
speak()
// => Cannot read property 'sound' of undefined
```

You still can `fixthis` it.

```javascript
// 🔥 LIT: fixthis
class Cat {
  constructor() {
    this.sound = 'meow'
  }
  speak() {
    return this.sound
  }
}

const cat = fixthis(new Cat())
const speak = cat.speak
speak()
//=> "meow"
```
