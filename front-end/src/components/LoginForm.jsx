import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

export const LoginForm = () => {
	const authContext = useContext(AuthContext);
	const loginFn = authContext.login;
	const logoutFn = authContext.logout;
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const error = authContext.error;
	return (
		<div className="flex flex-col items-center">
		<div className="text-center bg-primary rounded-md drop-shadow-xl ml-10 mr-10 p-6 flex flex-col gap-10 mt-10
		md:w-96 md:content-center">
			<h1 className=" text-2xl font-heading text-white font-bold">Sign in</h1>
			<input className=" drop-shadow-md w-4/5 h-8 rounded-md p-2 mx-auto md:w-64 font-title"
				name="email"
				placeholder="Email"
				value={email}
				type="email"
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input className=" drop-shadow-md w-4/5 h-8 rounded-md p-2 mx-auto md:w-64 font-title"
				name="password"
				placeholder="Password"
				value={password}
				type="password"
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button onClick={() => loginFn(email, password)} className=" btn btn-secondary bg-white hover:text-white p-3 mb-5 text-primary mx-auto font-title">LOGIN</button>
			{error && <span>Wrong email or password</span>}

		</div>
		</div>
	);
};
