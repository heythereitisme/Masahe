import React from "react";

const VideoPlayer = ({ vidLink }) => (
  <div className="video-responsive">
    <video
      width="853"
      height="480"
      src={`${vidLink}`}
      controls
    />
  </div>
);



export default VideoPlayer;