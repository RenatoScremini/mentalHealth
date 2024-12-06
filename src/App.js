import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import MotivationalQuote from "./components/MotivationalQuote";
import CheckInForm from "./components/CheckinForm";
import RelaxingVideosScreen from "./components/RelaxingVideosScreen";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import "./styles.css";

const ProtectedRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/home" />;
};

const App = () => {
  // State to track if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div className="app-container">
        <h1 className="app-title">Mental Health Check-In</h1>
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route path="/" element={<SignIn handleLogin={handleLogin} />} />
              <Route path="/signup" element={<SignUp />} />
            </>
          ) : (
            <>
              <Route
                path="/home"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
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
                  </ProtectedRoute>
                }
              />
              <Route path="/relaxing-videos" element={<RelaxingVideosScreen />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
