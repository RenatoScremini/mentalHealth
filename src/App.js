import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import MotivationalQuote from "./components/MotivationalQuote";
import CheckInForm from "./components/CheckinForm";
import RelaxingVideosScreen from "./components/RelaxingVideosScreen";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import HistoryPage from "./components/HistoryPage";
import "./styles.css";
import WorkoutVideosScreen from "./components/WorkoutVideosScreen";

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
                          Relaxing- Meditation Videos
                        </Link>
                        <Link to="/history" className="nav-button">
                          History
                        </Link>

                        <Link to="/workout-videos" className="nav-button">
                          Workout Videos
                        </Link>
                        <button className="nav-button" onClick={handleLogout}>
                          Logout
                        </button>
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route path="/relaxing-videos" element={<RelaxingVideosScreen />} />
              <Route path="/workout-videos" element={<WorkoutVideosScreen />} />
              <Route path="/history" element={<HistoryPage />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
