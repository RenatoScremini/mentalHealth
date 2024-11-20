import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import MotivationalQuote from "./components/MotivationalQuote";
import CheckInForm from "./components/CheckinForm";
import RelaxingVideosScreen from "./components/RelaxingVideosScreen";
import "./styles.css";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <h1 className="app-title">Mental Health Check-In</h1>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <MotivationalQuote />
                <CheckInForm />
                <div className="button-container">
                  <Link to="/relaxing-videos" className="nav-button">
                    Relaxing Videos
                  </Link>
                  <button className="nav-button">Meditation Videos</button>
                  <button className="nav-button">Workout Videos</button>
                </div>
              </div>
            }
          />
          <Route path="/relaxing-videos" element={<RelaxingVideosScreen />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
