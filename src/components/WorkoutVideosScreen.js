import React, { useState } from "react";
import workVideos from "../data/workVideos";
import { Link } from "react-router-dom";

const WorkoutVideosScreen = () => {
  const [duration, setDuration] = useState("");
  const [filteredVideos, setFilteredVideos] = useState([]);

  const handleFilter = () => {
    const approxDurations = {
      15: 15,
      30: 30,
      60: 60, // 1 hour
    };
  
    const matchedVideos = workVideos.filter(
      (video) =>
        video.duration <= approxDurations[Number(duration)] + 2 &&
        video.duration >= approxDurations[Number(duration)] - 2
    );
  
    setFilteredVideos(matchedVideos);
  };

  return (
    <div className="workout-videos-container">
      <Link to="/" className="nav-button">
          Back
      </Link>
      <h1>Workout Videos</h1>
      <label>
        Select Video Duration:
        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="select-duration"
        >
          <option value="">Select...</option>
          <option value="15">15 Minutes</option>
          <option value="30">30 Minutes</option>
          <option value="60">1 Hour</option>
        </select>
      </label>
      <button onClick={handleFilter} className="filter-button">
        Filter Videos
      </button>
      <div className="video-list">
        {filteredVideos.length > 0 ? (
          filteredVideos.map((workVideo, index) => (
            <div key={index} className="video-item">
              <h3>{workVideo.title}</h3>
              <iframe
                src={workVideo.url}
                title={workVideo.title}
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

export default WorkoutVideosScreen;
