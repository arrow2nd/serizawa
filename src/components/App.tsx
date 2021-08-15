import React from 'react'
import Asahi from './asahi'
import Header from './header'
import '../styles/App.css'

const App = (): JSX.Element => (
  <div className="App">
    <Header />
    <Asahi />
  </div>
)

export default App
