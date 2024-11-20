import React, { useState, useEffect } from "react";
import videos from "../data/videos";

const RelaxingVideos = () => {
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    const fetchVideos = () => {
      setVideoList(videos);
    };
    fetchVideos();
  }, []);

  return (
    <div>
      <h2>Relaxing Videos</h2>
      <div>
        {videoList.map((video, index) => (
          <div key={index}>
            <h3>{video.title}</h3>
            <iframe
              src={video.url}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelaxingVideos;
