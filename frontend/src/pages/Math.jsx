import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from "../components/NavBar";
import '../assets/Math.css';

function Math() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [selected, setSelected] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [complete, setComplete] = useState(false);
  const [inputMode, setInputMode] = useState('keypad'); // 'keypad' or 'mic'
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/math/quiz/')
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error('Failed to load questions:', err));
  }, []);

  // Speech recognition setup
  useEffect(() => {
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = 'en-US';
    recognitionRef.current.interimResults = false;
    recognitionRef.current.maxAlternatives = 1;

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setUserAnswer(transcript);
      setIsRecording(false);
    };
    recognitionRef.current.onend = () => setIsRecording(false);
    recognitionRef.current.onerror = () => setIsRecording(false);
  }, []);

  const handleMicDown = () => {
    if (recognitionRef.current && !selected) {
      setIsRecording(true);
      setUserAnswer('');
      recognitionRef.current.start();
    }
  };

  const handleMicUp = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
    }
  };

  const handleSubmit = () => {
    if (selected) return;
    setSelected(true);
    const correctAnswers = questions[currentIndex].a.map(a => a.toLowerCase().trim());
    let ua = userAnswer.toLowerCase().trim();
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
      <>
        <NavBar title="Edu-Bot Math" username="Guest" color="red" />
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <h2>🎉 Great job! You completed the math quiz.</h2>
          <button onClick={() => navigate('/subjects')}>Return to Subjects</button>
        </div>
      </>
    );
  }

  if (questions.length === 0) {
    return (
      <>
        <NavBar title="Edu-Bot Math" username="Guest" color="red" />
        <p>Loading questions...</p>
      </>
    );
  }

  const q = questions[currentIndex];

  return (
    <>
    <NavBar title="Edu-Bot Math" username="Guest" color="red" />
    <div className="math-container">
      <h2>🧮 Math Quiz</h2>

      {/* Progress Bar */}
      <div className="math-progress-bar-bg">
        <div
          className="math-progress-bar"
          style={{
            width: `${((currentIndex + 1) / questions.length) * 100}%`
          }}
        ></div>
      </div>

      {/* Question */}
      <div className="math-question-box">
        <strong>Question {currentIndex + 1} of {questions.length}:</strong>
        <p className="math-question-text">{q.q}</p>
      </div>

      {/* Input Mode Toggle */}
      <div className="math-input-toggle">
        <button
          onClick={() => setInputMode('keypad')}
          disabled={inputMode === 'keypad'}
          className={`math-toggle-btn${inputMode === 'keypad' ? ' active' : ''}`}
        >
          Keypad
        </button>
        <button
          onClick={() => setInputMode('mic')}
          disabled={inputMode === 'mic'}
          className={`math-toggle-btn${inputMode === 'mic' ? ' active' : ''}`}
        >
          Microphone
        </button>
      </div>

      {/* Answer Input */}
      <div className="math-answer-input">
        <input
          type="text"
          value={userAnswer}
          disabled={selected || inputMode === 'mic'}
          onChange={e => setUserAnswer(e.target.value)}
          placeholder={inputMode === 'mic' ? "Use the microphone" : "Type your answer"}
          className="math-answer-input-box"
          onKeyDown={e => { if (e.key === 'Enter') handleSubmit(); }}
        />
      </div>

      {/* Keypad or Microphone */}
      {inputMode === 'keypad' && (
        <div className="math-keypad">
          <div className="math-keypad-row">
            {[1,2,3].map(n => (
              <button key={n} disabled={selected}
                className="math-keypad-btn"
                onClick={() => setUserAnswer(userAnswer + n)}
             >{n}</button>
            ))}
          </div>
          <div className="math-keypad-row">
            {[4,5,6].map(n => (
              <button key={n} disabled={selected}
                className="math-keypad-btn"
                onClick={() => setUserAnswer(userAnswer + n)}
              >{n}</button>
            ))}
          </div>
          <div className="math-keypad-row">
            {[7,8,9].map(n => (
              <button key={n} disabled={selected}
                className="math-keypad-btn"
                onClick={() => setUserAnswer(userAnswer + n)}
              >{n}</button>
            ))}
          </div>
          <div className="math-keypad-row">
            <button disabled={selected}
              className="math-keypad-btn clear"
              onClick={() => setUserAnswer('')}
            >C</button>
            <button disabled={selected}
              className="math-keypad-btn"
              onClick={() => setUserAnswer(userAnswer + '0')}
            >0</button>
            <button
              disabled={selected || userAnswer.trim() === ''}
              className="math-keypad-btn submit"
              onClick={handleSubmit}
            >V</button>
          </div>
       </div>
      )}

      {inputMode === 'mic' && (
        <div className="math-mic-section">
          <button
            disabled={selected}
            className={`math-mic-btn${isRecording ? ' recording' : ''}`}
            onMouseDown={handleMicDown}
            onMouseUp={handleMicUp}
            onTouchStart={handleMicDown}
            onTouchEnd={handleMicUp}
          >
            {isRecording ? 'Recording...' : 'Hold to Record'}
          </button>
          <button
            onClick={handleSubmit}
            disabled={selected || userAnswer.trim() === ''}
            className="math-mic-submit-btn"
          >
            Submit
          </button>
        </div>
      )}

      {/* Feedback */}
      {feedback && <p className="math-feedback">{feedback}</p>}

      {/* Next Button */}
      {selected && (
        <button onClick={handleNext} className="math-next-btn">
          {currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
        </button>
      )}
    </div>
    </>
  );
}

export default Math;