import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useNavigate } from "react-router-dom";
import MotivationalQuote from "./components/MotivationalQuote";
import CheckInForm from "./components/CheckinForm";
import RelaxingVideosScreen from "./components/RelaxingVideosScreen";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import "./styles.css";

const ProtectedRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/" />;
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

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
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
                path="/"
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
                        <button className="nav-button" onClick={handleLogout}>
                        Logout
                      </button>
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
