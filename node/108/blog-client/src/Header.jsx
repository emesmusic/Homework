import React from 'react';
import './Header.css';
import { NavLink } from 'react-router';
import Authentication from './Authentication';
import { useState } from 'react';

export default function Header() {
  const [userName, setUserName] = useState(null);


  return (
    <header>
      <h1>PCS React MongoDB SocketIO Express Blog</h1>
      <NavLink to="/">posts</NavLink> {userName && <> | <NavLink to="/addPost">add post</NavLink></> }
      <Authentication userName={userName} setUserName={setUserName}/>
    </header>
  )
}
