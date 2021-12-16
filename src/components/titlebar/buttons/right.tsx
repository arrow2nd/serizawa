import { Rectangle } from 'electron/renderer'
import React, { useCallback, useState } from 'react'
import {
  AiOutlineCamera,
  AiOutlineCheck,
  AiOutlineMinus,
  AiOutlineReload
} from 'react-icons/ai'
import {
  RiCloseLine,
  RiFullscreenExitLine,
  RiFullscreenLine,
  RiPushpin2Fill,
  RiPushpin2Line
} from 'react-icons/ri'

import UIButton from '../button'

type Props = {
  focusIframe: () => void
  getIframeRect: () => Rectangle
}

const RightButtons = ({ focusIframe, getIframeRect }: Props): JSX.Element => {
  const [isCaptured, setCaptured] = useState(false)
  const [isPinned, setPinned] = useState(false)
  const [isMaximized, setMaximized] = useState(false)

  const handleClickCapture = useCallback(() => {
    const rect = getIframeRect()
    window.api.captureScreen(rect)
    setCaptured(true)
    setInterval(() => setCaptured(false), 1500)
  }, [getIframeRect])

  const handleClickReload = () => {
    window.api.windowReload()
    focusIframe()
  }

  const handleClickPin = async () => {
    window.api.windowChangePinned()
    setPinned(!isPinned)
    focusIframe()
  }

  const handleClickMaximize = async () => {
    window.api.windowChangeMaximize()
    setMaximized(!isMaximized)
    focusIframe()
  }

  const handleClickMinimize = () => window.api.windowMinimize()
  const handleClickClose = () => window.api.windowClose()

  return (
    <div className="flex items-center overflow-hidden">
      <UIButton onClick={handleClickCapture}>
        {isCaptured ? <AiOutlineCheck /> : <AiOutlineCamera />}
      </UIButton>
      <UIButton onClick={handleClickReload}>
        <AiOutlineReload />
      </UIButton>
      <UIButton onClick={handleClickPin}>
        {isPinned ? <RiPushpin2Fill /> : <RiPushpin2Line />}
      </UIButton>
      <UIButton onClick={handleClickMinimize}>
        <AiOutlineMinus />
      </UIButton>
      <UIButton onClick={handleClickMaximize}>
        {isMaximized ? <RiFullscreenExitLine /> : <RiFullscreenLine />}
      </UIButton>
      <UIButton onClick={handleClickClose}>
        <RiCloseLine />
      </UIButton>
    </div>
  )
}

export default RightButtons
