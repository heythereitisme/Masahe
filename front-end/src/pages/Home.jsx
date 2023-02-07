import React, { useContext, useEffect } from "react";
import Hero from "../components/Hero";
import MTHome from "../components/massageTherapist/MTHome";
import { AuthContext } from "../providers/AuthProvider";

const LandingPage = () => {
	const authContext = useContext(AuthContext)
	const permission = authContext.permission
	  useEffect(() => {
		console.log("Current permission level:", permission)
	  }, [authContext])

	if(permission === 2){
		return(
			<div>
				<MTHome />
			</div>
		)
	} else {		
		return (
			<div> 
		<Hero/> 
	</div>	
	);
}
};

export default LandingPage;
