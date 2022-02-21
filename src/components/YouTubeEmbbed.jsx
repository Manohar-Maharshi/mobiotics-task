import React from "react";
import YouTube from "react-youtube";

const opts = {
  height: "100%",
  width: "100%",
  playerVars: {
    autoplay: 1,
  },
};

const YouTubeEmbbed = ({ trailerId }) => {
  return (
    <YouTube
      className='w-full h-full'
      containerClassName='w-full md:h-[30rem] h-[20rem]'
      videoId={trailerId}
      opts={opts}
    />
  );
};

export default YouTubeEmbbed;
