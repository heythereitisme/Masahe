import React from 'react'
import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

const UserDetails = () => {
    const [params, setParams] = useSearchParams()
    const [user, setUser] = useState({})
    const [userValue, setUserValue] = useState('')
    const [notes, setNotes] = useState('')
    const navigate = useNavigate()
    
    const getUserDetails = async() => {
        const serverReq = await fetch(`/api/rating/notes/${userValue}`)
        const userDetails = await serverReq.json()
        setUser(userDetails)
        console.log(userDetails)
      }
    
      useEffect(() => {
        console.log(params)
            for (const entry of params.entries()) {
                const [param, value] = entry;
                setUserValue(value)            
            }
      }, [params])
    
      useEffect(() => {
        if(userValue){
            getUserDetails()
        }
      }, [userValue])

      useEffect(() => {
        if(user.notes){
            setNotes(user.notes)
        }
      }, [user])

      const formSubmit = (e) => {
        e.preventDefault();
        saveNotes()
      };

      const saveNotes = async() => {
        const req = await fetch("/api/rating/notes", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              _id: user._id,
              notes: notes
            }),
          });
          const updated = await req.json()
          console.log(updated)
      }

      const returnPage = () => {
        navigate("/client/review")
      }

      if(!user.ratedUser){
          return (
              <div>Loading user</div>
              )
            } else {
                return (
                    <div className='App'>
                        <div className='h3-holder'>
                            <h3>User Details:</h3>
                            <h3>Name: {user.ratedUser.firstName} {user.ratedUser.lastName}</h3>
                        </div>
                        <span>
                            Rating: {user.ratedUser.avgRating}   
                        </span>
                        <form onSubmit={formSubmit} className='note-field'>
                            <span>Notes:</span>
                            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className='note-box'/>
                            <button type='submit'>Save</button>
                        </form>
                        <button onClick={returnPage} className='back-button'>Back</button>
                    </div>
                )
            }
}

export default UserDetails