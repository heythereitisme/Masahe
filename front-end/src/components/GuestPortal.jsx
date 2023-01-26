import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'

const GuestPortal = () => {
  return (<>
    <Navbar />
    <Outlet />
    <Footer />
  </>
    
  )
}

export default GuestPortal