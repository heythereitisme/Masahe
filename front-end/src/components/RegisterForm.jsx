import React, { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

export const RegisterForm = ({ permission }) => {
  const authContext = useContext(AuthContext);
  const registerFn = authContext.register;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [quadrant, setQuadrant] = useState("NW");
  const error = authContext.regError;
  
  const reg = (e) => {
    e.preventDefault()
    registerFn(
    email,
    password,
    displayName,
    firstName,
    lastName,
    permission,
    quadrant
  )}
  
  return (
    <div className='flex flex-col items-center'>
      <form
        className='text-center bg-secondary rounded-md drop-shadow-lg ml-10 mr-10 p-6 flex flex-col gap-10 md:w-96'
        onSubmit={reg}
      >
        <h1 className=' text-xl font-heading text-accent font-bold'>Sign up</h1>
        <input
          className=' drop-shadow-md w-4/5 h-8 rounded-md p-2 mx-auto md:w-64 font-title'
          placeholder='Email'
          value={email}
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className=' drop-shadow-md w-4/5 h-8 rounded-md p-2 mx-auto md:w-64 font-title'
          placeholder='Password'
          value={password}
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          className=' drop-shadow-md w-4/5 h-8 rounded-md p-2 mx-auto md:w-64 font-title'
          placeholder='Username'
          value={displayName}
          type={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />
        <input
          className=' drop-shadow-md w-4/5 h-8 rounded-md p-2 mx-auto md:w-64 font-title'
          placeholder='First Name'
          value={firstName}
          type={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          className=' drop-shadow-md w-4/5 h-8 rounded-md p-2 mx-auto md:w-64 font-title'
          placeholder='Last Name'
          value={lastName}
          type={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <select
          name='quadrant'
          id='quadrant'
          value={quadrant}
          onChange={(e) => setQuadrant(e.target.value)}
          className=' drop-shadow-md w-4/5 h-8 rounded-md p-2 mx-auto md:w-64 font-title'
        >
          <option value='NW'>NW</option>
          <option value='NE'>NE</option>
          <option value='SE'>SE</option>
          <option value='SW'>SW</option>
        </select>

        <button
          className='rounded-xl bg-primary p-3 mb-5 mx-auto text-white font-title'
          type='submit'
        >
          REGISTER
        </button>
        {error && <span> User already exists</span>}
      </form>
    </div>
  );
};
