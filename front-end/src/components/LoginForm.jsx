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
		<div  className=" bg-white min-h-screen p-1 text-center align-middle">

		
		<div>
			<input
				name="email"
				value={email}
				type={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<br />
			<input
				name="password"
				value={password}
				type={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<br />
			<button onClick={() => loginFn(email, password)}>LOGIN</button>
			<br />
			{error && <span>Wrong email or password</span>}
		</div>
		</div>
	);
};
