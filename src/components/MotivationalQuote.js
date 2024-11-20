import React, { useState, useEffect } from "react";

const MotivationalQuote = () => {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/well300/quotes-api/refs/heads/main/quotes.json"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const randomQuote = data[Math.floor(Math.random() * data.length)];
        setQuote(randomQuote);
      } catch (error) {
        console.error("Error fetching quotes:", error);
        setQuote({ quote: "Failed to load quote.", author: "Error" });
      }
    };

    fetchQuote();
  }, []);

  const changeQuote = async () => {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/well300/quotes-api/refs/heads/main/quotes.json"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      let newQuote;
      let attempts = 0;
      do {
        newQuote = data[Math.floor(Math.random() * data.length)];
        attempts++;
      } while (quote && newQuote.quote === quote.quote && attempts < 10);

      setQuote(newQuote);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };

  return (
    <div className="quote-container">
      <h2>Today's Motivational Quote</h2>
      {quote ? (
        <blockquote className="quote">
          <p>"{quote.quote}"</p>
          <footer>- {quote.author}</footer>
        </blockquote>
      ) : (
        <p>Loading...</p>
      )}
      <button className="change-quote-button" onClick={changeQuote}>
        Show Another Quote
      </button>
    </div>
  );
};

export default MotivationalQuote;
