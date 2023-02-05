import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm';
import ClientProfile from '../components/massageClients/ClientProfile';
import Profile from '../components/massageTherapist/Profile'
import { AuthContext } from '../providers/AuthProvider';

const ProfilePage = () => {
  const authContext = useContext(AuthContext);
	const user = authContext.user;
  const permission = authContext.permission
  
  if(!user){
    return(
      <div className=" bg-white min-h-screen p-1 text-center align-middle flex flex-col justify-center items-center gap-5">
        <span className='text-5xl font-heading'>Please Log in.</span>
      <button className="btn btn-primary p-2 text-xs w-42 md:p-3 md:text-sm"><Link to={"/client/login"}> Sign in as Massage Client</Link></button>
      <button className='btn btn-primary p-2 text-xs w-42 md:p-3 md:text-sm items-center'><Link to={"/mt/login"}> Sign in as Massage Therapist </Link></button>
</div>
      )
  } else {
    if(permission >= 2){
      return (
          <Profile value={2}/>
      )
    } else if (permission === 1) {
      return(
        <Profile value={1} />
      )
    }
    }
}

export default ProfilePage