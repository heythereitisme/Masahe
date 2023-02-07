import React from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//const firebaseConfig = {
//	apiKey: "AIzaSyAuCLlU1mEBDoQiA0mNaOf-XdWebLBW6I0",
//	authDomain: "safeplace-health.firebaseapp.com",
//	projectId: "safeplace-health",
//	storageBucket: "safeplace-health.appspot.com",
//	messagingSenderId: "734921115811",
//	appId: "1:734921115811:web:c82494dcec1b8a79535716",
//	measurementId: "G-CWX8LQY5PC",
//};

const firebaseConfig = {
	apiKey: "AIzaSyBKdVi8t2-MASQwftLb11L9Z388ADJsNDA",
	authDomain: "masahe-c9.firebaseapp.com",
	projectId: "masahe-c9",
	storageBucket: "masahe-c9.appspot.com",
	messagingSenderId: "750119957523",
	appId: "1:750119957523:web:339f4f2c015cc7790b3be6",
	measurementId: "G-MM6C4KQF66",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const FirebaseContext = React.createContext();

export const FirebaseProvider = (props) => {
	const { children } = props;
	const theValues = { app, auth };
	return (
		<FirebaseContext.Provider value={theValues}>
			{children}
		</FirebaseContext.Provider>
	);
};
