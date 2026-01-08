import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router'

export default function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route target='/' element={<Header />}>
          <Route index element={<Users/>}/>
          <Route path='user:id' element={<User/>}/>
          <Route path='user:id/post:id' element={<Post/>}/>
          
        </Route>
      </Routes>
    </BrowserRouter>
  )
}