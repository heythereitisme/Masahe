import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className="navbar bg-primary drop-shadow-lg">
    <div className="navbar-start">
      <div className="dropdown z-10">
        <label tabIndex={0} className="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </label>
        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow rounded-box w-52">
          <li className=' font-heading text-exl'><Link to='/'>Home</Link></li>
          <li><Link to="/client/booking"> Booking </Link> </li>
          <li><Link to="/mt/schedule"> Scheduling </Link> </li>
          <li tabIndex={0}>
            <a className="justify-between">
            Services
              <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg>
            </a>
            <ul className="p-2 z-1 bg-white">
              <li><a>Submenu 1</a></li>
              <li><a>Submenu 2</a></li>
            </ul>
          </li>
        
        </ul>
      </div>
      <img src="/Logo-H.svg" className='w-36 m-1 rounded-lg' alt="" />
     
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
        <li><Link to='/'>Home</Link></li>
       <li> <Link to="/client/booking"> Booking </Link> </li>
       <li><Link to="/mt/schedule"> Scheduling </Link> </li>
         
       <li tabIndex={0}>
            <a className="justify-between">
              Services
              <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg>
            </a>
            <ul className="p-2 z-50">
              <li><a>Submenu </a></li>
              <li><a>Submenu 2</a></li>
            </ul>
          </li>
       
      </ul>
    </div>
    <div className="navbar-end">
    
    </div>
    
  </div>
  )
}

export default Navbar