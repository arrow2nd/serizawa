import { Rectangle } from 'electron/renderer'
import React, { useState } from 'react'
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

import UIButton, { Button } from './button'

type Props = {
  focusIframe: () => void
  getIframeRect: () => Rectangle
}

const RightButtons = ({ focusIframe, getIframeRect }: Props): JSX.Element => {
  const [isCaptured, setCaptured] = useState(false)
  const [isPinned, setPinned] = useState(false)
  const [isMaximized, setMaximized] = useState(false)

  const buttons: Button[] = [
    {
      title: 'スクリーンショットを撮影',
      children: isCaptured ? <AiOutlineCheck /> : <AiOutlineCamera />,
      onClick: () => {
        window.api.captureScreen(getIframeRect())
        setCaptured(true)
        setInterval(() => setCaptured(false), 1500)
      }
    },
    {
      title: '再読み込み',
      children: <AiOutlineReload />,
      onClick: () => {
        window.api.windowReload()
        focusIframe()
      }
    },
    {
      title: '最前面に固定',
      children: isPinned ? <RiPushpin2Fill /> : <RiPushpin2Line />,
      onClick: async () => {
        window.api.windowChangePinned()
        setPinned(!isPinned)
        focusIframe()
      }
    },
    {
      title: '最小化',
      children: <AiOutlineMinus />,
      onClick: () => window.api.windowMinimize()
    },
    {
      title: '最大化',
      children: isMaximized ? <RiFullscreenExitLine /> : <RiFullscreenLine />,
      onClick: async () => {
        window.api.windowChangeMaximize()
        setMaximized(!isMaximized)
        focusIframe()
      }
    },
    {
      title: '終了',
      children: <RiCloseLine />,
      onClick: () => window.api.windowClose()
    }
  ]

  return (
    <div className="flex items-center overflow-hidden">
      {buttons.map((e) => (
        <UIButton key={e.title} {...e}>
          {e.children}
        </UIButton>
      ))}
    </div>
  )
}

export default RightButtons
