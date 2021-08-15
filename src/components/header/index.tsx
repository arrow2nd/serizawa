import {
  AiOutlineMinus,
  AiOutlineCamera,
  AiOutlineReload
} from 'react-icons/ai'
import { RiPushpin2Line, RiFullscreenLine, RiCloseLine } from 'react-icons/ri'
import React from 'react'

const Header = (): JSX.Element => {
  return (
    <div className="header">
      <div className="title">
        <span>serizawa</span>
      </div>
      <div className="buttons">
        <AiOutlineCamera className="icon" />
        <RiPushpin2Line className="icon" />
        <AiOutlineReload className="icon" />
        <RiFullscreenLine className="icon" />
        <AiOutlineMinus className="icon" />
        <RiCloseLine className="icon" />
      </div>
    </div>
  )
}

export default Header
