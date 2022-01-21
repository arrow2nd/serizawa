import React from 'react'

import LeftButtons from './buttons/left'
import RightButtons from './buttons/right'

type Props = {
  hidden: boolean
  onClickSetting: () => void
}

const TitleBar = ({ hidden, onClickSetting }: Props): JSX.Element => {
  const handleClick = () => {
    // タイトルバークリック時にウィンドウがフォーカスを奪ってしまうので
    // ビューへフォーカスを返す
    window.api.focusView()
  }

  return (
    <div
      className={`${
        hidden ? 'hidden' : 'flex'
      } justify-between fixed top-0 min-w-full h-6 bg-shiny text-neutral-900 drag`}
      onClick={handleClick}
    >
      <LeftButtons onClick={onClickSetting} />
      <RightButtons />
    </div>
  )
}

export default TitleBar
