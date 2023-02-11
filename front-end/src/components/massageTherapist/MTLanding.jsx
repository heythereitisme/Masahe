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
    <div className='min-h-screen bg-white text-center flex flex-col '>
        <Link to={`/mt/schedule/${un}`}>
        <button className="btn btn-primary w-48 h-18 font-heading font-bold text-lg bg-white text-primary hover:text-white mt-5 ">
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
                <span className='text-3xl font-heading text-primary mt-5'>Upcoming appointments</span>
                <div className="grid grid-cols-4 gap-2 mt-5">
                {upcoming.slice(0, 8).map((u) => {
                  const date = new Date(u.start)
                  const readableDate = date.toLocaleDateString('en-US', options);
                  return(
                    <div key={u._id} className="bg-slate-50 shadow-2xl rounded-lg p-4 ml-4 mr-4 text-left text-primary">
                     <div className='flex justify-between'>
                      <div className='flex flex-col'>
                      <span className='text-lg'>{u.resources.client.firstName} {u.resources.client.lastName}</span>
                      <span>{u.resources.client.username}</span>
                      <span>{u.resources.client.avgRating}</span>
                      <span>{u.resources.client.quadrant[0]}</span>
                      <span>{u.resources.client.address}</span>
                      <span>{readableDate}</span>
                      </div>
                      <div> <img src={u.avatar} className=' w-[6rem] h-[6rem] rounded-full shadow-xl ' /> </div> 
                      </div>
                      <div className='flex mt-3 justify-between'>
                      <button
                      onClick={() => detailPage(u.resources.client.username)}
                      className="btn btn-secondary font-title text-xs"
                      >
                      Details
                    </button>
                    <button
                      onClick={() => navigate(`/mt/schedule/${un}`)}
                      className="btn btn-secondary font-title text-xs"
                      >
                      Reschedule
                    </button>
                    <button
                      onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${u.resources.client.address}`)}
                      className="btn btn-secondary font-title text-xs"
                      >
                     Directions
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
                <span className='text-3xl font-heading text-primary'>Recent Appointments, leave a rating?</span>
                <div className="grid grid-cols-3 gap-2 mt-5 mb-5">
                {past.slice(0, 8).map((u) => {
                  const date = new Date(u.start)
                  const readableDate = date.toLocaleDateString('en-US', options);
                  return(
                    <div key={u._id} className="bg-slate-50 shadow-2xl rounded-lg p-4 ml-4 mr-4 text-left text-primary flex flex-col">
                      <div className='flex justify-between'>
                      <div className='flex flex-col'>
                      <span>User: {u.resources.client.username}</span>
                      <span>Name: {u.resources.client.firstName} {u.resources.client.lastName}</span>
                      <span>Rating: {u.resources.client.avgRating}</span>
                      <span>Was at: {readableDate}</span>
                      </div>
                      <div> <img src={u.avatar} className=' w-[6rem] h-[6rem] rounded-full shadow-xl ' /> </div> 
                      </div>
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
                      className="btn btn-secondary text-xs"
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