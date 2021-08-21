import React from 'react'
import Asahi from './asahi'
import Header from './header'
// import '../styles/App.css'

const App = (): JSX.Element => (
  <div className="App flex flex-col min-h-screen">
    <Header />
    <Asahi />
  </div>
)

export default App
