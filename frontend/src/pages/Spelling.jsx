import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from "../components/NavBar";

function Spelling({ username = "Guest" }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [selected, setSelected] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [complete, setComplete] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [step, setStep] = useState('pronounce'); // 'pronounce' or 'spell'
  const recognitionRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/spelling/quiz/')
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

  // Step 1: Pronunciation
  const handlePronounceSubmit = () => {
    if (selected) return;
    const correct = questions[currentIndex].word.toLowerCase().trim();
    let ua = userAnswer.toLowerCase().trim();
    if (ua === correct) {
      setFeedback('✅ Pronunciation correct! Now spell the word.');
      setUserAnswer('');
      setStep('spell');
    } else {
      setFeedback(`❌ Incorrect, please try again.`);
      setUserAnswer('');
    }
  };

  // Step 2: Spelling
  const handleSpellSubmit = () => {
    if (selected) return;
    const correct = questions[currentIndex].word.toLowerCase().trim();
    let ua = userAnswer.toLowerCase().trim();
    setSelected(true);
    setFeedback(ua === correct ? '✅ Correct spelling!' : `❌ Incorrect, please try again.`);
  };

  const handleNext = () => {
    if (currentIndex === questions.length - 1) {
      setComplete(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setUserAnswer('');
      setSelected(false);
      setFeedback('');
      setStep('pronounce');
    }
  };

  const playAudio = () => {
    const audioUrl = questions[currentIndex].audio_url;
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  if (complete) {
    return (
      <>
        <NavBar title="Edu-Bot Spelling" username={username} color="blue"/>
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <h2>🎉 Great job! You completed the spelling quiz.</h2>
          <button onClick={() => navigate('/subjects')}>Return to Subjects</button>
        </div>
      </>
    );
  }

  if (questions.length === 0) {
    return (
      <>
        <NavBar title="Edu-Bot Spelling" username={username} color="blue" />
        <p>Loading questions...</p>
      </>
    );
  }

  const q = questions[currentIndex];

  return (
    <>
      <NavBar title="Edu-Bot Spelling" username={username} color="blue" />
      <div style={{ maxWidth: '700px', margin: 'auto', padding: '20px' }}>
        <h2>📝 Spelling Quiz</h2>

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

        {/* Image and Audio */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
          {q.image_url && (
            <img src={q.image_url} alt="Spelling" style={{ width: 180, height: 180, objectFit: 'contain', marginBottom: '10px' }} />
          )}
          {q.audio_url && (
            <button onClick={playAudio} style={{ marginBottom: '10px', fontSize: '1.2em' }}>🔊 Play Word</button>
          )}
        </div>

        {/* Step Instructions */}
        <div style={{ marginBottom: '15px', fontWeight: 'bold' }}>
          {step === 'pronounce' ? 'Step 1: Pronounce the word using the microphone.' : 'Step 2: Spell the word using the keypad.'}
        </div>

        {/* Pronounce Step */}
        {step === 'pronounce' && (
          <div style={{ marginBottom: '15px', gap: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <input
              type="text"
              value={userAnswer}
              disabled
              placeholder="Say your answer"
              style={{
                fontSize: '1.1em',
                padding: '8px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                width: '250px',
                marginBottom: '10px',
                backgroundColor: '#f5f5f5',
                color: '#333'
              }}
            />
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
            {/* Show what the microphone heard */}
            <button
              onClick={handlePronounceSubmit}
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
            >Submit</button>
          </div>
        )}

        {/* Spell Step */}
        {step === 'spell' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '15px' }}>
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
                width: '200px',
                marginBottom: '10px'
              }}
              onKeyDown={e => { if (e.key === 'Enter') handleSpellSubmit(); }}
            />
            {/* On-Screen Keypad for letters */}
            {['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'].map((row, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '6px', marginBottom: '5px' }}>
                {row.split('').map(letter => (
                  <button
                    key={letter}
                    disabled={selected}
                    style={{ width: 36, height: 40, fontSize: '1.1em', textTransform: 'uppercase' }}
                    onClick={() => setUserAnswer(userAnswer + letter.toLowerCase())}
                  >{letter}</button>
                ))}
              </div>
            ))}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                disabled={selected}
                style={{ width: 100, height: 50, fontSize: '1.1em', backgroundColor: 'red', color: 'white', textAlign: 'center', }}
                onClick={() => setUserAnswer('')}
              >Clear</button>
              <button
                disabled={selected || userAnswer.trim() === ''}
                style={{
                  width: 100,
                  height: 50,
                  fontSize: '1.1em',
                  textAlign: 'center',
                  backgroundColor: '#4caf50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: selected ? 'not-allowed' : 'pointer'
                }}
                onClick={handleSpellSubmit}
              >Submit</button>
            </div>
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

export default Spelling;