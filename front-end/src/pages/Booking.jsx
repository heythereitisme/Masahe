import React from 'react'
import UserList from '../components/reviewPrototype/UserList'

const ClientBooking = () => {
    return (
      <div className="bg-white text-center min-h-screen p-1"> 
      <UserList sort="open"/> 
      </div>
      )
  }
  
export default ClientBooking