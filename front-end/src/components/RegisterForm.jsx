import React, { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

export const RegisterForm = ({permission}) => {
	const authContext = useContext(AuthContext);
	const registerFn = authContext.register;
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [displayName, setDisplayName] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const error = authContext.regError;
	return (
		<div className="text-center bg-secondary rounded-md shadow-xl ml-10 mr-10 p-6 flex flex-col gap-10">
		<h1 className=" text-xl">Sign up</h1>
		<input className=" drop-shadow-md w-4/5 h-8 rounded-md p-2 mx-auto"
				placeholder="Email"
				value={email}
				type={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input className=" drop-shadow-md w-4/5 h-8 rounded-md p-2 mx-auto"
				placeholder="Password"
				value={password}
				type={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<input
			className=" drop-shadow-md w-4/5 h-8 rounded-md p-2 mx-auto"
				placeholder="Username"
				value={displayName}
				type={displayName}
				onChange={(e) => setDisplayName(e.target.value)}
			/>
			<input
			className=" drop-shadow-md w-4/5 h-8 rounded-md p-2 mx-auto"
				placeholder="First Name"
				value={firstName}
				type={firstName}
				onChange={(e) => setFirstName(e.target.value)}
			/>
			<input
			className=" drop-shadow-md w-4/5 h-8 rounded-md p-2 mx-auto"
				placeholder="Last Name"
				value={lastName}
				type={lastName}
				onChange={(e) => setLastName(e.target.value)}
			/>
			<button 
			className="rounded-xl bg-primary p-3 mb-5 mx-auto text-white"
			onClick={() => registerFn(email, password, displayName, firstName, lastName, permission)}
			>
				REGISTER
			</button>
			{error && <span> User already exists</span>}
		</div>
	);
};
