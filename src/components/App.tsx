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
      {isShowConfig ? (
        <Config onClickClose={hideConfig} />
      ) : (
        <TitleBar onClickSetting={showConfig} />
      )}
    </div>
  )
}

export default App
