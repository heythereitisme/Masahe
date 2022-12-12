import React from 'react'
import { Link } from 'react-router-dom'

const SpReview = () => {
  return (
    <div className='App'> 
    <span>Sp Review</span> 
    <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/client/booking'> Booking</Link></li>
        <li><Link to='/client/search'> Search</Link></li>
        <li><Link to='/client/review'> ClientReview</Link></li>
    </ul>
    </div>
  )
}

export default SpReview