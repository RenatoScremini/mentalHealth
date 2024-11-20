import React, { useState } from "react";

const CheckInForm = () => {
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Mood: ${mood}\nNote: ${note}`);
    setMood("");
    setNote("");
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
