import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { AuthContext } from '../providers/AuthProvider'
import AuthFailure from './AuthFailure'
import ChatBox from './ChatBox'
import Footer from './Footer'
import GuestNavbar from './GuestNavbar'
import MTNavbar from './massageTherapist/MTNavbar'


const MTPortal = () => {
  const authContext = useContext(AuthContext)
	const permission = authContext.permission

  if(permission >= 2) {
  return (<>
    <MTNavbar />
    <Outlet />
    <ChatBox />
    <Footer />
  </>
  )
} else{
  return(<>
    <GuestNavbar />
    <AuthFailure />
    <Footer />
  </>
  )
}
}

export default MTPortal