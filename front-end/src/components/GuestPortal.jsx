import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { AuthContext } from '../providers/AuthProvider'
import ChatBox from './ChatBox'
import Footer from './Footer'
import Navbar from './GuestNavbar'
import ClientNavbar from './massageClients/ClientNavbar'
import MTNavbar from './massageTherapist/MTNavbar'

const GuestPortal = () => {
  const auth = useContext(AuthContext)
  const permission = auth.permission

  if(permission === 1){
    return (<>
      <ClientNavbar />
      <Outlet />
      <ChatBox />
      <Footer />
    </>)
  }else if(permission === 2) {
    return (<>
      <MTNavbar />
      <Outlet />
      <ChatBox />
      <Footer />
    </>)
  }
  return (<>
    <Navbar />
    <Outlet />
    <ChatBox />
    <Footer />
  </>
    
  )
}

export default GuestPortal