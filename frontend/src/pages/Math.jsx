import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import TTSService from "../services/TTSService"; // your existing TTS wrapper
import "../assets/Math.css";

export default function Math({ username = "Guest" }) {
  const [questions, setQuestions] = useState([]); // fetch from /api/questions?subject=math
  const [idx, setIdx] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [mode, setMode] = useState("keypad");
  const [correctCount, setCorrectCount] = useState(0);
  const [retry, setRetry] = useState([]);

  // load initial questions
  useEffect(() => {
    fetch("/api/questions?subject=math")
      .then(r => r.json())
      .then(qs => setQuestions(qs));
  }, []);

  // TTS setup
  const tts = new TTSService({ voice: "pNInz6obpgDQGcFmaJgB" });

  function switchMode(m) {
    setMode(m);
  }

  function appendNum(n) {
    setAnswer(prev => prev + n);
  }
  function clearAnswer() {
    setAnswer("");
    setFeedback("");
  }

  function readQuestion() {
    if (questions[idx]) tts.speak(questions[idx].q);
  }

  function submitAnswer() {
    if (!questions[idx]) return;
    let ua = answer.toLowerCase().trim();
    // convert words → digits
    const map = { zero:"0",one:"1",two:"2",three:"3",four:"4",five:"5",six:"6",seven:"7",eight:"8",nine:"9" };
    if (map[ua]) ua = map[ua];

    const correct = questions[idx].a.map(a=>a.toLowerCase());
    if (correct.includes(ua)) {
      setFeedback("✅ Correct!");
      setCorrectCount(c => c+1);
    } else {
      setFeedback("❌ Try Again Next Time!");
      setRetry(r => [...r, questions[idx]]);
    }
    setAnswer("");
    // progress to next after delay
    setTimeout(() => {
      setFeedback("");
      if (idx+1 < questions.length) setIdx(i=>i+1);
      else if (retry.length) {
        setQuestions(retry);
        setRetry([]);
        setIdx(0);
      }
    }, 1000);
  }

  // calculate progress width
  const progress = questions.length
    ? Math.round(((correctCount) / questions.length) * 100)
    : 0;

  return (
    <>
      <NavBar
        title="Edu-Bot Math"
        username={username}
        links={[{ to: "/subjects", label: "BACK" }]}
      />
      <div className="container">
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>

        <div className="mode-toggle">
          <button
            className={mode==="mic"?"toggle-btn active":"toggle-btn"}
            onClick={()=>switchMode("mic")}>🎤</button>
          <button
            className={mode==="keypad"?"toggle-btn active":"toggle-btn"}
            onClick={()=>switchMode("keypad")}>🔢</button>
        </div>

        <div className="question">
          {questions[idx]
            ? `Q${idx+1}: ${questions[idx].q}`
            : "No questions loaded."}
          <button id="read-btn" onClick={readQuestion}>🔊 Read</button>
        </div>

        {mode==="keypad" && (
          <div className="keypad">
            <input
              readOnly
              value={answer}
              className="answer-box"
            />
            <div className="keypad-grid">
              {[1,2,3,4,5,6,7,8,9].map(n => (
                <button key={n} onClick={() => appendNum(String(n))}>{n}</button>
              ))}
              <button onClick={clearAnswer} className="action">&lt;</button>
              <button onClick={()=>appendNum("0")}>0</button>
              <button onClick={submitAnswer} className="action">✔</button>
            </div>
            <div className="feedback">{feedback}</div>
          </div>
        )}

        {mode==="mic" && (
          <div className="mic-area">
            <div className="mic-placeholder">🎤</div>
            <button onClick={readQuestion}>Start Listening</button>
            <div className="feedback">{feedback}</div>
            <div>
              <button onClick={submitAnswer}>✔ Submit</button>
              <button onClick={clearAnswer}>✖ Retry</button>
            </div>
          </div>
        )}

        {idx >= questions.length && (
          <button onClick={()=>window.location.href="/subjects"} className="next-lesson">
            Next Lesson
          </button>
        )}
      </div>
    </>
  );
}
