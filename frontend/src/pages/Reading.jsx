import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";


export default function Reading() {
  const [passage, setPassage] = useState("");
  const [questions, setQuestions] = useState([]);
  const [selected, setSelected] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch reading passage and questions from backend API
    async function fetchReading() {
      setLoading(true);
      try {
        const res = await fetch("/api/reading/");
        if (!res.ok) throw new Error("Failed to fetch reading passage.");
        const data = await res.json();
        setPassage(data.passage);
        setQuestions(data.questions);
      } catch (err) {
        setPassage("Sorry, there was a problem loading the reading passage.");
        setQuestions([]);
      }
      setLoading(false);
    }
    fetchReading();
  }, []);

  const handleOptionChange = (qIdx, option) => {
    setSelected({ ...selected, [qIdx]: option });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowResults(true);
  };

  if (loading) {
    return (
      <div className="container">
        <h1>Reading Time!</h1>
        <p>Loading passage...</p>
      </div>
    );
  }

  return (
    <> 
      {/* Retrieve username from localStorage or set as 'Guest' if not found */}
      {(() => {
        var username = localStorage.getItem("username");
        return <NavBar title="Edu-Bot" username={username} />;
      })()} 
    
      <div className="container">
        <h1>Reading Time!</h1>
        <p style={{ background: "#e3f2fd", padding: "16px", borderRadius: "10px" }}>
          {passage}
        </p>
        {questions.length > 0 ? (
          <form onSubmit={handleSubmit}>
            {questions.map((q, idx) => (
              <div key={idx} style={{ marginBottom: "20px" }}>
                <strong>{idx + 1}. {q.question}</strong>
                <div>
                  {q.options.map((option) => (
                    <label key={option} style={{ display: "block", margin: "6px 0" }}>
                      <input
                        type="radio"
                        name={`q${idx}`}
                        value={option}
                        checked={selected[idx] === option}
                        onChange={() => handleOptionChange(idx, option)}
                        disabled={showResults}
                      />
                      {" "}{option}
                    </label>
                  ))}
                </div>
                {showResults && (
                  <div>
                    {selected[idx] === q.answer ? (
                      <span style={{ color: "green" }}>Correct!</span>
                    ) : (
                      <span style={{ color: "red" }}>
                        Incorrect. The answer is "{q.answer}".
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
            {!showResults && (
              <button type="submit">Check Answers</button>
            )}
          </form>
        ) : (
          <p>No questions available for this passage.</p>
        )}
      </div>
    </>
  );
}