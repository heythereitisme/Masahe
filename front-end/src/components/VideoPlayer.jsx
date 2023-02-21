import React from "react";

const VideoPlayer = ({ vidLink }) => (
  <div className="video-responsive flex bg-slate-100">
    <video
      width="853"
      height="480"
      src={`${vidLink}`}
      controls
      className="flex w-full h-[30rem] object-cover auto-pla"
    />
  </div>
);



export default VideoPlayer;