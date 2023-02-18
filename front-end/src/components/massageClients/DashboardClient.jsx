import React from 'react'
import PastRated from '../PastRated'
import ClientHome from './ClientHome'

function DashboardClient() {
  return (
<div className='bg-white'>
    <ClientHome />
    <PastRated />    
</div>
  )
}

export default DashboardClient