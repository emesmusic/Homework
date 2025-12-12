import { useState } from 'react'
import './App.css'
import Address from './Address'
import Address1 from './Address1'

function App() {

  return (
    <>
     <div>
      <h1>Hello world!</h1>
      <p1>The time at page render was {new Date().toLocaleTimeString()}</p1>
     </div>
     <Address />
     <Address1 number="617" street="6th Street" city="Lakewood" state="NJ" zip="08701" country="United States" />
    </>
  )
}

export default App
