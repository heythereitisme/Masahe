import React from 'react'

function AboutUs() {
  return (
    <div className='bg-white'>
    <div className="container flex justify-center mx-auto pt-16 bg-white">
        <div>
            <p className="text-primary text-lg text-center font-normal font-heading pb-3">BUILDING TEAM</p>
            <h1 className="xl:text-4xl text-3xl text-center text-gray-800 font-extrabold font-title pb-6 sm:w-4/6 w-5/6 mx-auto">The Talented People Behind the Scenes</h1>
        </div>
    </div>
    <div className="w-full bg-gray-100 px-10 pt-10">
        <div className="container mx-auto">
            <div className="lg:flex md:flex sm:flex items-center xl:justify-around flex-wrap md:justify-around sm:justify-around lg:justify-around">

                <div className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
                    <div className="rounded overflow-hidden shadow-md bg-white">
                        <div className="absolute -mt-20 w-full flex justify-center">
                            <div className="h-32 w-32">
                                <img src="/Cobi.png" alt className="rounded-full object-cover h-full w-full shadow-md p-1" />
                            </div>
                        </div>
                        <div className="px-6 mt-16 pb-8">
                            <div className="font-bold text-3xl text-center font-heading pb-1 text-secondary">Cobi Reeves</div>
                            <p className="text-black text-sm text-center font-title">Backend Developer</p>
                            <p className="text-center text-black text-base pt-3 font-normal font-body">Cobi's interests in technology gears towards research and structural data. His greatest strengths is determining the root cause of the challenges that come my way. Recently he's completed an intensive full stack development program with InceptionU and he is looking forward to continuing as an active member in Calgarys tech community!</p>
                           
                        </div>
                    </div>
                </div>

                <div className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
                    <div className="rounded overflow-hidden shadow-md bg-white">
                        <div className="absolute -mt-20 w-full flex justify-center">
                            <div className="h-32 w-32">
                                <img src="/Abneet.png" alt className="rounded-full object-cover h-full w-full shadow-md p-1" />
                            </div>
                        </div>
                        <div className="px-6 mt-16 pb-8">
                            <div className="font-bold text-3xl text-center font-heading pb-1 text-secondary">Abneet Pabyal</div>
                            <p className="text-black text-sm text-center font-title">Frontend Developer</p>
                            <p className="text-center text-black text-base pt-3 font-normal font-body"> Abneet is a supportive, and caring man. Honouring work-ethics passed down from his father, he embodies family values. A curious learner, who applies himself towards building a career as a well-versed and competent front-end developer, coupling it with his skillset in strategic planning, and marketing.</p>
                           
                        </div>
                    </div>
                </div>

                <div className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
                    <div className="rounded overflow-hidden shadow-md bg-white">
                        <div className="absolute -mt-20 w-full flex justify-center">
                            <div className="h-32 w-32">
                                <img src="Dhaneesh.png" alt className="rounded-full object-cover h-full w-full shadow-md p-1" />
                            </div>
                        </div>
                        <div className="px-6 mt-16 pb-8">
                            <div className="font-bold text-3xl text-center font-heading pb-1 text-secondary">Dhaneesh Kuniyil</div>
                            <p className="text-black text-sm text-center font-title">Backend Developer</p>
                            <p className="text-center text-black text-base pt-3 font-normal font-body">Exploration and discovery are at the heart of Dhaneesh's technological endeavours. He has experience as a semiconductor CAD engineer and comes from an electronics background. He has finished InceptionU's project-based Full Stack Development program and is now ready to transition into the innovative field of software development.</p>
                        </div>
                    </div>
                </div>
                
                <div className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
                    <div className="rounded overflow-hidden shadow-md bg-white">
                        <div className="absolute -mt-20 w-full flex justify-center">
                            <div className="h-32 w-32">
                                <img src="Al.png" alt className="rounded-full object-cover h-full w-full shadow-md p-1" />
                            </div>
                        </div>
                        <div className="px-6 mt-16 pb-8">
                            <div className="font-bold text-3xl text-center font-heading pb-1 text-secondary">Al Del Degan</div>
                            <p className="text-black text-sm text-center font-title">Scrum Master</p>
                            <p className="text-center text-black text-base pt-3 font-normal font-body">As a well-known leader in Calgary's innovation ecosystem, Al Del Degan has a background in computer science with a diverse career working as a software developer, business analyst, and project manager. He has held various leadership roles, started multiple entrepreneurial ventures, and is the creator and producer of the Leaders, Innovators, and Big Ideas podcast for Rainforest Alberta.</p>
                            
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</div>
);

  
}

export default AboutUs