import { useState, useEffect} from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from 'moment'
import { createEvent, deleteEvent, listEvents, updateEvent } from './server-functions'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import { useParams } from 'react-router-dom'

const DnDCalendar = withDragAndDrop(Calendar)

const BookingCalendar = () => {
  const myLocalizer = momentLocalizer(moment)
  const dayLayoutAlgorithm = 'no-overlap'
  const [myEvents, setMyEvents] = useState([])
  const uid = useParams()

  const getEvents = async() => {
    const events = await listEvents(uid.id)
    if(events[0]){
      const newEvents = events.map(e => {
        const newStart = new Date(e.start)
        const newEnd = new Date(e.end)
        return({_id: e._id, title: e.title, start: newStart, end: newEnd })
      })
      setMyEvents(newEvents)
    }
  }
  
  useEffect(() => {
    getEvents()
  }, [])

  const handleSelectSlot = async({ start, end }) => {
      const title = window.prompt('New Event name')
      if (title) {
        await createEvent({ start, end, title, user: uid.id })
        await getEvents()
      }
    }

  const handleSelectEvent = async(event) => {
      let selectedEvent = event.title
      let r = window.confirm(`${selectedEvent} \nWould you like to delete this event?`)
    if(r !== false) {
        await deleteEvent(event)
        await getEvents()
      }
  }

  const moveEvent = async ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
      const { allDay } = event
      const id = event._id
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true
      }
      await updateEvent({start, end, id})
      await getEvents()
    }

  const resizeEvent = async({ start, end, event }) => {
      const id = event._id
      await updateEvent({start, end, id})
      await getEvents()
    }

  return (
    <div className='h-screen bg-stone-400 border-1'>
      <DnDCalendar
        localizer={myLocalizer}
        dayLayoutAlgorithm={dayLayoutAlgorithm}
        defaultDate={new Date()}
        defaultView="week"
        events={myEvents}
        draggableAccessor={(event) => true}
        onEventDrop={moveEvent}
        onEventResize={resizeEvent}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        popup
        resizable
      />
  </div>
)
}

export default BookingCalendar