import React, { useState, useContext } from "react";
import { FirebaseContext } from "./FirebaseProvider";
import { ref, getDownloadURL } from "firebase/storage";

import {
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const AuthContext = React.createContext();

export const AuthProvider = (props) => {
	const children = props.children;
	const navigate = useNavigate()

	const fbContext = useContext(FirebaseContext);
	const auth = fbContext.auth;
	const storage = fbContext.storage

	const [error, setError] = useState(false);
	const [regError, setRegError] = useState(false);
	const [user, setUser] = useState(null);
	const [permission, setPermission] = useState(0)
	const [muid, setMuid] = useState("")
	const [avatar, setAvatar] = useState("/Default_pfp.svg")
	const [userInfo, setUserInfo] = useState({})

	const addUser = async ({permission, firstName, lastName, username, token, quadrant}) => {
		const req = await fetch("/api/user", {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify({permission, firstName, lastName, username, token, quadrant}),
		});
		const newUser = await req.json();
		console.log(newUser.firstName, "added");
		
	  };

	  const updateUser = async (u) => {
		const req = await fetch("/api/user", {
		  method: "PUT",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify(u),
		});
	  };

	  const permissionChecker = async (key, username) => {
		const req = await fetch("/api/auth", {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify({key, username}),
		});
		const perm = await req.json();
		if(perm.user){
			if(perm.user.avatar === "/Default_pfp.svg"){
				try{
					const url = await getDownloadURL(ref(storage, `avatars/${perm.user.username}.png`))
					if(url){
						const avaUpdate = {username: perm.user.username, avatar: url}
						updateUser(avaUpdate)
					}} catch(err) {
					console.error(err)
				}}
			setPermission(perm.user.permission)
			setMuid(perm.user._id)
			setAvatar(perm.user.avatar)
			setUserInfo({firstName: perm.user.firstName, lastName: perm.user.lastName, quadrant: perm.user.quadrant, address: perm.user.address, about: perm.user.about, phoneNumber: perm.user.phoneNumber, avatar, licensed: perm.user.licensed, services: perm.user.services})
	  };
	}
	
	



	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (user) => {
				setUser(user);
					if(user){
						permissionChecker(user.accessToken, user.displayName)
		} else {
			setPermission(0)
		}
		});
		return unsub; // to shut down onAuthStateChanged listener
	}, [auth]);

	const login = async (email, password) => {
		try {
			let userCred = await signInWithEmailAndPassword(auth, email, password);
			if (userCred) {
				await permissionChecker(userCred.user.accessToken, userCred.user.displayName)
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
		setPermission(0)
		setAvatar("/Default_pfp.svg")
		navigate("/")
	};

	const register = async (email, password, username, firstName, lastName, permission, quadrant) => {
			try {
				let userCred = await createUserWithEmailAndPassword(
					auth,
					email,
					password
				);
				if (userCred) {
					const user = userCred.user
					const token = user.accessToken
					await updateProfile(user, {
						displayName: username,
					})
					await addUser({permission, firstName, lastName, username, token, quadrant})
					alert("Registration Successful! Please Sign in again!")
				} else {
					console.log("Registration failed!");
				}
			} catch (err) {
				alert("REGISTRATION FAILURE!", err.message);
				console.error(err)
				setRegError(true);
			}
			
			logout()

	};
	const theValues = { user, login, logout, error, register, permissionChecker, regError, permission, muid, avatar, userInfo };

	return (
		<AuthContext.Provider value={theValues}>{children}</AuthContext.Provider>
	);
};
