import React from 'react'
import LeftUI from './left-ui'
import RightUI from './right-ui'

type Props = {
  focusIframe: () => void
}

const TitleBar = ({ focusIframe }: Props): JSX.Element => (
  <div
    className="flex justify-between min-w-full h-6 bg-shiny text-black drag"
    onClick={focusIframe}
  >
    <LeftUI />
    <RightUI focusIframe={focusIframe} />
  </div>
)

export default TitleBar
