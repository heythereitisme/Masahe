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
		<div  className=" bg-white min-h-screen ">

		
		<div className="text-center relative top-52">
			<h1 className=" text-xl mb-5">Sign in</h1>
			<input className=" drop-shadow-md mt-5 mb-5 w-3/5 h-8 rounded-sm p-2"
				name="email"
				placeholder="Email"
				value={email}
				type={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<br />
			<input className="drop-shadow-md mb-2 w-3/5 h-8 rounded-sm p-2"
				name="password"
				placeholder="Password"
				value={password}
				type={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<div className="w-3/5"> <Link to="/register" className="mt-2">Register</Link> </div>
			<br />
			<button onClick={() => loginFn(email, password)} className=" rounded-xl bg-primary p-3 mb m-5">LOGIN</button>
			<br />
			{error && <span>Wrong email or password</span>}

		</div>
		</div>
	);
};
