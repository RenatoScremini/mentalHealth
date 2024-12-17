import React, { useState, useEffect } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const HistoryPage = () => {
    const [history, setHistory] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [dailyData, setDailyData] = useState(null);
    const [stats, setStats] = useState({
        moodData: [],
        sleepHoursData: [],
        averageSleepHours: 0,
    });

    const userId = localStorage.getItem("userId");

    useEffect(() => {
        fetchHistory();
        fetchStats();
    }, []);

    const fetchHistory = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/checkins/${userId}`);
            const data = await response.json();
            setHistory(data);
        } catch (error) {
            console.error("Error fetching history:", error);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/checkins/stats/${userId}`);
            const data = await response.json();
            setStats(data);
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    };

    const fetchDailyData = async (date) => {
        try {
            const response = await fetch(`http://localhost:5000/api/checkins/history/${userId}/${date}`);
            const data = await response.json();
            setDailyData(data);
        } catch (error) {
            setDailyData(null);
        }
    };

    return (
        <div className="history-container">
            <h2>History Page</h2>

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
                    <div>
                        <h4>Check-In Data:</h4>
                        <p>Mood: {dailyData.mood}</p>
                        <p>Sleep Hours: {dailyData.sleepHours}</p>
                        <p>Notes: {dailyData.notes}</p>
                    </div>
                ) : (
                    selectedDate && <p>No check-in data for this day.</p>
                )}
            </div>

            <div>
                <h3>Mood Chart for This Month</h3>
                <Line
                    data={{
                        labels: stats.moodData.map((entry) => entry.date),
                        datasets: [
                            {
                                label: "Mood",
                                data: stats.moodData.map((entry) => (entry.mood === "Happy" ? 3 : entry.mood === "Neutral" ? 2 : 1)),
                                borderColor: "blue",
                                fill: false,
                            },
                        ],
                    }}
                />
            </div>

            <div>
                <h3>Sleep Hours Chart for This Month</h3>
                <Line
                    data={{
                        labels: stats.sleepHoursData.map((entry) => entry.date),
                        datasets: [
                            {
                                label: "Sleep Hours",
                                data: stats.sleepHoursData.map((entry) => entry.sleepHours),
                                borderColor: "green",
                                fill: false,
                            },
                        ],
                    }}
                />
                <p>Average Sleep Hours: {stats.averageSleepHours} hours</p>
            </div>

            <div>
                <h3>Full Check-In History</h3>
                <ul>
                    {history.map((item) => (
                        <li key={item.id}>
                            {item.checkinDate} - Mood: {item.mood}, Sleep Hours: {item.sleepHours}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default HistoryPage;
