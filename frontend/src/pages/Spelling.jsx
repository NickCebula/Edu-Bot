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
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const recognitionRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/spelling/quiz/')
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error('Failed to load questions:', err));
  }, []);

  // Reset image loading state when question changes
  useEffect(() => {
    setImageLoading(true);
    setImageError(false);
  }, [currentIndex]);

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

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
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
      <div style={{ 
        maxWidth: '800px', 
        margin: 'auto', 
        padding: '30px 20px',
        backgroundColor: '#fff',
        minHeight: '100vh'
      }}>
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '30px',
          color: '#2c3e50',
          fontSize: '2.2em',
          fontWeight: 'bold'
        }}>
          📝 Spelling Quiz
        </h2>

        {/* Progress Bar */}
        <div style={{ 
          height: '12px', 
          backgroundColor: '#e9ecef', 
          borderRadius: '6px', 
          marginBottom: '30px',
          overflow: 'hidden'
        }}>
          <div
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
              height: '100%',
              backgroundColor: '#28a745',
              borderRadius: '6px',
              transition: 'width 0.3s ease',
            }}
          ></div>
        </div>



        {/* Image and Audio */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '30px' }}>
          {q.image_url && (
            <div style={{ 
              position: 'relative', 
              width: 200, 
              height: 200, 
              marginBottom: '20px',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              backgroundColor: '#fff'
            }}>
              {imageLoading && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#f8f9fa',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '12px',
                  fontSize: '14px',
                  color: '#6c757d'
                }}>
                  <div>Loading image...</div>
                </div>
              )}
              {imageError && (
                <div style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#f8f9fa',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '12px',
                  border: '2px dashed #dee2e6',
                  fontSize: '14px',
                  color: '#6c757d'
                }}>
                  <div>Image not available</div>
                </div>
              )}
              <img 
                src={q.image_url} 
                alt={`Spelling word: ${q.word}`}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'contain',
                  borderRadius: '12px',
                  display: imageLoading || imageError ? 'none' : 'block'
                }}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            </div>
          )}
          {q.audio_url && (
            <button 
              onClick={playAudio} 
              style={{ 
                marginBottom: '15px', 
                fontSize: '1.1em',
                padding: '12px 24px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}
            >
              🔊 Play Word
            </button>
          )}
        </div>

        {/* Step Instructions */}
        <div style={{ 
          marginBottom: '25px', 
          textAlign: 'center',
          padding: '15px',
          backgroundColor: step === 'pronounce' ? '#e3f2fd' : '#fff3cd',
          borderRadius: '8px',
          border: `2px solid ${step === 'pronounce' ? '#2196f3' : '#ffc107'}`
        }}>
          <div style={{ 
            fontWeight: 'bold', 
            fontSize: '1.1em',
            color: step === 'pronounce' ? '#1976d2' : '#856404'
          }}>
            {step === 'pronounce' ? '🎤 Step 1: Pronounce the word using the microphone' : '⌨️ Step 2: Spell the word using the keypad'}
          </div>
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
        {feedback && (
          <div style={{ 
            marginTop: '20px', 
            padding: '15px',
            borderRadius: '8px',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '1.1em',
            backgroundColor: feedback.includes('✅') ? '#d4edda' : '#f8d7da',
            color: feedback.includes('✅') ? '#155724' : '#721c24',
            border: `2px solid ${feedback.includes('✅') ? '#c3e6cb' : '#f5c6cb'}`
          }}>
            {feedback}
          </div>
        )}

        {/* Next Button */}
        {selected && (
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button 
              onClick={handleNext} 
              style={{ 
                padding: '15px 30px',
                fontSize: '1.2em',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'background-color 0.2s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#218838'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#28a745'}
            >
              {currentIndex === questions.length - 1 ? '🎉 Finish Quiz' : '➡️ Next Question'}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Spelling;