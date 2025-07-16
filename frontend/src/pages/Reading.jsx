import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from "../components/NavBar";

function Reading() {
  const [questions, setQuestions] = useState([]);
  const [showQuestion, setShowQuestion] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState('');
  const [submitted, setSubmitted] = useState(false); // NEW STATE
  const [feedback, setFeedback] = useState('');
  const [complete, setComplete] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8000/api/reading/quiz/')
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error('Failed to load questions:', err));
  }, []);

  const handleSelect = (choice) => {
    if (submitted) return;
    setSelected(choice);
  };

  const handleSubmit = () => {
    if (!selected || submitted) return;
    setSubmitted(true);
    const correct = questions[currentIndex].correct_answer;
    setFeedback(selected === correct ? '✅ Correct!' : `❌ Correct: ${correct}`);
  };

  const handleNext = () => {
    if (currentIndex === questions.length - 1) {
      setComplete(true);
      setShowQuestion(false);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelected('');
      setFeedback('');
      setSubmitted(false);
    }
  };

  if (complete) {
    return (
      <>
        <NavBar title="Edu-Bot Reading" username="Guest" color="lightgreen" />
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <h2>🎉 Great job! You completed the quiz.</h2>
          <button onClick={() => navigate('/subjects')}>Return to Subjects</button>
        </div>
      </>
    );
  }

  if (questions.length === 0) {
    return (
      <>
        <NavBar title="Edu-Bot Reading" username="Guest" color="lightgreen" />
        <p>Loading questions...</p>
      </>
    );
  }

  const q = questions[currentIndex];

  return (
    <>
      <NavBar title="Edu-Bot Reading" username="Guest" color="lightgreen" />
      <div style={{ maxWidth: '700px', margin: 'auto', padding: '20px' }}>
        <h2>📚 Reading Quiz</h2>

        {/* Progress Bar */}
        <div style={{ height: '20px', backgroundColor: '#e0e0e0', borderRadius: '10px', marginBottom: '20px' }}>
          <div
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
              height: '100%',
              backgroundColor: '#4caf50',
              borderRadius: '10px',
              transition: 'width 0.3s ease',
            }}
          ></div>
        </div>

        {/* Passage */}
        <div style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
          <strong>Passage:</strong>
          <p>{q.passage.passage_text || 'No passage provided.'}</p>
        </div>

        {/* Question */}
        {!showQuestion ? (
          <button onClick={() => setShowQuestion(true)} style={{ marginTop: '15px' }}>
            Continue to Question
          </button>
        ) : (
          <>
            <p><strong>Question {currentIndex + 1} of {questions.length}:</strong> {q.prompt}</p>

            <div style={{ display: 'inline-grid', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
              {['A', 'B', 'C', 'D'].map((opt) => (
                <label
                  key={opt}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    backgroundColor: selected === opt ? '#d1e7dd' : '#f8f9fa',
                    gap: '8px',
                    cursor: submitted ? 'default' : 'pointer',
                    maxWidth: 'fit-content',
                    minWidth: '300px'
                  }}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={opt}
                    disabled={submitted}
                    checked={selected === opt}
                    onChange={() => handleSelect(opt)}
                    style={{ margin: 0 }}
                  />
                  <span>{q[`option_${opt.toLowerCase()}`]}</span>
                </label>
              ))}
            </div>

            {/* Submit Button */}
            <div style={{ marginTop: '15px' }}>
              <button
                onClick={handleSubmit}
                disabled={!selected || submitted}
                style={{
                  width: 100,
                  height: 50,
                  fontSize: '1.1em',
                  backgroundColor: '#4caf50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: !selected || submitted ? 'not-allowed' : 'pointer',
                  opacity: !selected || submitted ? 0.7 : 1
                }}
              >Submit</button>
            </div>

            {/* Feedback */}
            {feedback && <p style={{ marginTop: '15px', fontWeight: 'bold' }}>{feedback}</p>}

            {/* Next Button */}
            {submitted && (
              <button onClick={handleNext} style={{ marginTop: '20px' }}>
                {currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Reading;