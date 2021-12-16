import { Rectangle } from 'electron/renderer'
import React, { createRef, useState } from 'react'

import Config from './config'
import TitleBar from './titlebar'

const App = (): JSX.Element => {
  const [isShowConfig, setShowConfig] = useState(false)
  const iframeRef = createRef<HTMLIFrameElement>()

  const openConfigWindow = () => setShowConfig(true)
  const closeConfigWindow = () => setShowConfig(false)

  const focusIframe = () => iframeRef.current?.focus()
  const getIframeRect = (): Rectangle => ({
    width: parseInt(iframeRef.current?.width || '0'),
    height: parseInt(iframeRef.current?.height || '0'),
    x: 0,
    y: 24
  })

  return (
    <div className="App flex flex-col min-h-screen">
      {isShowConfig && (
        <Config focusIframe={focusIframe} onClickClose={closeConfigWindow} />
      )}
      <TitleBar
        focusIframe={focusIframe}
        getIframeRect={getIframeRect}
        onClickSetting={openConfigWindow}
      />
      <iframe
        className="flex-1 block w-screen p-0 border-0 border-none align-bottom"
        src="https://shinycolors.enza.fun"
        ref={iframeRef}
      />
    </div>
  )
}

export default App
