import React from 'react'
import { render } from 'react-dom'
import Square from '../lib/Square'

const App = () => (
  <div>
    <Square />
  </div>
)

render(<App />, document.getElementById('root'))
