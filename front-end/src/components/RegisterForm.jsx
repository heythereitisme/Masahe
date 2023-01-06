import React, { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

export const RegisterForm = () => {
	const authContext = useContext(AuthContext);
	const registerFn = authContext.register;
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const error = authContext.regError;
	return (
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
			<button onClick={() => registerFn(email, password)}>REGSTER</button>
			<br />
			{error && <span> User already exists</span>}
		</div>
	);
};
