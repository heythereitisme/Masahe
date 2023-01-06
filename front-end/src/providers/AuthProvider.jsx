import React, { useState, useContext } from "react";
import { FirebaseContext } from "./FirebaseProvider";
import {
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	createUserWithEmailAndPassword,
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

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (user) => {
			console.log("onAuthStateChanged() - new User!!", user);
			setUser(user);
		});
		return unsub; // to shut down onAuthStateChanged listener
	}, [auth]);

	const login = async (email, password) => {
		try {
			let userCred = await signInWithEmailAndPassword(auth, email, password);
			if (userCred) {
				console.log("Logged in!!", userCred.user);
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

	const register = async (email, password) => {
		try {
			let userCred = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			if (userCred) {
				console.log("Registered!!", userCred.user);
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
