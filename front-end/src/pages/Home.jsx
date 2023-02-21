import React, { useContext, useEffect } from "react";
import Hero from "../components/Hero";
import VideoPlayer from "../components/VideoPlayer";
import YoutubeEmbed from "../components/YoutubeEmbed";
import { AuthContext } from "../providers/AuthProvider";

const LandingPage = () => {
	const authContext = useContext(AuthContext)
	const permission = authContext.permission

	  useEffect(() => {
		console.log("Current permission level:", permission)
	  }, [authContext])

		return (
			<div> 
				<VideoPlayer vidLink={`/Videos/pexels-anna-tarazevich-6750874.mp4`}/>
		<Hero/> 
	</div>	
	);
}



export default LandingPage;
