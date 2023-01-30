import React from 'react'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    // style={{ backgroundImage: `url("https://placeimg.com/1000/800/arch")` } img for hero if we need it
    <div className="min-h-screen bg-white min-w-screen">
      <div className='flex items-center relative top-16 md:top-16 md:pl-24 overflow-hidden'>
        
        <div className=' w-[6rem] md:w-[12rem]'>
        <img src="https://placeimg.com/192/192/people" className='rounded-full drop-shadow-sm' />
        </div> 
     <div className=' md:text-2xl '>
      <p className='text-black w-[10rem] md:w-[13rem] italic md:ml-5'> "testimonial by a massage therpaist"</p>
      </div>
     </div>
    
     {/* Hero section */}
      <div className='md:hero md:flex md:flex-col md:justify-center '>      
         <div className="hero-content text-center text-align-center text-neutral-content m-5 md:flex md:justify-center">
          <div className="max-w-sm flex flex-col items-center mt-12">
            <h2 className=" mb-5 text-5xl font-bold">Welcome to Masahe</h2>
            <h1 className='mb-10 text-3xl font-bold'>Find your massage therapist</h1>
            <p className="mb-10">Masahe is a safety practice management system that allows cleints receiving mobile services by massage therapists safely by reviewing the rating of their massage therapists prior to arriving at their location.</p>
           <div className='flex flex-col gap-4 items-center md:flex md:flex-row justify-center md:mt-4'> 
            <button className="btn btn-primary p-2 text-xs w-42 md:p-3 md:text-sm"><Link to={"/client/login"}> Sign in as Massage Client</Link></button>
            <button className='btn btn-primary p-2 text-xs w-42 md:p-3 md:text-sm items-center'><Link to={"/mt/login"}> Sign in as Massage Therapist </Link></button>
            </div>
            </div>
          </div>
        </div>

      <div className='flex items-center justify-end relative pb-12 md:pr-24 '>
        <div className='md:text-2xl'>
         <p className='text-black w-[10rem] md:w-[14rem] italic'> "testimonial by a massage client"</p>
        </div>

        <div className='w-[6rem] md:w-[12rem] '>
        <img src="https://placeimg.com/192/192/people" className='rounded-full' />
       
      </div>
      
        </div>
  </div>	
  

  )
}

export default Hero