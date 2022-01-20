import React, { useState } from 'react'

import Config from './config'
import TitleBar from './titlebar'

const App = (): JSX.Element => {
  const [isShowConfig, setShowConfig] = useState(false)

  const showConfigWindow = () => setShowConfig(true)
  const hiddenConfigWindow = () => setShowConfig(false)

  return (
    <div className="flex flex-col min-h-screen">
      {isShowConfig && <Config onClickClose={hiddenConfigWindow} />}
      <TitleBar onClickSetting={showConfigWindow} />
    </div>
  )
}

export default App
