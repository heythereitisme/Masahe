import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

const Home = () => {
	return (
<div>
	<div> <Navbar/> </div>
	<div> <Hero/> </div>
	<div> <Footer/> </div>
</div>
		
	
		// <div className="App">
		// 	<span>Home</span>
		// 	<ul>
		// 		<li>
		// 			<Link to="/client/booking"> Booking</Link>
		// 		</li>
		// 		<li>
		// 			<Link to="/client/search"> Search</Link>
		// 		</li>
		// 		<li>
		// 			<Link to="/client/review"> ClientReview</Link>
		// 		</li>
		// 		<li>
		// 			<Link to="/sp/review"> SpReview</Link>
		// 		</li>
		// 		<li>
		// 			<Link to="ProfilePage"> Profile</Link>
		// 		</li>
		// 		<li> 
		// 			<Link to ="ChatBox"> Chat box </Link>
		// 	</li>
		// 	</ul>
		// </div>
		
	);
};

export default Home;
