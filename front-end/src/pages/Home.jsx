import React, { useContext, useEffect } from "react";
import Hero from "../components/Hero";
import { AuthContext } from "../providers/AuthProvider";

const LandingPage = () => {
	const authContext = useContext(AuthContext)
	const permission = authContext.permission
	  useEffect(() => {
		console.log("Current permission level:", permission)
	  }, [authContext])

	return (
	<div> 
		<Hero/> 
	</div>	
	);
};

export default LandingPage;
