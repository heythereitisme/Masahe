import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../providers/AuthProvider'

const MTLanding = () => {
const auth = useContext(AuthContext)
const un = auth.user.displayName
const muid = auth.muid
const navigate = useNavigate()
const [userList, setUserList] = useState([])
const [rating, setRating] = useState("");
const upcoming = []
const past = []
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
    const req = await fetch(`/api/event/appointment/${muid}`);
        const users = await req.json();
        setUserList(users);
}

const submitRating = (e, u) => {
  e.preventDefault();
  const uid = u.resources.client._id;
  rateUser(uid);
};

const rateUser = async (u) => {
  const uid1 = muid;
  const uid2 = u;
  const req = await fetch("/api/rating", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ratingUser: uid1,
      ratedUser: uid2,
      rating: rating,
    }),
  });
  const rate = await req.json();
  console.log("Updated average:", rate.message);
  getAppointments();
};

  return (
    <div className='min-h-screen bg-white text-center flex flex-col'>
        <Link to={`/mt/schedule/${un}`}>
        <button className="bg-red-400 hover:bg-blue-400 p-1 m-1 rounded-2xl w-1/3 h-24 mx-auto">
              Set Schedule
            </button>
                </Link>
                {userList && 
                userList.forEach((u) => {
                  const date = new Date(u.start)
                  if(date > new Date()){
                    upcoming.push(u)
                  } else {
                    past.push(u)
                  }
                })}
                {upcoming[0] && 
                <>
                <span className='text-3xl'>Upcoming appointments</span>
                <div className="grid grid-cols-4 gap-2 mt-5">
                {upcoming.map((u) => {
                  const date = new Date(u.start)
                  const readableDate = date.toLocaleDateString('en-US', options);
                  return(
                    <div key={u._id} className="bg-purple-200 flex flex-col rounded-lg">
                      <span>User: {u.resources.client.username}</span>
                      <span>Name: {u.resources.client.firstName} {u.resources.client.lastName}</span>
                      <span>Rating: {u.resources.client.avgRating}</span>
                      <span>Quadrant: {u.resources.client.quadrant[0]}</span>
                      <span>Address: {u.resources.client.address}</span>
                      <span>At: {readableDate}</span>
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
                    <button
                      onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${u.resources.client.address}`)}
                      className="bg-red-400 hover:bg-blue-400 p-1 m-1 rounded-2xl w-1/2"
                      >
                      Get Directions
                    </button>
                      </div>
                    </div>
                    )
                  })}
                  </div>
                  </>
                }
                {past[0] && 
                <>
                <span className='text-3xl'>Recent Appointments, leave a rating?</span>
                <div className="grid grid-cols-4 gap-2 mt-5">
                {past.map((u) => {
                  const date = new Date(u.start)
                  const readableDate = date.toLocaleDateString('en-US', options);
                  return(
                    <div key={u._id} className="bg-purple-200 flex flex-col rounded-lg">
                      <span>User: {u.resources.client.username}</span>
                      <span>Name: {u.resources.client.firstName} {u.resources.client.lastName}</span>
                      <span>Rating: {u.resources.client.avgRating}</span>
                      <span>Was at: {readableDate}</span>
                      <div className='flex'>
                      <form
                    onSubmit={(e) => submitRating(e, u)}
                    className="container mx-auto"
                  >
                    <input
                      type="text"
                      placeholder="Enter rating number"
                      onInput={(e) => setRating(e.target.value)}
                      className="w-1/2"
                    />
                    <button
                      type="submit"
                      className="bg-red-400 hover:bg-blue-400 p-1 m-1 rounded-2xl"
                    >
                      Submit Rating
                    </button>
                  </form>
                      </div>
                    </div>
                    )
                  })}
                </div>
                </>
                }
              
              </div>
    
  )
}

export default MTLanding