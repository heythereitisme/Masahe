import React, { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

export const LoginForm = () => {
	const authContext = useContext(AuthContext);
	const loginFn = authContext.login;
	const logoutFn = authContext.logout;
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const error = authContext.error;
	return (
		<div className="flex flex-col gap-2 mt-2 mb-2 bg-neutral w-64 mx-auto">
			<input
				className="w-48 border border-black mx-auto mt-2"
				placeholder="Email"
				value={email}
				type={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				className="w-48 border border-black mx-auto"
				placeholder="Password"
				value={password}
				type={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button 
			className="bg-secondary text-white mb-2 w-48 mx-auto rounded-lg"
			onClick={() => loginFn(email, password)}
			>
				LOGIN
			</button>
			{error && <span>Wrong email or password</span>}
		
		</div>
	);
};
