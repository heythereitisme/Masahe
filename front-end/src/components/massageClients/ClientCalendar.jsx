import React, { useContext, useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { AuthContext } from '../../providers/AuthProvider';

const ClientCalendar = () => {
    const myLocalizer = momentLocalizer(moment);
    const dayLayoutAlgorithm = "no-overlap";
    const [myEvents, setMyEvents] = useState([]);
    const auth = useContext(AuthContext)
    const muid = auth.muid
    const options = {
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      };

    const getAppointments = async() => {
        const req = await fetch(`/api/event/booked/${muid}`);
            const events = await req.json();
            if (events[0]) {
                const newEvents = events.map((e) => {
                  const newStart = new Date(e.start);
                  const newEnd = new Date(e.end);
                  return { _id: e._id, title: e.title, start: newStart, end: newEnd, resources: e.resources};
                });
                setMyEvents(newEvents);
              }
    }

    useEffect(() => {
        getAppointments()
    }, [])

    const viewEvent = (e) => {
        let title = e.title
        let time = e.start.toLocaleDateString('en-US', options);
        let firstName = e.resources.user.firstName
        let lastName = e.resources.user.lastName
        window.confirm(
            `${title} at ${time} \nWith ${firstName} ${lastName}`
        )
    }

  return (
    <div className="h-screen bg-white border-1 text-primary border-1 text-center">
        <span className='text-5xl mb-10'>Your Appointments:</span>
        <Calendar
          localizer={myLocalizer}
          dayLayoutAlgorithm={dayLayoutAlgorithm}
          defaultDate={new Date()}
          defaultView="month"
          events={myEvents}
          onSelectEvent={viewEvent}
          popup
        />
      </div>
  )
}

export default ClientCalendar