import React from 'react'
import { Link } from 'react-router-dom'

const ClientReview = () => {
  return (
    <div className='App'> 
    <span>Client Reviews</span> 
    <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/client/booking'> Booking</Link></li>
        <li><Link to='/client/search'> Search</Link></li>
        <li><Link to='/sp/review'> SpReview</Link></li>
    </ul>
    </div>
  )
}

export default ClientReview