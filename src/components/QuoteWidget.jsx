import React, { useEffect, useState } from "react";
//import axios from "axios";

export default function QuoteWidget() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://api.allorigins.win/get?url=" +
          encodeURIComponent("https://zenquotes.io/api/random")
      );
      const dataWrapped = await res.json();
      const data = JSON.parse(dataWrapped.contents);

      setQuote({
        content: data[0].q,
        author: data[0].a,
      });
    } catch (error) {
      console.error("Failed to fetch quote:", error);
      setQuote(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="widget quote-widget">
      <h2>💬 Quote of the Moment</h2>
      {loading ? (
        <p>Loading...</p>
      ) : quote ? (
        <blockquote>
          <p>"{quote.content}"</p>
          <footer>- {quote.author}</footer>
        </blockquote>
      ) : (
        <p>Could not load quote.</p>
      )}
      <button onClick={fetchQuote}>🔁 Refresh</button>
    </div>
  );
}
