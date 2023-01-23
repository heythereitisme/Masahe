import React from 'react'

function Hero() {
  return (
    // style={{ backgroundImage: `url("https://placeimg.com/1000/800/arch")` } img for hero if we need it
    <div className="hero min-h-screen bg-white">
        <div className="hero-overlay bg-opacity-0"></div>
         <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Who are we?</h1>
            <p className="mb-5">Masahe is a safety practice management system that allows cleints receiving mobile services by massage therapists safely by reviewing the rating of their massage therapists prior to arriving at their location.</p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
  </div>	


  )
}

export default Hero