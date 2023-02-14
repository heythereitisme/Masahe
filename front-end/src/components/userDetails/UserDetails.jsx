import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../providers/AuthProvider'
import AuthFailure from '../AuthFailure'

const UserDetails = () => {
    const [params, setParams] = useSearchParams()
    const [user, setUser] = useState({})
    const [userValue, setUserValue] = useState('')
    const [notes, setNotes] = useState('')
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const permission = auth.permission
    
    const getUserDetails = async() => {
        try{
          const serverReq = await fetch(`/api/rating/notes/${userValue}`)
          const userDetails = await serverReq.json()
          setUser(userDetails)
        } catch{
          const serverReq = await fetch("/api/rating", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ratingUser: auth.muid,
              ratedUser: userValue
            }),
            
          });
          const serverReq2 = await fetch(`/api/rating/notes/${userValue}`)
          const userDetails = await serverReq2.json()
          setUser(userDetails)
        
        }
      }
    
      useEffect(() => {
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
        navigate(-1)
      }

      const bookUser = (u) => {
        console.log(u)
        navigate(`/client/booking/${u}`)
      }

      if(!user.ratedUser){
          return (
              <div className='bg-white min-h-screen text-center font-heading text-primary'>Loading user...</div>
              )
            } else {
              if(user.ratedUser.permission === permission){
                return <AuthFailure />
              }
              if(user.ratedUser.permission === 1){
                return (
                  <div className='bg-white min-h-screen text-center flex flex-col'>
                          {/* <h1 className='text-3xl m-1 mt-10 font-heading text-primary'>{user.ratedUser.username}</h1> */}
                          <h3 className='text-5xl m-1 font-heading text-primary'> {user.ratedUser.firstName} {user.ratedUser.lastName}</h3>
                      <span className='text-xl m-1 text-primary'>
                          {user.ratedUser.avgRating}   
                      </span>
                      <form onSubmit={formSubmit} className='flex flex-col w-screen mb-2 '>
                          <span className='text-5xl m-5 font-heading text-secondary'>Notes</span>
                          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className='w-2/3 min-h-[50vh] mx-auto bg-slate-100 rounded-lg drop-shadow-xl text-primary p-5'/>
                          <div>
                          <button type='submit' className='btn btn-primary font-title p-4 bg-white text-primary hover:text-white mt-5'>Save</button>
                          </div>
                      </form>
                     <div> <button onClick={returnPage} className='btn btn-secondary font-title p-3 bg-white text-primary hover:text-white mt-2'>Back</button> </div>
                  </div>
              )
              } else if (user.ratedUser.permission === 2) {
                return(
                  <div className='bg-stone-200 min-h-screen text-center flex flex-col'>
                          <h1 className='text-3xl m-1'>User Details: {user.ratedUser.username}</h1>
                          <h3 className='text-5xl m-1'>Name: {user.ratedUser.firstName} {user.ratedUser.lastName}</h3>
                      <span className='text-xl m-1'>
                          Rating: {user.ratedUser.avgRating}   
                      </span>
                      <form onSubmit={formSubmit} className='flex flex-col w-screen mb-2'>
                          <span>Notes:</span>
                          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className='w-2/3 min-h-[50vh] mx-auto'/>
                          <button type='submit' className='bg-green-400 hover:bg-blue-400 p-1 m-1 rounded-2xl w-2/3 mx-auto'>Save</button>
                      </form>
                      <button onClick={() => bookUser(user.ratedUser.username)} className='bg-green-400 hover:bg-blue-400 p-1 m-1 rounded-2xl'>Book</button>
                      <button onClick={returnPage} className='bg-red-400 hover:bg-blue-400 p-1 m-1 rounded-2xl'>Back</button>
                  </div>
              )
              }
              
            }
}

export default UserDetails