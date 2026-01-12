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

let [users, setUsers] = useState([]);

useEffect(()=>{
  
  (async function (){
  try{
    const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users')
    if(usersResponse.ok !== true){
      throw new Error(usersResponse.status + ' ' + usersResponse.statusText)
    }
    setUsers(await usersResponse.json());
    

  }catch(error){
    console.error('Error fetching users:', error.message)
  }
  

  })()

},[]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Header />}>
          <Route index element={<Users users={users} />} />
          <Route path='/users/:id' element={<User />} />
          <Route path='/users/:userId/posts/:postId' element={<Post />} />
          <Route path='/contact-us' element={<ContactUs />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}