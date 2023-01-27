// server api calls
import express from "express";
import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import userRouter from "./routes/userRoutes.js"
import ratingRouter from "./routes/ratingRoutes.js"
import eventsRouter from "./routes/eventRoutes.js"
import { getUserByUserName } from "./models/userModel.js";

const firebaseConfig = {
	apiKey: "AIzaSyAuCLlU1mEBDoQiA0mNaOf-XdWebLBW6I0",
	authDomain: "safeplace-health.firebaseapp.com",
	projectId: "safeplace-health",
	storageBucket: "safeplace-health.appspot.com",
	messagingSenderId: "734921115811",
	appId: "1:734921115811:web:c82494dcec1b8a79535716",
	measurementId: "G-CWX8LQY5PC",
};

const PORT = 4000;
const app = express();
const fb = initializeApp(firebaseConfig);
const auth = getAuth(fb)

app.use(express.json());

app.listen(`${PORT}`, () => {
	console.log(`Web server running on port ${PORT}`);
});

app.use("/api/user", userRouter)
app.use("/api/rating", ratingRouter)
app.use("/api/event", eventsRouter)

app.post("/api/auth", async (req, res) => {
	try{
	const key = req.body.key
	const un = req.body.username
	const user = await getUserByUserName(un)
	const key2 = user[0].token
	const verify1 = await auth.verifyIdToken(key)
	const verify2 = await auth.verifyIdToken(key2)
	const permission = user[0].permission
	if(verify1.uid === verify2.uid){
		console.log("Authenticated user! Permission level:", permission)
		res.send({message: "Success!", permission})
	} else {
		console.log("Authentication failed!")
		res.status(401).send({message: "Failure!"})
	}
	} catch(err) {
		res.status(500).send(err)
	}
})
