import React from 'react'
import LeftUI from './left-ui'
import RightUI from './right-ui'

const Header = (): JSX.Element => {
  return (
    <div className="header">
      <LeftUI />
      <RightUI />
    </div>
  )
}

export default Header
