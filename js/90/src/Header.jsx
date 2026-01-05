import React from 'react'
import { NavLink, Outlet } from 'react-router'

export default function Header() {
    return (
        <>
            <header>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/buy">Buy</NavLink>
                <NavLink to="/sell">Sell</NavLink>
            </header>
            <Outlet />
        </>

    )
}
