import React from 'react'
import { Link } from 'react-router-dom'

const Search = () => {
  return (
    <div className='App'> 
    <span>Search</span> 
    <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/client/booking'> Booking</Link></li>
        <li><Link to='/client/review'> ClientReview</Link></li>
        <li><Link to='/sp/review'> SpReview</Link></li>
    </ul>
    </div>
  )
}

export default Search