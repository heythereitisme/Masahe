import React, { useContext } from "react";
import { useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { FirebaseContext } from "../providers/FirebaseProvider";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";
import { useNavigate } from "react-router";

const Login = ({permission}) => {
	//const fbContext = useContext(FirebaseContext);
	//const app = fbContext.app;
	const authContext = useContext(AuthContext);
	const user = authContext.user;
	const logoutFn = authContext.logout;
	const navigate = useNavigate()
	
	return (
		<div className=" bg-white min-h-screen p-1 text-center align-middle flex flex-col">
			{user ? (
				navigate('/profile')
			) : (
				<div>
					<LoginForm />
					<br />
					<RegisterForm permission={permission}/>
				</div>
			)}
		</div>
	);
};

export default Login;