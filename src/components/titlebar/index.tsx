import React from 'react'

import LeftButtons from './buttons/left'
import RightButtons from './buttons/right'

type Props = {
  hidden: boolean
  onClickSetting: () => void
}

const TitleBar = ({ hidden, onClickSetting }: Props): JSX.Element => (
  <div
    className={`${
      hidden ? 'hidden' : 'flex'
    } justify-between fixed top-0 min-w-full h-6 bg-rinze text-luca drag`}
  >
    <LeftButtons onClick={onClickSetting} />
    <RightButtons />
  </div>
)

export default TitleBar
