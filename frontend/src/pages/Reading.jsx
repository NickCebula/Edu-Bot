import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Reading() {
  const [questions, setQuestions] = useState([]);
  const [showQuestion, setShowQuestion] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState('');
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
            cursor: 'pointer',
            maxWidth: 'fit-content',
            minWidth: '300px'
          }}
        >
          <input
            type="radio"
            name="answer"
            value={opt}
            disabled={!!selected}
            checked={selected === opt}
            onChange={() => handleSelect(opt)}
            style={{ margin: 0 }}
          />
          <span>{q[`option_${opt.toLowerCase()}`]}</span>
        </label>
      ))}
    </div>

    {feedback && <p style={{ marginTop: '15px', fontWeight: 'bold' }}>{feedback}</p>}
  </>
)}

      {/* Options */}
      {selected && (
        <button onClick={handleNext} style={{ marginTop: '20px' }}>
          {currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
        </button>
      )}
    </div>
  );
}

export default Reading;
