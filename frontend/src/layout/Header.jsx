import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'

const Header = () => {
  return (
    <>
        <NavBar/>
        <Outlet/>
    </>
  )
}

export default Header