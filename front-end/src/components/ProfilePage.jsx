import React from "react";
import { useContext } from "react";
import { FirebaseContext } from "../providers/FirebaseProvider";

const ProfilePage = () => {
	const fbContext = useContext(FirebaseContext);
	const app = fbContext.app;

	return (
		<div>
			<span>Profile</span>
			Firebase app info:
			<br />
			<br />
			{JSON.stringify(app)}
		</div>
	);
};

export default ProfilePage;
