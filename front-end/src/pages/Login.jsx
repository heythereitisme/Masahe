import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";
import { AuthContext } from "../providers/AuthProvider";

const Login = ({permission, role}) => {
	//const fbContext = useContext(FirebaseContext);
	//const app = fbContext.app;
	const authContext = useContext(AuthContext);
	const user = authContext.user;
	const logoutFn = authContext.logout;
	const navigate = useNavigate()

	if(authContext.permission === 1){
		navigate('/client/profile')
	} else if(authContext.permission === 2){
		navigate('/mt/profile')
	}
	
	return (
		<div className=" bg-white min-h-screen p-1 text-center align-middle flex flex-col">
			{user ? (
				<></>
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