import React from 'react'
import { Outlet } from 'react-router-dom'
import ChatBox from './ChatBox'
import Footer from './Footer'
import Navbar from './GuestNavbar'

const GuestPortal = () => {
  return (<>
    <Navbar />
    <Outlet />
    <ChatBox />
    <Footer />
  </>
    
  )
}

export default GuestPortal