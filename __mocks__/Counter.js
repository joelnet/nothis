const React = require('react')
const nothisReact = require('../nothisReact')

class Counter extends React.Component {
  state = { count: 0 }

  constructor() {
    super()
    nothisReact(this)
  }

  increment({ setState }) {
    setState(({ count }) => ({ count: count + 1 }))
  }

  render({ increment, state }) {
    return (
      <div>
        <button onClick={increment}>{state.count}</button>
      </div>
    )
  }
}

module.exports = Counter
