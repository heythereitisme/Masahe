// server api calls
import express from "express";
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import userRouter from "./routes/userRoutes.js";
import ratingRouter from "./routes/ratingRoutes.js";
import eventsRouter from "./routes/eventRoutes.js";
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
export const auth = getAuth(fb);

app.use(express.json());

app.listen(`${PORT}`, () => {
	console.log(`Web server running on port ${PORT}`);
});

app.use("/api/user", userRouter);
app.use("/api/rating", ratingRouter);
app.use("/api/event", eventsRouter);

app.post("/api/auth", async (req, res) => {
	try {
		const key = req.body.key;
		const un = req.body.username;
		const user = await getUserByUserName(un);
		const key2 = user.uid;
		const verify = await auth.verifyIdToken(key);
		const {
			_id,
			firstName,
			lastName,
			avgRating,
			username,
			quadrant,
			about,
			avatar,
			licensed,
			permission,
			address,
			phoneNumber,
		} = user;
		const filteredUser = {
			_id,
			firstName,
			lastName,
			avgRating,
			username,
			quadrant,
			about,
			avatar,
			licensed,
			permission,
			address,
			phoneNumber,
		};
		if (verify.uid === key2) {
			console.log("Authenticated user! Permission level:", permission);
			res.send({ message: "Success!", user: filteredUser });
		} else {
			console.log("Authentication failed!");
			res.status(401).send({ message: "Failure!", permission: 0 });
		}
	} catch (err) {
		console.log(err);
		res.status(500).send({ message: err, permission: 0 });
	}
});

// Chat

import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const serverHttp = http.createServer(app);

let conversationObj = [];

app.use(cors());
//mongo db
// import mongoose from "mongoose";
import Conversation from "./models/conversationModel.js";
// mongoose.connect(
// "mongodb+srv://masahe:proj3ChatApp@cluster0.tyjub9p.mongodb.net/test",
// console.log("Connected to db")
// );

serverHttp.listen(6010, () => {
	console.log("listening on *:6010");
});

// Static files
//app.use(express.static("public"));

// Socket setup & pass server

function arrayRemove(arr, value) {
	return arr.filter(function (ele) {
		return ele != value;
	});
}

const io = new Server(serverHttp, {
	cors: {
		origins: "*",
		methods: ["GET", "POST"],
	},
});

let roomList = [];
let userList = [];
io.on("connection", (socket) => {
	console.log("made socket connection", socket.id);

	// Create room array
	socket.on("join", function (data) {
		console.log("Joined", data);
		const fromId = data.clientId + data.handle;
		if (!roomList.find((val) => val === fromId)) {
			roomList.push(fromId);
			userList.push(data.handle);
		}
		console.log(roomList);
		console.log("Online...", userList);
		io.sockets.emit("onlineUsers", userList);
	});

	//remove from room array if disconnected
	socket.on("leave", () => {
		console.log("user left chat", socket.id);
		console.log("before", roomList);
		roomList.forEach((element) => {
			if (element.match(socket.id)) {
				console.log("found", element);
				roomList = arrayRemove(roomList, element);
				const discUser = element.slice(20);
				console.log("removed user", discUser);
				userList = arrayRemove(userList, discUser);
			}
		});
		io.sockets.emit("onlineUsers", userList);
		console.log(userList);
		console.log("after", roomList);
	});
	socket.on("disconnect", () => {
		console.log("user disconnected browser", socket.id);
		console.log("before", roomList);
		roomList.forEach((element) => {
			if (element.match(socket.id)) {
				console.log("found", element);
				roomList = arrayRemove(roomList, element);
				const discUser = element.slice(20);
				console.log("removed user", discUser);
				userList = arrayRemove(userList, discUser);
			}
		});
		io.sockets.emit("onlineUsers", userList);
		socket.broadcast.emit("onlineUsers", userList);
		console.log(userList);
		console.log("after", roomList);
	});

	// Handle chat event
	socket.on("chat", async function (data) {
		let roomToSend;
		let roomFrom;

		//console.log(roomList);
		//console.log(data.message);

		roomList.forEach((element) => {
			if (element.match(data.chatBuddy)) {
				roomToSend = element.replace(`${data.chatBuddy}`, "");
				//socket.to(roomToSend).emit("chat", data);
			}
			console.log("Room to send", roomToSend);
		});
		roomList.forEach((element) => {
			if (element.match(data.handle)) {
				roomFrom = element.replace(`${data.handle}`, "");
			}
			console.log("from room", roomFrom);
		});

		//To send to all clients
		//io.sockets.emit("chat", data);
		//write to db
		conversationObj.push({
			sender: data.handle,
			receiver: data.chatBuddy,
			content: {
				userName: data.handle,
				msg: data.message,
			},
		});
		console.log("conversation Obj", conversationObj);
		//await Conversation.create(conversationObj);
		//conversationObj = [];

		let convObjFrmDb = await Conversation.find({
			sender: { $in: [data.handle, data.chatBuddy] },
			receiver: { $in: [data.chatBuddy, data.handle] },
		});
		console.log("conv obj from DB", convObjFrmDb);
		if (convObjFrmDb.length === 0) {
			console.log("EMPTY");
			await Conversation.create(conversationObj);
			conversationObj = [];
			convObjFrmDb = [];
		} else {
			convObjFrmDb.find(async (e) => {
				console.log("entedred FrmDb");
				if (
					(e.sender === data.handle && e.receiver === data.chatBuddy) ||
					(e.sender === data.chatBuddy && e.receiver === data.handle)
				) {
					console.log("documet exist");
					console.log(e._id);
					await Conversation.updateOne(
						{ _id: e.id },
						{
							$push: {
								content: { userName: data.handle, msg: data.message },
							},
						}
					);
				}

				// data = { message: e.content, handle: e.sender };
				// console.log(data);
				// socket.to(roomToSend).emit("chat", data);

				conversationObj = [];
				convObjFrmDb = [];
				//console.log(e.sender, e.receiver);
			});
		}
		//read from db and send to client
		let convObjFrmDbToSend = await Conversation.find({
			sender: { $in: [data.handle, data.chatBuddy] },
			receiver: { $in: [data.chatBuddy, data.handle] },
		});
		convObjFrmDbToSend.map((e) => {
			// console.log(e.content);
			data = { message: e.content };
		});
		// socket.to([roomToSend, roomFrom]).emit("chat", data);
		io.to(roomToSend).to(roomFrom).emit("chat", data);
		//console.log(data);
	});

	//// Handle typing event
	//socket.on("typing", function (data) {
	//	roomList.forEach((element) => {
	//		if (element.match(data.chatBuddy)) {
	//			const roomToSend = element.replace(`${data.chatBuddy}`, "");
	//			socket.to(roomToSend).emit("typing", data);
	//		}
	//	});
	//});
});
