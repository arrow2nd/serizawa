import React from 'react'
import LeftUI from './left-ui'
import RightUI from './right-ui'

const Header = (): JSX.Element => {
  return (
    <div className="flex justify-between min-w-full h-6 bg-shiny text-black drag">
      <LeftUI />
      <RightUI />
    </div>
  )
}

export default Header
