import React from 'react'
import { NavLink, Outlet } from 'react-router'

export default function Header() {
    return (
        <>
            <header>
                <NavLink to="/">Users</NavLink>
                <NavLink to="/contact-us">Contact Us</NavLink>
            </header>
            <Outlet />
        </>

    )
}
