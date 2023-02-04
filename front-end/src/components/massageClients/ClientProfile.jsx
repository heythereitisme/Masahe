import React, { useContext } from 'react'
import { AuthContext } from '../../providers/AuthProvider'

function ClientProfile() {
  const auth = useContext(AuthContext)
  const logout = auth.logout

  return (
    <>
    <div>
      <div className="md:grid md:grid-cols-3 md:gap-6 rounded-sm bg-slate-50 ">
        <div className="md:col-span-1  rounded-sm bg-slate-50 flex flex-col place-content-between h-48">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-title leading-6 p-2 text-gray-900">Profile</h3>
            <p className="mt-1 text-sm font-body ml-2 text-gray-600">
              This information will be displayed publicly so be careful what you share.
            </p>
          </div>
          
          
         
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <form action="#" method="POST">
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label htmlFor="company-website" className="block text-md font-title text-gray-700">
                    Quadrant
                    
                    </label>
                    
                    <div className="dropdown dropdown-bottom">
    <label tabIndex={0} className="btn btn-secondary m-1 font-title">Area</label>
    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-white rounded-box w-52 text-primary">
    <li><a>North East</a></li>
    <li><a>North West</a></li>
    <li><a>South East</a></li>
    <li><a>South West</a></li>
    </ul>
    </div>


<div className="form-control">
  <label className="cursor-pointer label">
    <span className="label-text font-title text-neutral">South West</span>
    <input type="checkbox" checked className="checkbox checkbox-primary" />
  </label>
</div>
                  </div>
                  
                </div>

                <div>
                  <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                    About
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="you@example.com"
                      defaultValue={''} />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Brief description for your profile. URLs are hyperlinked.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Photo</label>
                  <div className="mt-1 flex items-center">
                    <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                      <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
                    <button
                      type="button"
                      className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Change
                    </button>
                  </div>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        First name
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                        Last name
                      </label>
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <input
                        type="text"
                        name="email-address"
                        id="email-address"
                        autoComplete="email"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                    </div>
                    <div className="col-span-6">
                      <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                        Street address
                      </label>
                      <input
                        type="text"
                        name="street-address"
                        id="street-address"
                        autoComplete="street-address"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                    </div>
                    <div className="col-span-6">
                      <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                        Phone number
                      </label>
                      <input
                        type="tel"
                        name="phone-number"
                        id="phone-number"
                        pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                        autoComplete="phone-number"
                        placeholder='123-456-789'
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                    </div>

                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                
                <button onClick={logout} 
                  className="mx-auto mb-5 w-24 h-10 rounded-md border border-gray-300 bg-secondary py-2 px-3 text-sm font-medium leading-4 text-white shadow-sm hover:bg-gray-50 hover:text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 "
                   >Log out</button>
                   
                <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-3 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ml-5"
                  >
                    Save
                  </button>
                </div>
          </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div> 
    </>)}

export default ClientProfile