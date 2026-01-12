import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import Header from './Header'
import Users from './Users'
import User from './User'
import Post from './Post'
import NotFound from './NotFound'
import ContactUs from './ContactUs'


export default function App() {
useEffect(async ()=>{
  try{
    const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users')
    if(usersResponse.ok !== true){
      throw new Error('Failed to fetch users')
    }
    const users = await usersResponse.json();
    console.log(users)

  }catch(error){}
  



},[])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Header />}>
          <Route index element={<Users />} />
          <Route path='/users/:id' element={<User />} />
          <Route path='/users/:id/posts/:id' element={<Post />} />
          <Route path='/contact-us' element={<ContactUs />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}