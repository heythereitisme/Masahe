import React from 'react'
import { Link } from 'react-router-dom'

const Booking = () => {
  return (
    <div className='App'>
      <span>Booking</span>
    <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/client/search'> Search</Link></li>
        <li><Link to='/client/review'> ClientReview</Link></li>
        <li><Link to='/sp/review'> SpReview</Link></li>
    </ul>
    </div>
    
  )
}

export default Booking