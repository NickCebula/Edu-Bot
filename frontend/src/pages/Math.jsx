import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from "../components/NavBar"; // Add this import

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

      {/* Input Mode Toggle */}
      <div style={{ marginBottom: '15px' }}>
        <button
          onClick={() => setInputMode('keypad')}
          disabled={inputMode === 'keypad'}
          style={{ marginRight: '10px', background: inputMode === 'keypad' ? '#4caf50' : '#e0e0e0', color: inputMode === 'keypad' ? 'white' : 'black', borderRadius: '5px', padding: '6px 16px', border: 'none' }}
        >
          Keypad
        </button>
        <button
          onClick={() => setInputMode('mic')}
          disabled={inputMode === 'mic'}
          style={{ background: inputMode === 'mic' ? '#4caf50' : '#e0e0e0', color: inputMode === 'mic' ? 'white' : 'black', borderRadius: '5px', padding: '6px 16px', border: 'none' }}
        >
          Microphone
        </button>
      </div>

      {/* Answer Input */}
      <div style={{ marginBottom: '15px' }}>
        <input
          type="text"
          value={userAnswer}
          disabled={selected || inputMode === 'mic'}
          onChange={e => setUserAnswer(e.target.value)}
          placeholder={inputMode === 'mic' ? "Use the microphone" : "Type your answer"}
          style={{
            fontSize: '1.1em',
            padding: '8px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            width: '200px'
          }}
          onKeyDown={e => { if (e.key === 'Enter') handleSubmit(); }}
        />
      </div>

      {/* Keypad or Microphone */}
      {inputMode === 'keypad' && (
//       {/* On-Screen Keypad */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '15px' }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>
            {[1,2,3].map(n => (
              <button key={n} disabled={selected}
                style={{ width: 40, height: 40, fontSize: '1.2em' }}
                onClick={() => setUserAnswer(userAnswer + n)}
             >{n}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>
            {[4,5,6].map(n => (
              <button key={n} disabled={selected}
                style={{ width: 40, height: 40, fontSize: '1.2em' }}
                onClick={() => setUserAnswer(userAnswer + n)}
              >{n}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>
            {[7,8,9].map(n => (
              <button key={n} disabled={selected}
                style={{ width: 40, height: 40, fontSize: '1.2em' }}
                onClick={() => setUserAnswer(userAnswer + n)}
              >{n}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button disabled={selected}
              style={{
                width: 40,
                height: 40,
                fontSize: '1.1em',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: selected ? 'not-allowed' : 'pointer'
              }}
              onClick={() => setUserAnswer('')}
            >C</button>
            <button disabled={selected}
              style={{ width: 40, height: 40, fontSize: '1.2em' }}
              onClick={() => setUserAnswer(userAnswer + '0')}
            >0</button>
            <button
              disabled={selected || userAnswer.trim() === ''}
              style={{
                width: 40,
                height: 40,
                fontSize: '1.1em',
                backgroundColor: '#4caf50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
               cursor: selected ? 'not-allowed' : 'pointer'
              }}
              onClick={handleSubmit}
            >V</button>
          </div>
       </div>
      )}

      {inputMode === 'mic' && (
        <div style={{ marginBottom: '15px', gap: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button
            disabled={selected}
            style={{
              width: 150,
              height: 70,
              fontSize: '1.1em',
              backgroundColor: isRecording ? '#f44336' : '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: selected ? 'not-allowed' : 'pointer'
            }}
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
            style={{
              width: 100,
              height: 50,
              fontSize: '1.1em',
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: selected ? 'not-allowed' : 'pointer'
            }}
          >
            Submit
          </button>
        </div>
      )}

      {/* Feedback */}
      {feedback && <p style={{ marginTop: '10px', fontWeight: 'bold' }}>{feedback}</p>}

      {/* Next Button */}
      {selected && (
        <button onClick={handleNext} style={{ marginTop: '20px' }}>
          {currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
        </button>
      )}
    </div>
    </>
  );
}

export default Math;