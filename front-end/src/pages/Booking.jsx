import React from 'react'
import { Link } from 'react-router-dom'
import BookingCalendar from '../components/calendar/Calendar'
import Navbar from '../components/Navbar'
const Booking = () => {
  return (
    <div>
      <div> <Navbar/> </div>
      
      <div> <BookingCalendar /> </div>
    </div>
    
  )
}

export default Booking