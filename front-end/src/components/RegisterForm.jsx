import React, { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

export const RegisterForm = () => {
	const authContext = useContext(AuthContext);
	const registerFn = authContext.register;
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [displayName, setDisplayName] =useState("");
	const error = authContext.regError;
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
			<input
			className="w-48 border border-black mx-auto"
				placeholder="Username"
				value={displayName}
				type={displayName}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button 
			className="bg-secondary text-white mb-2 w-48 mx-auto rounded-lg"
			onClick={() => registerFn(email, password, displayName)}
			>
				REGISTER
			</button>
			{error && <span> User already exists</span>}
		</div>
	);
};
