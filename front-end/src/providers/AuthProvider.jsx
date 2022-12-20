import React, { useState, useContext } from "react";
import { FirebaseContext } from "./FirebaseProvider";

export const AuthContext = React.createContext();

export const AuthProvider = (props) => {
	const children = props.children;

	const [user, setUser] = useState(null);
	const theValues = { user };

	return (
		<AuthContext.Provider value={theValues}>{children}</AuthContext.Provider>
	);
};
