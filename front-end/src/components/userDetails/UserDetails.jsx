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
                return (
                  <div className='bg-white min-h-screen text-center flex flex-col'>
                          <h3 className='text-5xl m-1 font-heading text-primary'> {user.ratedUser.firstName} {user.ratedUser.lastName}</h3>   
                      <span className='text-xl m-1 text-primary'>
                          Rating: {Math.round(user.ratedUser.avgRating * 10) /10}   
                      </span>
                      <span>Quadrant(s): {user.ratedUser.quadrant.map((u) => <span key={u}>{u.toUpperCase()}</span>)}</span>
                      <span>{user.ratedUser.address}</span>
                      {user.ratedUser.licensed && <span>Registered until {new Date(user.ratedUser.licensed.date).toLocaleDateString()}</span>}
                      <img src={user.ratedUser.avatar} alt="avatar"  className=' w-[6rem] h-[6rem] rounded-full shadow-xl mx-auto'/>
                      <form onSubmit={formSubmit} className='flex flex-col w-screen mb-2 '>
                          <span className='text-5xl m-5 font-heading text-secondary'>Notes</span>
                          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className='w-2/3 min-h-[50vh] mx-auto bg-slate-100 rounded-lg drop-shadow-xl text-primary p-5'/>
                          <button type='submit' className='btn btn-primary font-title p-4 bg-white text-primary hover:text-white mt-5 w-48 mx-auto'>Save</button>
                      </form>
                      {user.ratedUser.open && <button onClick={() => bookUser(user.ratedUser.username)} className='btn btn-secondary font-title p-3 bg-white text-primary hover:text-white mt-2 w-48 mx-auto'>Book</button>}
                     <button onClick={returnPage} className='btn btn-secondary font-title p-3 bg-white text-primary hover:text-white mt-2 w-48 mx-auto'>Back</button>
                  </div>
              )  
            }
}

export default UserDetails