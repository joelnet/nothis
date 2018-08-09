const React = require('react')
const nothisAll = require('../nothisAll')

class Counter extends React.Component {
  state = { count: 0 }

  constructor() {
    super()
    nothisAll(this)
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
