import React, { useContext, useEffect } from "react";
import Hero from "../components/Hero";
import { AuthContext } from "../providers/AuthProvider";

const LandingPage = () => {
	const authContext = useContext(AuthContext)

	const temp = async (key, username) => {
		const req = await fetch("/api/auth", {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify({key, username}),
		});
		const tester = await req.json();
		console.log(tester, "testing");
	  };

	//   useEffect(() => {
	// 	if (authContext.user){
	// 		temp(authContext.user.accessToken, authContext.user.displayName)
	// 	}
	//   }, [authContext])

	return (
	<div> 
		<Hero/> 
	</div>	
	);
};

export default LandingPage;
