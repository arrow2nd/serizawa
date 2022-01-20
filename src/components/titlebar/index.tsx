import React from 'react'

import LeftButtons from './buttons/left'
import RightButtons from './buttons/right'

type Props = {
  onClickSetting: () => void
}

const TitleBar = ({ onClickSetting }: Props): JSX.Element => (
  <div
    className="flex justify-between fixed top-0 min-w-full h-6 bg-shiny text-neutral-900 drag"
    onClick={() => window.api.focus()}
  >
    <LeftButtons onClick={onClickSetting} />
    <RightButtons />
  </div>
)

export default TitleBar
