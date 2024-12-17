import React, { useState, useEffect } from "react";
import "../styles.css";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { Link } from "react-router-dom"; // Import Link for the back button

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const HistoryPage = () => {
    const [history, setHistory] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [dailyData, setDailyData] = useState(null);
    const [stats, setStats] = useState({
        moodData: [],
        sleepHoursData: [],
        averageSleepHours: 0,
    });
    const [isLoading, setIsLoading] = useState(false);  // State for loading indicator
    const [error, setError] = useState(null);  // State for error messages

    const userId = localStorage.getItem("userId");

    useEffect(() => {
        fetchHistory();
        fetchStats();
    }, []);

    const fetchHistory = async () => {
        setIsLoading(true);  // Start loading
        setError(null);  // Reset errors
        try {
            const response = await fetch(`http://localhost:5000/api/checkins/${userId}`);
            const data = await response.json();
            setHistory(data);
        } catch (error) {
            setError("Error fetching history data");
        } finally {
            setIsLoading(false);  // Stop loading
        }
    };

    const fetchStats = async (month) => {
        setIsLoading(true);  // Start loading
        setError(null);  // Reset errors
        try {
            const response = await fetch(`http://localhost:5000/api/checkins/stats/${userId}/${month}`);
            const data = await response.json();
            setStats(data);
        } catch (error) {
            setError("Error fetching stats data");
        } finally {
            setIsLoading(false);  // Stop loading
        }
    };

    const fetchDailyData = async (date) => {
        setIsLoading(true);  // Start loading
        setError(null);  // Reset errors
        try {
            const response = await fetch(`http://localhost:5000/api/checkins/history/${userId}/${date}`);
            const data = await response.json();
            setDailyData(data);
        } catch (error) {
            setError("Error fetching daily data");
        } finally {
            setIsLoading(false);  // Stop loading
        }
    };

    const calculateMoodCounts = () => {
        const moodCounts = {};

        stats.moodData.forEach((entry) => {
            if (entry.mood in moodCounts) {
                moodCounts[entry.mood]++;
            } else {
                moodCounts[entry.mood] = 1;
            }
        });

        return moodCounts;
    };

    const moodCounts = calculateMoodCounts();

    const renderLoading = () => {
        return <div>Loading...</div>;
    };

    const renderError = () => {
        return <div>{error}</div>;
    };

    return (
        <div className="history-container">
            {isLoading && renderLoading()}
            {error && renderError()}

            <div className="history-container">

        
        <Link to="/" className="nav-button">
            Back
        </Link>

        <h1>History</h1>

        {isLoading && renderLoading()}
        {error && renderError()}

        {/* Date Picker for Daily Check-In */}
            <div>   
                <h3>Select a Day to View Check-In</h3>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => {
                        setSelectedDate(e.target.value);
                        fetchDailyData(e.target.value);
                    }}
                />
                {dailyData ? (
                    <div className="check-in-data">
                        <h4>Check-In Data:</h4>
                        <p>Mood: {dailyData.mood}</p>
                        <p>Sleep Hours: {dailyData.sleepHours}</p>
                        <p>Notes: {dailyData.notes}</p>
                    </div>
                ) : (
                    selectedDate && <p>No check-in data for this day.</p>
                )}
            </div>
        </div>

            {/* Dropdown for Month Selection */}
            <div>
                <h3>Select a Month to View Data</h3>
                <select
                    value={selectedMonth}
                    onChange={(e) => {
                        setSelectedMonth(e.target.value);
                        fetchStats(e.target.value);  // Pass the selected month here
                    }}
                >
                    <option value="">Select a Month</option>
                    <option value="2024-01">January 2024</option>
                    <option value="2024-02">February 2024</option>
                    <option value="2024-03">March 2024</option>
                    <option value="2024-04">April 2024</option>
                    <option value="2024-05">May 2024</option>
                    <option value="2024-06">June 2024</option>
                    <option value="2024-07">July 2024</option>
                    <option value="2024-08">August 2024</option>
                    <option value="2024-09">September 2024</option>
                    <option value="2024-10">October 2024</option>
                    <option value="2024-11">November 2024</option>
                    <option value="2024-12">December 2024</option>
                </select>
            </div>

            {/* Mood Distribution for the Selected Month */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "400px", // Adjust for centering vertically
                    margin: "0 auto", // Center horizontally
                }}
            >
                <Pie
                    data={{
                        labels: Object.keys(moodCounts),  // Dynamic mood labels
                        datasets: [
                            {
                                label: "Mood Count",
                                data: Object.values(moodCounts),  // Dynamic mood counts
                                backgroundColor: ["#09940e", "#f0e908", "#ef0f0f"], // Green for Happy, Orange for Neutral, Red for Sad
                                hoverOffset: 4,
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: "bottom", // Legend below the chart
                                labels: {
                                    font: {
                                        size: 16, // Larger font size for better readability
                                    },
                                },
                            },
                            tooltip: {
                                bodyFont: {
                                    size: 14, // Adjust tooltip font size
                                },
                            },
                        },
                        layout: {
                            padding: 30, // Extra padding for breathing room
                        },
                    }}
                    style={{
                        maxHeight: "350px", // Increased size
                        maxWidth: "350px",
                    }}
                />
</div>

            {/* Sleep Hours Chart for the Selected Month */}
            <div>
                <h3>Sleep Hours Chart (Selected Month)</h3>
                <Bar
                    data={{
                        labels: stats.sleepHoursData.map((entry) => entry.date),
                        datasets: [
                            {
                                label: "Sleep Hours",
                                data: stats.sleepHoursData.map(
                                    (entry) => entry.sleepHours
                                ),
                                backgroundColor: "rgba(57, 218, 28, 0.6)",
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: { display: false },
                        },
                    }}
                />
                <h4>Average Sleep Hours: {stats.averageSleepHours} hours</h4>
            </div>
        </div>
    );
};

export default HistoryPage;
