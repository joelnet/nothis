const React = require('react')
const { mount } = require('enzyme')
const Counter = require('../__mocks__/Counter')

describe('fixthisReact', () => {
  test('<Counter /> works with fixthisReact', () => {
    const wrapper = mount(<Counter />)
    const button = wrapper.find('button')
    button.simulate('click')
    expect(button.text()).toBe('1')
  })
})
