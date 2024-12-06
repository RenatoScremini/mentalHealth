import React, { useState, useEffect } from "react";
import workVideos from "../data/workVideos"; 

const WorkoutVideos = () => {
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    const fetchVideos = () => {
      setVideoList(workVideos);
    };
    fetchVideos();
  }, []);

  return (
    <div>
      <h2>Workout Videos</h2>
      <div>
        {videoList.map((workVideo, index) => (
          <div key={index}>
            <h3>{workVideo.title}</h3>
            <iframe
              src={workVideo.url}
              title={workVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutVideos;
