import React from 'react'
import { shallow } from 'enzyme'
import Square from '../src/Square'

test('Square changes text on click', () => {
  const square = shallow(<Square />)

  // Interaction demo
  expect(square.text()).toEqual('off')
  square.simulate('click')
  expect(square.text()).toEqual('on')

  // Snapshot demo
  expect(square).toMatchSnapshot()
})
