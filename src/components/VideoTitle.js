import React from "react";

const VideoTitle = (props) => {
  return (
    <div className=" w-screen aspect-video pt-[20%] px-24 absolute text-white bg-gradient-to-tr from-black">
      <h1 className="text-3xl font-bold"> {props.title}</h1>
      <p className="py-6 px-15 text-lg w-1/4"> {props.overview}</p>
      <div className="">
        <button
          className="bg-white  py-4 mx-2 px-6 text-black
         p-4 text-lg rounded-lg hover:bg-opacity-50"
        >
          ▶️ Play
        </button>
        <button
          className="bg-white  py-4 mx-2 px-6 text-black
         p-4 text-lg rounded-lg hover:bg-opacity-50"
        >
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
