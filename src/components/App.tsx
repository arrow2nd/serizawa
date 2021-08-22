import { createRef } from 'react'
import React from 'react'
import TitleBar from './titlebar'
import Config from './config'

const App = (): JSX.Element => {
  const iframeRef = createRef<HTMLIFrameElement>()

  const focusIframe = () => {
    iframeRef.current?.focus()
  }

  return (
    <div className="App flex flex-col min-h-screen">
      <Config />
      <TitleBar focusIframe={focusIframe} />
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
