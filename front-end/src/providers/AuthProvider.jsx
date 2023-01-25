import React, { useState, useContext } from "react";
import { FirebaseContext } from "./FirebaseProvider";
import {
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";
import { useEffect } from "react";

export const AuthContext = React.createContext();

export const AuthProvider = (props) => {
	const children = props.children;

	const fbContext = useContext(FirebaseContext);
	const auth = fbContext.auth;

	const [error, setError] = useState(false);
	const [regError, setRegError] = useState(false);
	const [user, setUser] = useState(null);

	const addUser = async ({permission, firstName, lastName, username}) => {
		const req = await fetch("/api/user", {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify({permission, firstName, lastName, username}),
		});
		const newUser = await req.json();
		console.log(newUser.firstName, "added");
		getUsers();
	  };

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (user) => {
			setUser(user);
		});
		return unsub; // to shut down onAuthStateChanged listener
	}, [auth]);

	const login = async (email, password) => {
		try {
			let userCred = await signInWithEmailAndPassword(auth, email, password);
			if (userCred) {
				
			} else {
				console.log("Login failed!");
			}
		} catch (err) {
			console.log("AUTH FAILURE!", err.message);
			setError(true);
		}
	};

	const logout = async () => {
		await signOut(auth);
	};

	const register = async (email, password, username, firstName, lastName, permission) => {
			try {
				let userCred = await createUserWithEmailAndPassword(
					auth,
					email,
					password
				);
				if (userCred) {
					const user = userCred.user
					await updateProfile(user, {
						displayName: username,
					})
					await addUser({permission, firstName, lastName, username})
				} else {
					console.log("Registration failed!");
				}
			} catch (err) {
				console.log("REGISTRATION FAILURE!", err.message);
				setRegError(true);
			}
	};
	const theValues = { user, login, logout, error, register, regError };

	return (
		<AuthContext.Provider value={theValues}>{children}</AuthContext.Provider>
	);
};
