import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [input, setInput] = useState("")
  return (
    <>
      <h3>These are linked control components:</h3>
      <input type="text" onChange={e => setInput(e.target.value)} value={input} />
      <input type="text" onChange={e => setInput(e.target.value)} value={input} />
    </>
  )
}

export default App
