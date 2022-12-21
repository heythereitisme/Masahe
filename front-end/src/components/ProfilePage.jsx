import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { FirebaseContext } from "../providers/FirebaseProvider";
import { LoginForm } from "./LoginForm";

const ProfilePage = () => {
	//const fbContext = useContext(FirebaseContext);
	//const app = fbContext.app;
	const authContext = useContext(AuthContext);
	const user = authContext.user;
	return (
		<div className="App">
			{user ? "you are logged in" : "not logged in"}
			<LoginForm />
		</div>
	);
};

export default ProfilePage;
