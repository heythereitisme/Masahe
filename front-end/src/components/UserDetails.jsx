import React from 'react'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

const UserDetails = () => {
    const [params, setParams] = useSearchParams()
    const [user, setUser] = useState({})
    const [value, setValue] = useState('')
    
    const getUserDetails = async(v) => {
        const serverReq = await fetch(`/api/rating/notes/${v}`)
        const userDetails = await serverReq.json()
        setUser(userDetails)
      }
    
      useEffect(() => {
        for (const entry of params.entries()) {
          const [param, value] = entry;
          console.log(param, value);
          setValue(value)
        }
        getUserDetails(value)
      }, [params])
    

  return (
    <div>UserDetails</div>
  )
}

export default UserDetails