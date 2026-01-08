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