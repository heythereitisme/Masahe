import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../providers/AuthProvider'

const MTLanding = () => {
const auth = useContext(AuthContext)
const un = auth.user.displayName
const uid = auth.muid
const [userList, setUserList] = useState([])

useEffect (() => {
    getAppointments()
}, [])


const getAppointments = async() => {
    const req = await fetch(`/api/event/appointment/${uid}`);
        const users = await req.json();
        setUserList(users);
}

  return (
    <div className='min-h-screen bg-white text-center'>
        <Link to={`/mt/schedule/${un}`}>
        <button className="bg-red-400 hover:bg-blue-400 p-1 m-1 rounded-2xl w-1/3 h-24 mx-auto">
              Set Schedule
            </button>
                </Link>
                {userList && console.log(userList)}
    </div>
  )
}

export default MTLanding