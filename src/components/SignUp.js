import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../authStyles.css";

const SignUp = ({ handleLogin }) => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
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
        setError(""); // Reset error state

        try {
            const response = await fetch("http://localhost:5000/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert("User created successfully!");
                navigate("/");
            } else {
                setError(data.error || "Something went wrong. Please try again.");
            }
        } catch (err) {
            console.log(err)
            setError("Failed to connect to the server. Please try again later.");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-page">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input type="text"
                        id="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        required />

                    <label htmlFor="email">Email:</label>
                    <input type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required />

                    <label htmlFor="password">Password:</label>
                    <input type="password"
                        id="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required />

                    <button type="submit">Sign Up</button>
                </form>
                {error && <p className="error-message">{error}</p>}
                <div className="link-container">
                    <p>Already have an account? <a href="/">Sign In</a></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
