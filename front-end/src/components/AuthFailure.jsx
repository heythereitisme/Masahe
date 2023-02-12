import React from 'react'
import { Link } from 'react-router-dom'

const AuthFailure = () => {
  return (
    <div className=" bg-white min-h-screen p-1 text-center align-middle flex flex-col justify-center items-center gap-5">
        <span className='text-5xl font-heading text-primary mb-3'>Authentication Failed</span>
        <button className="btn btn-primary p-2 text-xs w-42 md:p-3 md:text-sm bg-white text-primary hover:text-white"><Link to={"/client/login"}> Sign in as Massage Client</Link></button>
        <button className='btn btn-primary p-2 text-xs w-42 md:p-3 md:text-sm items-center bg-white text-primary hover:text-white'><Link to={"/mt/login"}> Sign in as Massage Therapist </Link></button>
    </div>
  )
}

export default AuthFailure