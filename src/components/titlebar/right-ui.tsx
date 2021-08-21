import {
  AiOutlineMinus,
  AiOutlineCamera,
  AiOutlineReload
} from 'react-icons/ai'

import {
  RiPushpin2Line,
  RiPushpin2Fill,
  RiFullscreenLine,
  RiFullscreenExitLine,
  RiCloseLine
} from 'react-icons/ri'

import React, { useState } from 'react'
import Button from './button'

type Props = {
  focusIframe: () => void
}

const RightUI = ({ focusIframe }: Props): JSX.Element => {
  const [isPinned, setIsPinned] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)

  const handleReloadClick = () => {
    window.api.windowReload()
    focusIframe()
  }

  const handlePinClick = async () => {
    window.api.windowChangePinned()
    setIsPinned(!isPinned)
    focusIframe()
  }

  const handleMaximizeClick = async () => {
    window.api.windowChangeMaximize()
    setIsMaximized(!isMaximized)
    focusIframe()
  }

  const handleMinimizeClick = () => {
    window.api.windowMinimize()
  }

  const handleCloseClick = () => {
    window.api.windowClose()
  }

  return (
    <div className="flex items-center overflow-hidden">
      <Button onClick={handleReloadClick}>
        <AiOutlineCamera />
      </Button>
      <Button onClick={handleReloadClick}>
        <AiOutlineReload />
      </Button>
      <Button onClick={handlePinClick}>
        {isPinned ? <RiPushpin2Fill /> : <RiPushpin2Line />}
      </Button>
      <Button onClick={handleMinimizeClick}>
        <AiOutlineMinus />
      </Button>
      <Button onClick={handleMaximizeClick}>
        {isMaximized ? <RiFullscreenExitLine /> : <RiFullscreenLine />}
      </Button>
      <Button onClick={handleCloseClick}>
        <RiCloseLine />
      </Button>
    </div>
  )
}

export default RightUI
