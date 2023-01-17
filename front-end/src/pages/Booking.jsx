import React from 'react'
import { Link } from 'react-router-dom'
import BookingCalendar from '../components/calendar/Calendar'

const Booking = () => {
  return (
    <div className='App'>
      <p>Booking</p>
      <p><Link to='/'>Home</Link></p>
      <BookingCalendar />
    </div>
    
  )
}

export default Booking