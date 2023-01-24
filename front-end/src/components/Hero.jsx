import React from 'react'

function Hero() {
  return (
    // style={{ backgroundImage: `url("https://placeimg.com/1000/800/arch")` } img for hero if we need it
    <div className="min-h-screen bg-white">
     

   
      <span>
        <div className='position-relative top-16 '>
        <img src="https://placeimg.com/192/192/people" className='w-24 rounded-full' />
        </div>
        </span>
       {/* <div>
        <div className='w-32 position-absolute'>
        <img src="https://placeimg.com/192/192/people" className='rounded-full' />
        </div>
        </div> */}
       
     
      
    
     {/* Hero section */}
      <div className='hero'>      
        <div className="hero-overlay bg-opacity-0"></div>
         <div className="hero-content text-center text-align-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Who are we?</h1>
            <p className="mb-5">Masahe is a safety practice management system that allows cleints receiving mobile services by massage therapists safely by reviewing the rating of their massage therapists prior to arriving at their location.</p>
           <span className='flex justify-around'> 
            <button className="btn btn-primary"> Massage Client</button>
            <button className='btn btn-primary w-22 p-2'> Massage Therapist </button>
            </span>
            </div>
          </div>
        </div>
  </div>	
  

  )
}

export default Hero