import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import Header from './Header'
import Users from './Users'
import UserHeader from './UserHeader'
import Post from './Post'
import NotFound from './NotFound'
import ContactUs from './ContactUs'
import Posts from './Posts'
import { useEffect, useState } from 'react'


export default function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {

    (async function () {
      try {
        const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users')
        if (usersResponse.ok !== true) {
          throw new Error(usersResponse.status + ' ' + usersResponse.statusText)
        }
        setUsers(await usersResponse.json());


      } catch (error) {
        console.error('Error fetching users:', error.message)
      }


    })()

  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Header />}>
          <Route index element={<Users users={users} />} />
          <Route path='/users/:userId' element={<UserHeader users={users}/>} >
            <Route index element={<Posts />} />
            <Route path='posts/:postId' element={<Post />} />
          </Route>

          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='*' element={<NotFound />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}