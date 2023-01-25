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
		<div className="bg-white min-h-screen">
		<div className="text-center relative top-52 bg-secondary rounded-md shadow-xl ml-10 mr-10 p-6 ">
		<h1 className=" text-xl mb-5">Sign up</h1>
			<input className=" drop-shadow-md mt-5 mb-5 w-4/5 h-8 rounded-md p-2"
				name="email"
				value={email}
				type={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<br />
			<input className="drop-shadow-md mb-2 w-4/5 h-8 rounded-md p-2"
				name="password"
				value={password}
				type={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<input
			className="w-48 border border-black mx-auto"
				placeholder="Username"
				value={displayName}
				type={displayName}
				onChange={(e) => setDisplayName(e.target.value)}
			/>
			<input
			className="w-48 border border-black mx-auto"
				placeholder="First Name"
				value={firstName}
				type={firstName}
				onChange={(e) => setFirstName(e.target.value)}
			/>
			<input
			className="w-48 border border-black mx-auto"
				placeholder="Last Name"
				value={lastName}
				type={lastName}
				onChange={(e) => setLastName(e.target.value)}
			/>
			<button 
			className="bg-secondary text-white mb-2 w-48 mx-auto rounded-lg"
			onClick={() => registerFn(email, password, displayName, firstName, lastName, permission)}
			>
				REGISTER
			</button>
			{error && <span> User already exists</span>}
		</div>
		</div>
	);
};
