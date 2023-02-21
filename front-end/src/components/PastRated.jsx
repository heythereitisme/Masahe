import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../providers/AuthProvider'

const PastRated = () => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const muid = auth.muid
    const permission = auth.permission
    const [userList, setUserList] = useState([])

    const getPastRated = async() => {
        const req = await fetch(`/api/rating/${muid}`);
            const users = await req.json();
            setUserList(users);
    }

    useEffect(() => {
        getPastRated()
    }, [])

    const detailPage = (u) => {
        if(permission === 2){
            navigate(`/client/user?id=${u}`);
        } else if(permission === 1){
            navigate(`/mt/user?id=${u}`);
        }
      };

  return (<div className='text-center bg-white'>
     <div className='bg-slate-100 p-5 drop-shadow-xl text-center '>
        <span className='text-3xl font-heading text-primary mt-5 text-center'>Recently Rated</span>
        </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-2 mt-5">
        {userList[0] && 
        userList.slice(0, 8).map((u) => {
            const uRating = Math.round(u.ratedUser.avgRating)
            return(
                <div key={u._id} className="bg-slate-50 shadow-2xl rounded-lg p-4 ml-4 mr-4 text-left text-primary">
                     <div className='flex justify-between'>
                      <div className='flex flex-col'>
                      <span className='text-lg'>{u.ratedUser.firstName} {u.ratedUser.lastName}</span>
                      <span>{u.ratedUser.username}</span>
                      <div className="rating">
                        <span>Rating:</span>
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
                        <span>Your rating: {u.rating}</span>
                      <span>{u.ratedUser.quadrant.map((u) => <span key={u}>{u.toUpperCase()}</span>)}</span>
                      <span>{u.ratedUser.address}</span>
                      </div>
                      <div> <img src={u.ratedUser.avatar} className=' w-[6rem] h-[6rem] rounded-full shadow-xl ' /> </div> 
                      </div>
                      <div className='flex mt-3 justify-between'>
                      <button
                      onClick={() => detailPage(u.ratedUser.username)}
                      className="btn btn-secondary font-title text-xs"
                      >
                      Details
                    </button>
                      </div>
                    </div>
            )
        })}
    </div>
        </div>
  )
}

export default PastRated