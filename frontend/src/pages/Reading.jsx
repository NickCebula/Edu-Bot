import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authFetch } from '../utils/authFetch';

function Reading() {
  const [questions, setQuestions] = useState([]);
  const [showQuestion, setShowQuestion] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState('');
  const [feedback, setFeedback] = useState('');
  const [complete, setComplete] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    authFetch('http://localhost:8000/api/reading/quiz/')
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error('Failed to load questions:', err));
  }, []);

  const handleSelect = (choice) => {
    if (selected) return;
    setSelected(choice);
    const correct = questions[currentIndex].correct_answer;
    setFeedback(choice === correct ? '✅ Correct!' : `❌ Correct: ${correct}`);
  };

  const handleNext = () => {
    if (currentIndex === questions.length - 1) {
      setComplete(true);
      setShowQuestion(false);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelected('');
      setFeedback('');
    }
  };

  if (complete) {
    return (
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <h2>🎉 Great job! You completed the quiz.</h2>
        <button onClick={() => navigate('/subjects')}>Return to Subjects</button>
      </div>
    );
  }

  if (questions.length === 0) {
    return <p>Loading questions...</p>;
  }

  const q = questions[currentIndex];

  return (
    <div style={{ maxWidth: '700px', margin: 'auto', padding: '20px' }}>
      <h2>📚 Reading Comprehension Quiz</h2>

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
        <p style={{ fontSize: "1.25rem", lineHeight: 1.7 }}>
          {q && q.passage && q.passage.passage_text
            ? q.passage.passage_text
            : 'No passage provided.'}
        </p>
      </div>

      {/* Question */}
      {!showQuestion ? (
        <button onClick={() => setShowQuestion(true)} style={{ marginTop: '15px' }}>
          Continue to Question
        </button>
) : (
  <>
    <p><strong>Question {currentIndex + 1} of {questions.length}:</strong> {q.prompt}</p>

    {/* Options */}
    <ul style={{ listStyle: 'none', padding: 0, marginTop: 15 }}>
      {['A', 'B', 'C', 'D'].map((opt) => (
        <li key={opt} style={{
          marginBottom: 12,
          background: selected === opt
            ? (selected === q.correct_answer ? '#d4edda' : '#f8d7da')
            : '#fff',
          borderRadius: 6,
          padding: 8,
          border: '1px solid #ddd',
          transition: 'background 0.2s'
        }}>
          <label style={{ cursor: selected ? 'default' : 'pointer', fontSize: '1.1rem', width: '100%', display: 'block' }}>
            <input
              type="radio"
              name="answer"
              value={opt}
              disabled={!!selected}
              checked={selected === opt}
              onChange={() => handleSelect(opt)}
              style={{ marginRight: 8 }}
            />
            <strong>{opt}:</strong> {q[`option_${opt.toLowerCase()}`]}
          </label>
        </li>
      ))}
    </ul>
    {feedback && (
      <p style={{
        fontWeight: 'bold',
        fontSize: '1.1rem',
        color: feedback.includes('Correct') ? '#155724' : '#721c24',
        background: feedback.includes('Correct') ? '#d4edda' : '#f8d7da',
        borderRadius: 6,
        padding: 10,
        marginTop: 16,
        border: '1px solid #ccc'
      }}>
        {feedback}
      </p>
    )}
  </>
)}

      {/* Next Button */}
      {selected && (
        <button onClick={handleNext} style={{ marginTop: '20px' }}>
          {currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
        </button>
      )}
    </div>
  );
}

export default Reading;
