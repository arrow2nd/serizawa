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
    <div className="flex flex-col min-h-screen">
      {isShowConfig && (
        <Config focusIframe={focusIframe} onClickClose={closeConfigWindow} />
      )}
      <TitleBar
        focusIframe={focusIframe}
        getIframeRect={getIframeRect}
        onClickSetting={openConfigWindow}
      />
    </div>
  )
}

export default App
