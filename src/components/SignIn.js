import "../authStyles.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = ({ handleLogin }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await fetch("http://localhost:5000/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("userId", data.user.id);
                handleLogin();
                navigate("/home");
            } else {
                setError(data.error || "Invalid credentials. Please try again.");
            }
        } catch (err) {
            setError("Failed to connect to the server. Please try again later.");
        }
    };


    return (
        <div className="auth-container">
            <div className="auth-page">
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required />

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required />

                    <button type="submit">Sign In</button>
                </form>
                {error && <p className="error-message">{error}</p>}
                <div className="link-container">
                    <p>Don't have an account? <a href="/signup">Sign Up</a></p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
