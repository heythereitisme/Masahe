import React from 'react'
import { Link } from 'react-router-dom'
import ReviewPrototype from '../components/reviewPrototype/ReviewPrototype'

const ClientReview = () => {
  return (
    <div className='App'> 
    <span>Client Reviews</span> 
    <ul>
        <li><Link to='/'>Home</Link></li>
    </ul>
    <ReviewPrototype />
    </div>
  )
}

export default ClientReview