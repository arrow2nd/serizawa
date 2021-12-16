import { Rectangle } from 'electron/renderer'
import React from 'react'

import LeftButtons from './buttons/left'
import RightButtons from './buttons/right'

type Props = {
  focusIframe: () => void
  getIframeRect: () => Rectangle
  onClickSetting: () => void
}

const TitleBar = ({
  focusIframe,
  getIframeRect,
  onClickSetting
}: Props): JSX.Element => (
  <div
    className="flex justify-between min-w-full h-6 bg-shiny text-black drag"
    onClick={focusIframe}
  >
    <LeftButtons onClick={onClickSetting} />
    <RightButtons focusIframe={focusIframe} getIframeRect={getIframeRect} />
  </div>
)

export default TitleBar
