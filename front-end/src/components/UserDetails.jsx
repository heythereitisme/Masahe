import React from 'react'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

const UserDetails = () => {
    const [params, setParams] = useSearchParams()
    const [user, setUser] = useState({})
    const [userValue, setUserValue] = useState('')
    
    const getUserDetails = async() => {
        console.log("v", userValue)
        const serverReq = await fetch(`/api/rating/notes/${userValue}`)
        const userDetails = await serverReq.json()
        setUser(userDetails)
        console.log(userDetails)
      }
    
      useEffect(() => {
        console.log(params)
            for (const entry of params.entries()) {
                const [param, value] = entry;
                console.log(param, value,);
                setUserValue(value)            
            }
      }, [params])
    
      useEffect(() => {
        if(userValue){
            getUserDetails()
        }
      }, [userValue])

      if(!user){
          return (
              <div className='App'>Loading user</div>
              )
            } else {
                return (
                    <div className='App'>
                        <span>
                            Rating: {user.rating}   
                        </span>
                        <span>
                            <input type="text" value={user.notes} />
                        </span>
                    </div>
                )
            }
}

export default UserDetails