import {
  AiOutlineMinus,
  AiOutlineCamera,
  AiOutlineReload
} from 'react-icons/ai'
import {
  RiPushpin2Line,
  RiPushpin2Fill,
  RiFullscreenLine,
  RiCloseLine
} from 'react-icons/ri'
import React, { useState } from 'react'
import Button from './button'

const UI = (): JSX.Element => {
  const [isPinned, setIsPinned] = useState(false)

  const handleCloseClick = () => {
    window.api.windowClose()
  }

  const handleMinClick = () => {
    window.api.windowMinimize()
  }

  const handlePinClick = async () => {
    window.api.windowChangePinned()

    setIsPinned(await window.api.getPinnedStatus())
  }

  return (
    <div className="buttons">
      <Button onClick={handlePinClick}>
        {isPinned ? <RiPushpin2Fill /> : <RiPushpin2Line />}
      </Button>
      <Button onClick={handleMinClick}>
        <AiOutlineMinus />
      </Button>
      <Button onClick={handleCloseClick}>
        <RiCloseLine />
      </Button>

      {/* <AiOutlineCamera className="icon" />
      <RiPushpin2Line className="icon" />
      <AiOutlineReload className="icon" />
      <AiOutlineMinus className="icon" />
      <RiFullscreenLine className="icon" />
      <RiCloseLine className="icon" /> */}
    </div>
  )
}

export default UI
