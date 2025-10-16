import React, { useState, useEffect, useRef } from "react";
import '../style/pomodoro.css'
import Navbar from "../components/Navbar";


const SESSION_TYPES = [
  { name: "Short Focus", minutes: 25 },
  { name: "Medium Focus", minutes: 35 },
  { name: "Long Focus", minutes: 45 },
];

export default function PomodoroTimer() {
  const [sessionIndex, setSessionIndex] = useState(
    () => parseInt(localStorage.getItem("sessionIndex")) || 0
  );
  const [timeLeft, setTimeLeft] = useState(
    () => parseInt(localStorage.getItem("timeLeft")) || SESSION_TYPES[sessionIndex].minutes * 60
  );
  const [isRunning, setIsRunning] = useState(
    () => JSON.parse(localStorage.getItem("isRunning")) || false
  );

  const [customInputHours, setCustomInputHours] = useState(
    () => parseInt(localStorage.getItem("customInputHours")) || 0
  );
  const [customInputMinutes, setCustomInputMinutes] = useState(
    () => parseInt(localStorage.getItem("customInputMinutes")) || 0
  );
  const [customInputSeconds, setCustomInputSeconds] = useState(
    () => parseInt(localStorage.getItem("customInputSeconds")) || 0
  );
  const [customTime, setCustomTime] = useState(
    () => parseInt(localStorage.getItem("customTime")) || 0
  );
  const [customRunning, setCustomRunning] = useState(
    () => JSON.parse(localStorage.getItem("customRunning")) || false
  );

  const [stopwatchTime, setStopwatchTime] = useState(
    () => parseInt(localStorage.getItem("stopwatchTime")) || 0
  );
  const [stopwatchRunning, setStopwatchRunning] = useState(
    () => JSON.parse(localStorage.getItem("stopwatchRunning")) || false
  );

  const [isNotifying, setIsNotifying] = useState(false);
  const [isBackgroundPlaying, setIsBackgroundPlaying] = useState(
    () => JSON.parse(localStorage.getItem("isBackgroundPlaying")) || false
  );

  const timerRef = useRef(null);
  const customRef = useRef(null);
  const stopwatchRef = useRef(null);
  const alarmAudioRef = useRef(null); 
  const backgroundAudioRef = useRef(null); 


  useEffect(() => {
    localStorage.setItem("sessionIndex", sessionIndex);
    localStorage.setItem("timeLeft", timeLeft);
    localStorage.setItem("isRunning", isRunning);
    localStorage.setItem("customInputHours", customInputHours);
    localStorage.setItem("customInputMinutes", customInputMinutes);
    localStorage.setItem("customInputSeconds", customInputSeconds);
    localStorage.setItem("customTime", customTime);
    localStorage.setItem("customRunning", customRunning);
    localStorage.setItem("stopwatchTime", stopwatchTime);
    localStorage.setItem("stopwatchRunning", stopwatchRunning);
    localStorage.setItem("isBackgroundPlaying", isBackgroundPlaying);
  }, [
    sessionIndex, timeLeft, isRunning,
    customInputHours, customInputMinutes, customInputSeconds, customTime, customRunning,
    stopwatchTime, stopwatchRunning, isBackgroundPlaying
  ]);

  useEffect(() => {
    const audio = backgroundAudioRef.current;
    if (audio) {
      audio.loop = true; 
      
      const shouldPlay = isBackgroundPlaying && (isRunning || customRunning);
      
      if (shouldPlay) {
        audio.play().catch(e => console.error("Error playing background audio:", e));
      } else {
        audio.pause();
      }
    }
  }, [isBackgroundPlaying, isRunning, customRunning]);
  
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            
            setIsNotifying(true);
            alarmAudioRef.current.play().catch(e => console.error("Error playing alarm:", e));
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  useEffect(() => {
    if (customRunning && customTime > 0) {
      customRef.current = setInterval(() => {
        setCustomTime(prev => {
          if (prev <= 1) {
            clearInterval(customRef.current);
            setCustomRunning(false);
            
            setIsNotifying(true);
            alarmAudioRef.current.play().catch(e => console.error("Error playing alarm:", e));
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(customRef.current);
    }
    return () => clearInterval(customRef.current);
  }, [customRunning, customTime]);

  useEffect(() => {
    if (stopwatchRunning) {
      stopwatchRef.current = setInterval(() => {
        setStopwatchTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(stopwatchRef.current);
    }
    return () => clearInterval(stopwatchRef.current);
  }, [stopwatchRunning]);

  const formatTime = seconds => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    
    return seconds >= 3600 ? `${h}:${m}:${s}` : `${m}:${s}`;
  };

  const handleSessionClick = (index) => {
    setSessionIndex(index);
    setTimeLeft(SESSION_TYPES[index].minutes * 60);
    setIsRunning(false);
  };

  const setCustomTimeFromInputs = () => {
    const totalSeconds = (customInputHours * 3600) + (customInputMinutes * 60) + customInputSeconds;
    setCustomTime(totalSeconds);
    setCustomRunning(false);
  };
  
  const stopAlarmAndCloseNotification = () => {
    alarmAudioRef.current.pause();
    alarmAudioRef.current.currentTime = 0;
    setIsNotifying(false);
  };

  const resetPomodoro = () => {
    setTimeLeft(SESSION_TYPES[sessionIndex].minutes * 60);
    setIsRunning(false);
  };

  const resetStopwatch = () => {
    setStopwatchTime(0);
    setStopwatchRunning(false);
  };

  const resetCustom = () => {
    setCustomTime(0);
    setCustomRunning(false);
    setCustomInputHours(0);   
    setCustomInputMinutes(0); 
    setCustomInputSeconds(0); 
  };
  
  const toggleBackgroundSound = () => {
    setIsBackgroundPlaying(prev => !prev);
  }

  const canStartCustom = customTime > 0 || customInputHours > 0 || customInputMinutes > 0 || customInputSeconds > 0;

  return (
    <>
    <Navbar/>
    <section className="pomodoro-section">
      <audio ref={alarmAudioRef} src="/aot.mp3" preload="auto" /> 
      <audio ref={backgroundAudioRef} src="/rainy.mp3" preload="auto" />
      
      {isNotifying && (
        <div className="timer-notification-overlay">
          <div className="timer-notification">
            <h2>Time's Up! 🥳</h2>
            <p>Your focus session has ended. Take a well-deserved break!</p>
            <button onClick={stopAlarmAndCloseNotification}>Stop Sound & Dismiss</button>
          </div>
        </div>
      )}
      
      <h1>Study With Pomodoro 🍅</h1>
      <p>Lock on with the best way to study 25 to 45 min per session</p>

      <div className="background-sound-control">
        <button 
          onClick={toggleBackgroundSound} 
          disabled={isRunning || customRunning}
        >
          {isBackgroundPlaying ? '🔊 Stop Ambiance' : '🔇 Play Ambiance'}
          {(!isRunning && !customRunning && isBackgroundPlaying) && <small> (Starts with Timer)</small>}
        </button>
        {(isRunning || customRunning) && (
            <p className="sound-status-msg">Ambiance is linked to the active timer.</p>
        )}
      </div>

      <div className="timer-stopwatch-container">
        <div className="timer">
          <h3>Pomodoro Timer</h3>
          <div className="session-buttons">
            {SESSION_TYPES.map((s, idx) => (
              <button
                key={idx}
                className={sessionIndex === idx ? "active" : ""}
                onClick={() => handleSessionClick(idx)}
              >
                {s.minutes} min
              </button>
            ))}
          </div>
          <div className="timer-display">{formatTime(timeLeft)}</div>
          <div className="buttons-group">
            {!isRunning ? (
              <button onClick={() => setIsRunning(true)}>Start</button>
            ) : (
              <button onClick={() => setIsRunning(false)}>Pause</button>
            )}
            <button onClick={resetPomodoro}>Reset</button>
          </div>
        </div>

        <div className="stopwatch">
          <h3>Stopwatch</h3>
          <div className="stopwatch-display">{formatTime(stopwatchTime)}</div>
          <div className="buttons-group">
            {!stopwatchRunning ? (
              <button onClick={() => setStopwatchRunning(true)}>Start</button>
            ) : (
              <button onClick={() => setStopwatchRunning(false)}>Pause</button>
            )}
            <button onClick={resetStopwatch}>Reset</button>
          </div>
        </div>


        <div className="custom-timer">
          <h3>Custom Timer</h3>
          <div className="custom-input-group">
            <input 
              type="number" 
              placeholder="Hr" 
              min="0" 
              value={customInputHours}
              onChange={(e) => setCustomInputHours(parseInt(e.target.value) || 0)} 
              onBlur={setCustomTimeFromInputs} 
            />
            <input 
              type="number" 
              placeholder="Min" 
              min="0" 
              value={customInputMinutes}
              onChange={(e) => setCustomInputMinutes(parseInt(e.target.value) || 0)} 
              onBlur={setCustomTimeFromInputs} 
            />
            <input 
              type="number" 
              placeholder="Sec" 
              min="0" 
              max="59" 
              value={customInputSeconds}
              onChange={(e) => setCustomInputSeconds(parseInt(e.target.value) || 0)} 
              onBlur={setCustomTimeFromInputs} 
            />
          </div>
          <div className="timer-display">{formatTime(customTime)}</div>
          <div className="buttons-group">
            {!customRunning ? (
              <button 
                onClick={() => {
                  setCustomTimeFromInputs(); 
                  if (canStartCustom) setCustomRunning(true);
                }}
                disabled={!canStartCustom}
              >
                Start
              </button>
            ) : (
              <button onClick={() => setCustomRunning(false)}>Pause</button>
            )}
            <button onClick={resetCustom}>Reset</button>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}