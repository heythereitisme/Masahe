import React from 'react'
import { useParams } from 'react-router-dom'
import Userlist from '../components/reviewPrototype/UserList'

function Services() {
  const defaultSort = useParams().service
  return (
 <div className='min-h-screen bg-white text-center'>
  <Userlist sort={defaultSort}/>
  </div>
  )
}

export default Services