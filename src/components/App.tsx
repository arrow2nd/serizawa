import { createRef } from 'react'
import React, { useState } from 'react'
import TitleBar from './titlebar'
import Config from './config'

const App = (): JSX.Element => {
  const [isShowConfig, setShowConfig] = useState(false)
  const iframeRef = createRef<HTMLIFrameElement>()

  const openConfigWindow = () => setShowConfig(true)
  const closeConfigWindow = () => setShowConfig(false)

  const focusIframe = () => iframeRef.current?.focus()

  return (
    <div className="App flex flex-col min-h-screen">
      {isShowConfig && (
        <Config focusIframe={focusIframe} onClickClose={closeConfigWindow} />
      )}
      <TitleBar focusIframe={focusIframe} onClickSetting={openConfigWindow} />
      <iframe
        className="flex-1 block w-screen border-none p-0 align-bottom"
        src="https://shinycolors.enza.fun"
        ref={iframeRef}
        frameBorder="0"
      />
    </div>
  )
}

export default App
