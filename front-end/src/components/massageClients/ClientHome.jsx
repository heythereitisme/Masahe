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
  navigate(`/mt/user?id=${u}`);
};

const getAppointments = async() => {
    const req = await fetch(`/api/event/booked/${muid}`);
        const users = await req.json();
        setUserList(users);
}

const submitRating = (e, u) => {
  e.preventDefault();
  const uid = u.resources.user._id;
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
                  const uRating = Math.round(u.resources.user.avgRating);
                  return(
                    <div key={u._id} className="bg-slate-50 shadow-2xl rounded-lg p-4 ml-4 mr-4 text-left text-primary">
                     <div className='flex justify-between'>
                      <div className='flex flex-col'>
                      <span className='text-lg'>{u.resources.user.firstName} {u.resources.user.lastName}</span>
                      <span>{u.resources.user.username}</span>
                      <div className="rating">
                  <input
                        type="radio"
                        value={0}
                        className="rating-hidden"
                        checked={uRating < 1 || !uRating}
                        readOnly
                      />
                      <input
                        type="radio"
                        value={1}
                        className="mask mask-star-2 bg-orange-400"
                        checked={uRating === 1}
                        readOnly
                      />
                      <input
                        type="radio"
                        className="mask mask-star-2 bg-orange-400"
                        value={2}
                        checked={uRating === 2}
                        readOnly
                      />
                      <input
                        type="radio"
                        name="rating-2"
                        value={3}
                        className="mask mask-star-2 bg-orange-400"
                        checked={uRating === 3}
                        readOnly
                      />
                      <input
                        type="radio"
                        value={4}
                        className="mask mask-star-2 bg-orange-400"
                        checked={uRating === 4}
                        readOnly
                      />
                      <input
                        type="radio"
                        value={5}
                        className="mask mask-star-2 bg-orange-400"
                        checked={uRating === 5}
                        readOnly
                      />
                    </div>
                      <span>Works in: {u.resources.user.quadrant.map((q) => <span key={q}>{q}</span>)}</span>
                      <span>{u.resources.user.address}</span>
                      <span>{readableDate}</span>
                      </div>
                      <div> <img src={u.resources.user.avatar} className=' w-[6rem] h-[6rem] rounded-full shadow-xl ' /> </div> 
                      </div>
                      <div className='flex mt-3 justify-between'>
                      <button
                      onClick={() => detailPage(u.resources.user.username)}
                      className="btn btn-secondary font-title text-xs"
                      >
                      Details
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
                  const uRating = Math.round(u.resources.user.avgRating);
                  return(
                    <div key={u._id} className="bg-slate-50 shadow-2xl rounded-lg p-4 ml-4 mr-4 text-left text-primary flex flex-col">
                      <div className='flex justify-between'>
                      <div className='flex flex-col'>
                      <span>User: {u.resources.user.username}</span>
                      <span>Name: {u.resources.user.firstName} {u.resources.client.lastName}</span>
                      <div className="rating">
                  <input
                        type="radio"
                        value={0}
                        className="rating-hidden"
                        checked={uRating < 1 || !uRating}
                        readOnly
                      />
                      <input
                        type="radio"
                        value={1}
                        className="mask mask-star-2 bg-orange-400"
                        checked={uRating === 1}
                        readOnly
                      />
                      <input
                        type="radio"
                        className="mask mask-star-2 bg-orange-400"
                        value={2}
                        checked={uRating === 2}
                        readOnly
                      />
                      <input
                        type="radio"
                        name="rating-2"
                        value={3}
                        className="mask mask-star-2 bg-orange-400"
                        checked={uRating === 3}
                        readOnly
                      />
                      <input
                        type="radio"
                        value={4}
                        className="mask mask-star-2 bg-orange-400"
                        checked={uRating === 4}
                        readOnly
                      />
                      <input
                        type="radio"
                        value={5}
                        className="mask mask-star-2 bg-orange-400"
                        checked={uRating === 5}
                        readOnly
                      />
                    </div>
                      <span>Was at: {readableDate}</span>
                      </div>
                      <div> <img src={u.resources.user.avatar} className=' w-[6rem] h-[6rem] rounded-full shadow-xl ' /> </div> 
                      </div>
                      <div className='flex'>
                      <form
                    onChange={(e) => setRating(e.target.value)}
                    onSubmit={(e) => submitRating(e, u)}
                    className="flex justify-between m-5 items-center gap-3"
                  >
                    <span>Rate:</span>
                    <div className="rating">
                      <input
                        type="radio"
                        name="rating-2"
                        value={1}
                        className="mask mask-star-2 bg-orange-400"
                      />
                      <input
                        type="radio"
                        name="rating-2"
                        value={2}
                        className="mask mask-star-2 bg-orange-400"
                      />
                      <input
                        type="radio"
                        name="rating-2"
                        value={3}
                        className="mask mask-star-2 bg-orange-400"
                        defaultChecked
                      />
                      <input
                        type="radio"
                        name="rating-2"
                        value={4}
                        className="mask mask-star-2 bg-orange-400"
                      />
                      <input
                        type="radio"
                        name="rating-2"
                        value={5}
                        className="mask mask-star-2 bg-orange-400"
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="btn btn-secondary font-title"
                      >
                        Submit Rating
                      </button>
                    </div>
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