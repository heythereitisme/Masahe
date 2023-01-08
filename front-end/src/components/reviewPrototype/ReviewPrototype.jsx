import React, { useState, useEffect } from 'react'
import "./style.css"

const ReviewPrototype = () => {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    
 
    const addUser = async() => {
        console.log(firstname, lastname);
        const req = await fetch("/api/user", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              firstName: firstname,
              lastName: lastname
            })
          })
        const newUser = req.json()
        console.log(newUser)
    }

    const formSubmit = (e) => {
        e.preventDefault()
        
        console.log(addUser())
      };

  return (
    <div>
        <form onSubmit={formSubmit} className="user-creation-form">
            <span>Create User</span>
            <input 
                type="text" 
                placeholder='first name'
                onInput={(e) => setFirstname(e.target.value)}
            />
            <input 
                type="text" 
                placeholder='first name'
                onInput={(e) => setLastname(e.target.value)}
            />
            <button type='submit'>Create</button>
        </form>
        
    </div>
  )
}

export default ReviewPrototype