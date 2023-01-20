import React from 'react'
import BookingCalendar from '../components/calendar/Calendar'

const BookUser = ({mt}) => {
  if(mt){
    return (
      <div className="bg-stone-200 text-center min-h-screen p-1"> 
        <BookingCalendar mt={true}/> 
      </div>
  )}else {
    return (
      <BookingCalendar />
      )
    }
}

export default BookUser