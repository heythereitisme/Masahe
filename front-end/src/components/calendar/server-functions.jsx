export const listEvents = async(id) => {
    let serverReq = await fetch(`/api/event/mt/${id}`)
    let events = await serverReq.json()
    return events
  }

  export const listClientEvents = async(id) => {
    let serverReq = await fetch(`/api/event/${id}`)
    let events = await serverReq.json()
    console.log('events:', events)
    return events
  }
  
  export const createEvent = async(e, open) => {
    await fetch("/api/event", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(e)
    }) 
    await fetch("/api/user", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(open)
    })
  }
  
  export const updateEvent = async(e) => {
    let serverReq = await fetch("/api/event", {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(e)
    })
    const updatedEvent = await serverReq.json()
    console.log(updatedEvent)
  }
  
  export const deleteEvent = async(e) => {
    let serverReq = await fetch("/api/event/", {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(e)
    })
    const deletedEvent = await serverReq.json()
    console.log(deletedEvent)
  }