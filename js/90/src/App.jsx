import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css'
import Header from './Header';
import Buy from './Buy';
import Home from './Home';
import Sell from './Sell';
import Error from './Error';


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route element={<Home />} index />
            <Route path="buy" element={<Buy />}/>
            <Route path="sell" element={<Sell/>}/>
          </Route>
          <Route path="*" element={<Error/>}/>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
