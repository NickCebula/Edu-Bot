import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Math() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [selected, setSelected] = useState(false); // true after submitting
  const [feedback, setFeedback] = useState('');
  const [complete, setComplete] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8000/api/math/quiz/')
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error('Failed to load questions:', err));
  }, []);

  const handleSubmit = () => {
    if (selected) return;
    setSelected(true);
    const correctAnswers = questions[currentIndex].a.map(a => a.toLowerCase().trim());
    let ua = userAnswer.toLowerCase().trim();
    // convert words to digits for simple numbers
    const map = { zero:"0",one:"1",two:"2",three:"3",four:"4",five:"5",six:"6",seven:"7",eight:"8",nine:"9" };
    if (map[ua]) ua = map[ua];
    setFeedback(correctAnswers.includes(ua) ? '✅ Correct!' : `❌ Correct: ${questions[currentIndex].a[1]}`);
  };

  const handleNext = () => {
    if (currentIndex === questions.length - 1) {
      setComplete(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setUserAnswer('');
      setSelected(false);
      setFeedback('');
    }
  };

  if (complete) {
    return (
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <h2>🎉 Great job! You completed the math quiz.</h2>
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
      <h2>🧮 Math Quiz</h2>

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

      {/* Question */}
      <div style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <strong>Question {currentIndex + 1} of {questions.length}:</strong>
        <p style={{ fontSize: '1.2em' }}>{q.q}</p>
      </div>

      {/* Answer Input */}
      <div style={{ marginBottom: '15px' }}>
        <input
          type="text"
          value={userAnswer}
          disabled={selected}
          onChange={e => setUserAnswer(e.target.value)}
          placeholder="Type your answer"
          style={{
            fontSize: '1.1em',
            padding: '8px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            width: '200px'
          }}
          onKeyDown={e => { if (e.key === 'Enter') handleSubmit(); }}
        />
        <button
          onClick={handleSubmit}
          disabled={selected || userAnswer.trim() === ''}
          style={{
            marginLeft: '10px',
            padding: '8px 16px',
            fontSize: '1em',
            borderRadius: '5px',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            cursor: selected ? 'not-allowed' : 'pointer'
          }}
        >
          Submit
        </button>
      </div>

      {/* Feedback */}
      {feedback && <p style={{ marginTop: '10px', fontWeight: 'bold' }}>{feedback}</p>}

      {/* Next Button */}
      {selected && (
        <button onClick={handleNext} style={{ marginTop: '20px' }}>
          {currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
        </button>
      )}
    </div>
  );
}

export default Math;