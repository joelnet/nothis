const React = require('react')
const { render, fireEvent } = require('@testing-library/react')
const Counter = require('../__mocks__/Counter')

describe('fixthisReact', () => {
  test('<Counter /> works with fixthisReact', () => {
    const { getByRole } = render(<Counter />)
    const button = getByRole('button')
    fireEvent.click(button)
    expect(button.textContent).toBe('1')
  })
})
