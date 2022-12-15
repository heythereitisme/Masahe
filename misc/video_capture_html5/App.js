import "./App.css";

//function App() {
//	async function getMedia() {
//		let video = document.querySelector("#videoElement");
//
//		try {
//			let stream = await navigator.mediaDevices.getUserMedia({ video: true });
//			/* use the stream */
//			video.srcObject = stream;
//		} catch (err) {
//			/* handle the error */
//		}
//	}
//
//	return (
//		<div className="App">
//			<h1> webcam stream using react</h1>
//			<video autoPlay={true} id="videoElement" controls></video>
//		</div>
//	);
//}
//
//export default App;
import React, { useEffect } from "react";

const App = () => {
	const streamCamVideo = () => {
		var constraints = { audio: true, video: { width: 600, height: 600 } };
		navigator.mediaDevices
			.getUserMedia(constraints)
			.then(function (mediaStream) {
				var video = document.querySelector("video");

				video.srcObject = mediaStream;
				video.onloadedmetadata = function (e) {
					video.play();
				};
			})
			.catch(function (err) {
				console.log(err.name + ": " + err.message);
			}); // always check for errors at the end.
	};

	useEffect(() => {
		streamCamVideo();
	}, []);

	return (
		<div>
			<video autoPlay={true} id="videoElement"></video>
		</div>
	);
};

export default App;
