import React from 'react'

function Hero() {
  return (
    // style={{ backgroundImage: `url("https://placeimg.com/1000/800/arch")` } img for hero if we need it
    <div className="min-h-screen bg-white">
     

   
     
        <div className=' w-[4.5rem] absolute  top-28 left-3 '>
        <img src="https://placeimg.com/192/192/people" className=' rounded-full drop-shadow-sm' />
        </div>
       
       <div>
        <div className='w-[5.5rem] absolute left-3 bottom-2'>
        <img src="https://placeimg.com/192/192/people" className='rounded-full' />
        </div>

        </div>
        <div className='w-[5rem] absolute top-28 right-3 '>
        <img src="https://placeimg.com/192/192/people" className=' rounded-full' />
        </div>
       
       <div>
        <div className='w-[6rem] absolute right-3 bottom-2'>
        <img src="https://placeimg.com/192/192/people" className='rounded-full' />
        </div>
        </div>
       
     
      
    
     {/* Hero section */}
      <div className='hero h-screen flex flex-col justify-center items-center '>      
         <div className="hero-content text-center text-align-center text-neutral-content m-5">
          <div className="max-w-sm">
            <h2 className="mb-10 text-5xl font-bold">Welcome to Masahe</h2>
            <h1 className='mb-10 text-3xl font-bold'>Find your massage therapist</h1>
            <p className="mb-10">Masahe is a safety practice management system that allows cleints receiving mobile services by massage therapists safely by reviewing the rating of their massage therapists prior to arriving at their location.</p>
           <span className='flex flex-col gap-4 items-center'> 
            <button className="btn btn-primary p-2 text-xs w-42"> Massage Client</button>
            <button className='btn btn-primary p-3 text-xs w-42'> Massage Therapist </button>
            </span>
            </div>
          </div>
        </div>
  </div>	
  

  )
}

export default Hero