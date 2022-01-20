import React, { useState } from 'react'

import Config from './config'
import TitleBar from './titlebar'

const App = (): JSX.Element => {
  const [isShowConfig, setShowConfig] = useState(false)

  const showConfig = () => {
    setShowConfig(true)
    window.api.hideView()
  }

  const hideConfig = () => {
    window.api.showView()
    setShowConfig(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <TitleBar onClickSetting={showConfig} hidden={isShowConfig} />
      {isShowConfig && <Config onClickClose={hideConfig} />}
    </div>
  )
}

export default App
