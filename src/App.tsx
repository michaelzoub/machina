import { useState } from 'react'
import './App.css'
import Combined from './components/mainchat/combined'
import OpenSign from './components/mainchat/openSign'


function App() {

  return (
    <main className="flex w-full h-screen overflow-hidden">
      <OpenSign />
      <Combined color="pink-500" secondary="pink-400" />
    </main>
  )
}

export default App
