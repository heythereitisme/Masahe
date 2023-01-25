import React, { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

export const RegisterForm = () => {
	const authContext = useContext(AuthContext);
	const registerFn = authContext.register;
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
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
			<br />
			<button onClick={() => registerFn(email, password)}className=" rounded-xl bg-primary p-3 mb m-5">REGISTER</button>
			<br />
			{error && <span> User already exists</span>}
		</div>
		</div>
	);
};
