import React, { useState, useEffect } from "react";


const CheckInForm  = () => {
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");
  const [sleepHours, setSleepHours] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
   // const userId = localStorage.getItem("userId"); // Retrieve userId from LocalStorage
    const userId = parseInt(localStorage.getItem("userId"));
    if (isNaN(userId)) {
      console.error("User ID is invalid");
      return; // Prevent submission if userId is invalid
    }

    const   checkInData = {
      userId,
      mood: mood,
      sleepHours,
      notes: note,
    };

    try {
      const response = await fetch("http://localhost:5000/api/checkins/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkInData),
        
      });

      console.log(JSON.stringify(checkInData));
      console.log(response);

      if (response.ok) {
        const data = await response.json();
        alert("Check-in submitted successfully!");
        console.log(data);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      alert(`Failed to submit check-in: ${error.message}`);
    }

  };

  return (
    <div className="check-in-container">
      <h2>Daily Check-In</h2>
      <form className="check-in-form" onSubmit={handleSubmit}>
        <label>
          How are you feeling today?
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="check-in-select"
            required
          >
            <option value="">Select an option...</option>
            <option value="Happy">Happy</option>
            <option value="Neutral">Neutral</option>
            <option value="Sad">Sad</option>
          </select>
        </label>
        <label>
          How many hours did you sleep?
          <select
            value={sleepHours}
            onChange={(e) => setSleepHours(e.target.value)}
            className="check-in-select"
            required
          >
            <option value="">Select an option...</option>
            <option value="0">0 hours</option>
            <option value="1">1 hour</option>
            <option value="2">2 hours</option>
            <option value="3">3 hours</option>
            <option value="4">4 hours</option>
            <option value="5">5 hours</option>
            <option value="6">6 hours</option>
            <option value="7">7 hours</option>
            <option value="8">8 hours</option>
            <option value="9">9 hours</option>
            <option value="10">10 hours</option>
            <option value="11">11 hours</option>
            <option value="12">12 hours</option>
          </select>
        </label>
        <label>
          Add a note (optional):
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="check-in-textarea"
          ></textarea>
        </label>
        <button type="submit" className="check-in-submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CheckInForm;
