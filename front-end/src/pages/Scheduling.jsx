import React from 'react'
import UserList from '../components/reviewPrototype/UserList'

const MTSchedule = () => {
    return (
      <div className="bg-white text-center min-h-screen p-1"> 
      <UserList mt={true} sort={'avgRating'}/> 
      </div>
      )
  }
  
export default MTSchedule