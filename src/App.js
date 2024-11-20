import React from "react";
import MotivationalQuote from "./components/MotivationalQuote";
import CheckInForm from "./components/CheckinForm";
import "./styles.css";

const App = () => {
  return (
    <div className="app-container">
      <h1 className="app-title">Mental Health Check-In</h1>
      <MotivationalQuote />
      <CheckInForm />
      <div className="button-container">
        <button className="nav-button">Relaxing Videos</button>
        <button className="nav-button">Meditation Videos</button>
        <button className="nav-button">Workout Videos</button>
      </div>
    </div>
  );
};

export default App;
