import React, { useEffect, useState, useContext } from "react";
import io from "socket.io-client";
import { AuthContext } from "../providers/AuthProvider";
import os from "os"



let socket;

const ChatBox = () => {
	const auth = useContext(AuthContext);
	const displayName = auth.userInfo.firstName;
	console.log(displayName);
	const handle = displayName;
	const [message, setMessage] = useState();
	//const [handle, setHandle] = useState();
	const [chatBuddy, setChatBuddy] = useState();
	const [msgFrmSrvr, setMsgFrmSrvr] = useState([]);
	const [onlineUsr, setOnlineUsr] = useState([]);
	const [socket, setSocket] = useState();
	const [joined, setJoined] = useState(false);
	useEffect(() => {
		//setSocket(io.connect("http://localhost:6010"));
		const newSocket = io.connect("ws://localhost:6010" );	
		setSocket(newSocket);
		function usersOnline(userList) {
			console.log("online users", userList);
			setOnlineUsr(userList);
		}
		newSocket.on("onlineUsers", usersOnline);
		newSocket.on("connect", () => {
			console.log("Connected to socket server");
		});
		newSocket.on("chat", function (data) {
			console.log("from server", data.message);
			setMsgFrmSrvr(data.message);
		});
		return () => {
			setSocket(null);
			newSocket.removeAllListeners("connect");
			newSocket.removeAllListeners("chat");
			newSocket.off("onlineUsers", usersOnline);
			console.log("un mouting componenet");
		};
	}, []);

	// Emit events

	function joinChat(e) {
		e.preventDefault();
		socket.emit("join", {
			handle: handle,
			clientId: socket.id,
		});
		setJoined(true);
	}

	function leaveChat(e) {
		e.preventDefault();
		socket.emit("leave", socket.id);
		console.log("leaving chat");
		setJoined(false);
	}

	function btn(e) {
		e.preventDefault();
		socket.emit("chat", {
			message: message,
			handle: handle,
			chatBuddy: chatBuddy,
			clientId: socket.id,
		});
		e.target.reset();
	}

	return (
		<div className="bg-white flex justify-end">
			<label htmlFor="my-modal-3" className="btn btn-secondary m-2 mr-4">
				Open Chat
			</label>
			{/* Put this part before </body> tag */}
			<input type="checkbox" id="my-modal-3" className="modal-toggle" />
			<div className="modal modal-bottom flex justify-end">
				<div className=" modal-box w-[25rem] h-screen md:h-[42rem] bg-slate-100 rounded-lg p-3 overflow-y-scroll">
					<label
						htmlFor="my-modal-3"
						className="btn btn-sm btn-primary bg-white btn-circle relative  text-black hover:text-white"
					>
						✕
					</label>

					<div>
						<div>
							<br />
							<div>
								

								<div className="card w-96 h-80 bg-white text-neutral-content p-4">
									<div className="card-body items-center text-center overflow-y-scroll">
										<h2 className="card-title "></h2>
										{/* <p>{msgFrmSrvr}</p> */}

										{msgFrmSrvr &&
											msgFrmSrvr.map((u) => (
												<p key={u}>
													{u.userName} : {u.msg}
												</p>
											))}

										<div className="card-actions justify-end"></div>
									</div>
								</div>
								
								<form onSubmit={btn} className="flex justify-around mt-2">
									<br />
									{/*<input
					placeholder="chatBuddy"
					className="input input-bordered input-secondary w-full max-w-xs"
					onChange={(e) => setChatBuddy(e.target.value)}
	/>*/}
									<br />
									
									<input
										placeholder="message"
										className="input input-bordered input-secondary w-72 max-w-xs bg-white text-primary"
										onChange={(e) => setMessage(e.target.value)}
									/>
									<br />
									{/* <input type="submit" value="Send" /> */}
									<button
										className="btn btn-primary bg-white text-primary hover:text-white"
										type="submit"
										value="Send"
									>
										Send
									</button>
								</form>
								
								<form onSubmit={!joined ? joinChat : leaveChat}>
									{/* <input */}
									{/* placeholder="username" */}
									{/* className="input input-bordered input-secondary w-full max-w-xs " */}
									{/* onChange={(e) => setHandle(e.target.value)} */}
									{/* //onInput={(e) => setHandle(e.target.value)} */}
									{/* /> */}
									<br />
									{/* <button onClick={() => joinFn()}>JOIN</button> */}
									{/* <input type="submit" value="Join" /> */}
									{/* <button className="btn btn-primary" type="submit" value="Join"> */}
									{/* Join */}
									{/* </button> */}
									<button className="btn btn-primary bg-white	text-primary hover:text-white ml-1">
										{!joined ? "Join Chat " : "Leave Chat"}
									</button>
								</form>
							</div>
							{/*    */}

							<div className="collapse">
								<input type="checkbox" />
								<div className="collapse-title text-primary text-xl font-medium font-title">
									Online Users
								</div>
								<div className="collapse-content">
									{/*    */}

									<div className="card bg-white text-primary-content min-w-full">
										<div className="card-body text-left">
											{/* <h2 className="card-title">Online Users</h2> */}
											<div>
												{onlineUsr.map((e) => (
													<div key={e}>
														{
															<button
																className="btn btn-primary bg-white text-primary hover:text-white rounded-2xl flex"
																onClick={() => setChatBuddy(e)}
															>
																{e}
															</button>
														}
													</div>
												))}
											</div>

											<div className="card-actions justify-end"></div>
										</div>
									</div>
									{/*    */}
								</div>
							</div>
							{/*    */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatBox;
