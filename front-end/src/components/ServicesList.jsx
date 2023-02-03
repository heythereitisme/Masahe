import React from 'react'

function ServicesList() {
  return (
   <div className='min-h-screen bg-white grid grid-rows-1'>

    
<div className=''>
    <div className="dropdown dropdown-bottom">
    <label tabIndex={0} className="btn btn-secondary m-1 font-title">Certification</label>
    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-white rounded-box w-52 text-primary">
    <li><a>Licensed</a></li>
    <li><a>Non-Licensed</a></li>
    </ul>
    </div>
    
    <div className="dropdown dropdown-bottom">
    <label tabIndex={0} className="btn btn-secondary m-1 font-title">Massage Type</label>
    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-white rounded-box w-52 text-primary">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
    </ul>
    </div>

    <div className="dropdown dropdown-bottom">
    <label tabIndex={0} className="btn btn-secondary m-1 font-title">Area</label>
    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-white rounded-box w-52 text-primary">
    <li><a>North East</a></li>
    <li><a>North West</a></li>
    <li><a>South East</a></li>
    <li><a>South West</a></li>
    </ul>
    </div>
    
    <div className="flex items-center ">
            <div className="flex space-x-1">
                <input
                    type="text"
                    className="block w-full px-4 py-2 text-accent bg-white border rounded-full focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-10"
                    placeholder="Search..."
                />
                <button className="px-4 text-white bg-neutral rounded-full ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
            </div>
        </div>

    </div>
   </div>
  )
}

export default ServicesList