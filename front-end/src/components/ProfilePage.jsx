import React, { useContext } from "react";
import { useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { FirebaseContext } from "../providers/FirebaseProvider";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

const ProfilePage = () => {
	//const fbContext = useContext(FirebaseContext);
	//const app = fbContext.app;
	const authContext = useContext(AuthContext);
	const user = authContext.user;
	const logoutFn = authContext.logout;
	
	return (
		<div className=" bg-white min-h-screen p-1 text-center align-middle flex flex-col">
			{user ? (
				<div className="flex flex-col m-auto">
					<span>"you are logged in" </span> 
					<button onClick={() => logoutFn()}>LOG OUT</button>
				</div>
			) : (
				<div>
					<LoginForm />
					<br />
					<RegisterForm permission={1}/>
				</div>
			)}
		</div>
	);
};

export default ProfilePage;
