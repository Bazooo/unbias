import React, { useState } from 'react'

const Square = () => {
  const [text, toggle] = useState('off')

  const onClick: React.MouseEventHandler = ({}) => {
    toggle(text === 'on' ? 'off' : 'on')
  }

  return (
    <div onClick={onClick}>{text}</div>
  )
}

export default Square
