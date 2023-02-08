import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../providers/AuthProvider'

const MTLanding = () => {
const auth = useContext(AuthContext)
const un = auth.user.displayName
const uid = auth.muid
const navigate = useNavigate()
const [userList, setUserList] = useState([])
const options = {
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
};

useEffect (() => {
    getAppointments()
}, [])

const detailPage = (u) => {
  navigate(`/client/user?id=${u}`);
};


const getAppointments = async() => {
    const req = await fetch(`/api/event/appointment/${uid}`);
        const users = await req.json();
        setUserList(users);
}

  return (
    <div className='min-h-screen bg-white text-center flex flex-col'>
        <Link to={`/mt/schedule/${un}`}>
        <button className="bg-red-400 hover:bg-blue-400 p-1 m-1 rounded-2xl w-1/3 h-24 mx-auto">
              Set Schedule
            </button>
                </Link>
                <span className='text-3xl'>Upcoming appointments</span>
                <div className="grid grid-cols-4 gap-2 mt-5">
                {userList && 
                userList.map((u) => {
                  const date = new Date(u.start)
                  const readableDate = date.toLocaleDateString('en-US', options);
                  return(
                    <div key={u._id} className="bg-purple-200 flex flex-col rounded-lg">
                      <span>User: {u.resources.client.username}</span>
                      <span>Name: {u.resources.client.firstName} {u.resources.client.lastName}</span>
                      <span>Rating: {u.resources.client.avgRating}</span>
                      <span>Quadrant: {u.resources.client.quadrant[0]}</span>
                      <span>{readableDate}</span>
                      <div className='flex'>

                      <button
                      onClick={() => detailPage(u.resources.client.username)}
                      className="bg-red-400 hover:bg-blue-400 p-1 m-1 rounded-2xl w-1/2"
                      >
                      Details
                    </button>
                    <button
                      onClick={() => navigate(`/mt/schedule/${un}`)}
                      className="bg-red-400 hover:bg-blue-400 p-1 m-1 rounded-2xl w-1/2"
                      >
                      Reschedule
                    </button>
                      </div>
                    </div>
                  )
                })
              }
              </div>
    </div>
  )
}

export default MTLanding