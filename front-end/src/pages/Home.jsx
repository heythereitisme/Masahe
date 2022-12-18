import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div className="App">
			<span>Home</span>
			<ul>
				<li>
					<Link to="/client/booking"> Booking</Link>
				</li>
				<li>
					<Link to="/client/search"> Search</Link>
				</li>
				<li>
					<Link to="/client/review"> ClientReview</Link>
				</li>
				<li>
					<Link to="/sp/review"> SpReview</Link>
				</li>
				<li>
					<Link to="ProfilePage"> Profile</Link>
				</li>
			</ul>
		</div>
	);
};

export default Home;
