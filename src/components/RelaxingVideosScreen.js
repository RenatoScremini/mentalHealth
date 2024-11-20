import React, { useState } from "react";
import videos from "../data/videos";

const RelaxingVideosScreen = () => {
  const [duration, setDuration] = useState("");
  const [filteredVideos, setFilteredVideos] = useState([]);

  const handleFilter = () => {
    const approxDurations = {
      1: 1,
      3: 3,
      5: 5,
      10: 10,
      20: 20,
      30: 30,
      60: 60, // 1 hour
    };

    const matchedVideos = videos.filter(
      (video) =>
        video.duration <= approxDurations[duration] + 2 &&
        video.duration >= approxDurations[duration] - 2
    );

    setFilteredVideos(matchedVideos);
  };

  return (
    <div className="relaxing-videos-container">
      <h1>Relaxing Videos</h1>
      <label>
        Select Video Duration:
        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="select-duration"
        >
          <option value="">Select...</option>
          <option value="1">1 Minute</option>
          <option value="3">3 Minutes</option>
          <option value="5">5 Minutes</option>
          <option value="10">10 Minutes</option>
          <option value="20">20 Minutes</option>
          <option value="30">30 Minutes</option>
          <option value="60">1 Hour</option>
        </select>
      </label>
      <button onClick={handleFilter} className="filter-button">
        Filter Videos
      </button>
      <div className="video-list">
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video, index) => (
            <div key={index} className="video-item">
              <h3>{video.title}</h3>
              <iframe
                src={video.url}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))
        ) : (
          <p>No videos available for the selected duration.</p>
        )}
      </div>
    </div>
  );
};

export default RelaxingVideosScreen;
