import React from 'react'

function Hero() {
  return (
    // style={{ backgroundImage: `url("https://placeimg.com/1000/800/arch")` } img for hero if we need it
    <div className="min-h-screen bg-white">
     

   
     
        <div className=' w-[4.5rem] absolute  top-28 left-3 md:w-[8rem] md:top-32 md:left-44'>
        <img src="https://placeimg.com/192/192/people" className=' rounded-full drop-shadow-sm' />
        </div>
       
       <div>
        <div className='w-[5.5rem] absolute left-3 bottom-2 md:w-[7rem] md:bottom-6 md:left-48'>
        <img src="https://placeimg.com/192/192/people" className='rounded-full' />
        </div>

        </div>
        <div className='w-[5rem] absolute top-28 right-3 md:w-[7.5rem] md:top-36 md:right-44'>
        <img src="https://placeimg.com/192/192/people" className=' rounded-full' />
        </div>
       
       <div>
        <div className='w-[6rem] absolute right-3 bottom-1   md:w-[8.5 rem] md:right-48 md:bottom-8'>
        <img src="https://placeimg.com/192/192/people" className='rounded-full' />
        </div>
        </div>
       
     <div className=' absolute top-32 left-24 md:top-40 md:left-80 text-lg'>
      <p className='text-black w-[10rem] md:w-[11rem] italic'> "testimonial by a massage therpaist"</p>
      </div>
      <div className=' absolute bottom-6 right-24 md:bottom-14 md:right-64 md:text-lg'>
      <p className='text-black w-[9rem] md:w-[11rem] italic'> "testimonial by a massage client"</p>
      </div>
      
    
     {/* Hero section */}
      <div className='md:hero md:h-screen md:flex md:flex-col md:justify-center md:items-center '>      
         <div className="hero-content text-center text-align-center text-neutral-content m-5 md:flex md:justify-center">
          <div className="max-w-sm flex flex-col items-center mt-28">
            <h2 className="mb-10 text-5xl font-bold">Welcome to Masahe</h2>
            <h1 className='mb-10 text-3xl font-bold'>Find your massage therapist</h1>
            <p className="mb-10">Masahe is a safety practice management system that allows cleints receiving mobile services by massage therapists safely by reviewing the rating of their massage therapists prior to arriving at their location.</p>
           <span className='flex flex-col gap-4 items-center md:flex md:flex-row justify-center md:mt-4'> 
            <button className="btn btn-primary p-2 text-xs w-42 md:p-3 md:text-sm"> Massage Client</button>
            <button className='btn btn-primary p-2 text-xs w-42 md:p-3 md:text-sm items-center'> Massage Therapist </button>
            </span>
            </div>
          </div>
        </div>
  </div>	
  

  )
}

export default Hero