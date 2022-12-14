import React, { useContext } from "react";
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
		<div className="App">
			{user ? (
				<div>
					{" "}
					"you are logged in" <br />
					<button onClick={() => logoutFn()}>LOG OUT</button>
				</div>
			) : (
				<div>
					<LoginForm />
					<br />
					<RegisterForm />
				</div>
			)}
		</div>
	);
};

export default ProfilePage;
