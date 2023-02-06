import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { AuthContext } from '../providers/AuthProvider'
import AuthFailure from './AuthFailure'
import ChatBox from './ChatBox'
import Footer from './Footer'
import Navbar from './Navbar'

const MTPortal = () => {
  const authContext = useContext(AuthContext)
	const permission = authContext.permission

  if(permission >= 2) {
  return (<>
    <Navbar />
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

export default MTPortal