import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { AuthContext } from '../providers/AuthProvider'
import AuthFailure from './AuthFailure'
import ChatBox from './ChatBox'
import Footer from './Footer'
import Navbar from './GuestNavbar'
import ClientNavbar from './massageClients/ClientNavbar'

const ClientPortal = () => {
  const authContext = useContext(AuthContext)
	const permission = authContext.permission

  if(permission === 1 || permission === 3) {
  return (<>
    <ClientNavbar />
    <Outlet />
    <ChatBox />
    <Footer />
  </>
  )
} else{
  return(<>
    <Navbar />
    <AuthFailure />
    <Footer />
  </>
  )
}
}

export default ClientPortal