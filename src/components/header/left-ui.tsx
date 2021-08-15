import { RiSettings3Line } from 'react-icons/ri'

import React from 'react'
import Button from './button'

const LeftUI = (): JSX.Element => {
  const handleConfugClick = () => {
    console.log('ok!')
  }

  return (
    <div className="buttons">
      <Button onClick={handleConfugClick}>
        <RiSettings3Line />
      </Button>
    </div>
  )
}

export default LeftUI
