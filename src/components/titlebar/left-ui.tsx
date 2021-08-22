import { RiSettings3Line, RiInformationLine } from 'react-icons/ri'
import React from 'react'
import Button from './button'

const LeftUI = (): JSX.Element => {
  const handleInfoClick = () => {
    window.api.openAbout()
  }

  const handleConfigClick = () => {
    console.log('ok!')
  }

  return (
    <div className="flex items-center overflow-hidden">
      <Button onClick={handleInfoClick}>
        <RiInformationLine />
      </Button>
      <Button onClick={handleConfigClick}>
        <RiSettings3Line />
      </Button>
    </div>
  )
}

export default LeftUI
