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
        navigate("/client/booking")
      }

      const bookUser = (u) => {
        console.log(u)
        navigate(`/client/booking/${u}`)
      }

      if(!user.ratedUser){
          return (
              <div className='bg-stone 200 min-h-screen text-center'>Loading user</div>
              )
            } else {
                return (
                    <div className='bg-stone-200 min-h-screen text-center flex flex-col'>
                            <h1 className='text-3xl m-1'>User Details:</h1>
                            <h3 className='text-5xl m-1'>Name: {user.ratedUser.firstName} {user.ratedUser.lastName}</h3>
                        <span className='text-xl m-1'>
                            Rating: {user.ratedUser.avgRating}   
                        </span>
                        <form onSubmit={formSubmit} className='flex flex-col w-screen mb-2'>
                            <span>Notes:</span>
                            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className='w-2/3 min-h-[50vh] mx-auto'/>
                            <button type='submit' className='bg-green-400 hover:bg-blue-400 p-1 m-1 rounded-2xl w-2/3 mx-auto'>Save</button>
                        </form>
                        <button onClick={() => bookUser(user.ratedUser._id)} className='bg-green-400 hover:bg-blue-400 p-1 m-1 rounded-2xl'>Book</button>
                        <button onClick={returnPage} className='bg-red-400 hover:bg-blue-400 p-1 m-1 rounded-2xl'>Back</button>
                    </div>
                )
            }
}

export default UserDetails