import React, { useState, useEffect, useRef } from "react";
import '../style/pomodoro.css'
import Navbar from "../components/Navbar";
// NOTE: You must update the paths for your audio files.
// "/aot.mp3" is for the end-of-timer sound.
// "/rainy.mp3" is for the ambiance sound.

const SESSION_TYPES = [
  { name: "Short Focus", minutes: 25 },
  { name: "Medium Focus", minutes: 35 },
  { name: "Long Focus", minutes: 45 },
];

export default function PomodoroTimer() {
  // State initialization with localStorage lookup
  const [sessionIndex, setSessionIndex] = useState(
    () => parseInt(localStorage.getItem("sessionIndex")) || 0
  );
  const [timeLeft, setTimeLeft] = useState(
    () => parseInt(localStorage.getItem("timeLeft")) || SESSION_TYPES[sessionIndex].minutes * 60
  );
  const [isRunning, setIsRunning] = useState(
    () => JSON.parse(localStorage.getItem("isRunning")) || false
  );

  // Custom Timer State
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

  // Stopwatch State
  const [stopwatchTime, setStopwatchTime] = useState(
    () => parseInt(localStorage.getItem("stopwatchTime")) || 0
  );
  const [stopwatchRunning, setStopwatchRunning] = useState(
    () => JSON.parse(localStorage.getItem("stopwatchRunning")) || false
  );

  // Sound and Notification State
  const [isNotifying, setIsNotifying] = useState(false);
  const [isBackgroundPlaying, setIsBackgroundPlaying] = useState(
    () => JSON.parse(localStorage.getItem("isBackgroundPlaying")) || false
  );

  // Refs for intervals and audio
  const timerRef = useRef(null);
  const customRef = useRef(null);
  const stopwatchRef = useRef(null);
  const alarmAudioRef = useRef(null); // Ref for end-of-timer sound
  const backgroundAudioRef = useRef(null); // Ref for ambiance sound

  // 1. Local Storage Effect
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

  // 2. Background Audio Control Effect (Linked to active timers)
  useEffect(() => {
    const audio = backgroundAudioRef.current;
    if (audio) {
      audio.loop = true;
      
      const shouldPlay = isBackgroundPlaying && (isRunning || customRunning);
      
      if (shouldPlay) {
        // Must use .play() and .catch() due to browser autoplay policies
        audio.play().catch(e => console.error("Error playing background audio:", e));
      } else {
        audio.pause();
      }
    }
    // Dependency on isRunning and customRunning ensures sound stops when timers finish/pause
  }, [isBackgroundPlaying, isRunning, customRunning]);
  
  // 3. Pomodoro Timer Logic
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

  // 4. Custom Timer Logic
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

  // 5. Stopwatch Logic (Unchanged, relies on stopwatchRunning state)
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

  // Time Formatting Utility
  const formatTime = seconds => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    
    // Display H:MM:SS if hours are involved, otherwise M:SS
    return seconds >= 3600 ? `${h}:${m}:${s}` : `${m}:${s}`;
  };

  const handleSessionClick = (index) => {
    setSessionIndex(index);
    setTimeLeft(SESSION_TYPES[index].minutes * 60);
    setIsRunning(false);
  };

  // Handler for setting custom time from inputs (Hours, Minutes, Seconds)
  const setCustomTimeFromInputs = () => {
    const totalSeconds = 
      (customInputHours * 3600) + 
      (customInputMinutes * 60) + 
      customInputSeconds;
      
    setCustomTime(totalSeconds);
    setCustomRunning(false);
  };
  
  // Notification close handler
  const stopAlarmAndCloseNotification = () => {
    alarmAudioRef.current.pause();
    alarmAudioRef.current.currentTime = 0;
    setIsNotifying(false);
  };

  // Reset Handlers
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
  
  // Toggle background sound (only sets the user's preference)
  const toggleBackgroundSound = () => {
    setIsBackgroundPlaying(prev => !prev);
  }

  // Determine if Custom Timer can start
  const canStartCustom = customTime > 0 || customInputHours > 0 || customInputMinutes > 0 || customInputSeconds > 0;

  return (
    <>
    <Navbar/>
    <section className="pomodoro-section">
      {/* 🎵 Hidden Audio Elements */}
      <audio ref={alarmAudioRef} src="/aot.mp3" preload="auto" /> 
      <audio ref={backgroundAudioRef} src="/rainy.mp3" preload="auto" />
      
      {/* Timer Finished Notification */}
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

      {/* Background Sound Button */}
      <div className="background-sound-control">
        <button 
          onClick={toggleBackgroundSound} 
          disabled={isRunning || customRunning}
        >
          {isBackgroundPlaying ? '🔊 Stop Ambiance' : '🔇 Play Ambiance'}
        </button>
        {(isRunning || customRunning) && (
            <p className="sound-status-msg">Ambiance is linked to the active timer.</p>
        )}
      </div>

      <div className="timer-stopwatch-container">
        
        {/* Pomodoro Timer */}
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
            {/* Start/Pause Button */}
            {!isRunning ? (
              <button onClick={() => setIsRunning(true)}>Start</button>
            ) : (
              <button onClick={() => setIsRunning(false)}>Pause</button>
            )}
            <button onClick={resetPomodoro}>Reset</button>
          </div>
        </div>

        {/* Stopwatch (PAUSE BUTTON ADDED) */}
        <div className="stopwatch">
          <h3>Stopwatch</h3>
          <div className="stopwatch-display">{formatTime(stopwatchTime)}</div>
          <div className="buttons-group">
            {/* Start/Pause Button (Logic uses stopwatchRunning state) */}
            {!stopwatchRunning ? (
              <button onClick={() => setStopwatchRunning(true)}>Start</button>
            ) : (
              <button onClick={() => setStopwatchRunning(false)}>Pause</button>
            )}
            <button onClick={resetStopwatch}>Reset</button>
          </div>
        </div>


        {/* Custom Timer */}
        <div className="custom-timer">
          <h3>Custom Timer</h3>
          <div className="custom-input-group">
            <label>Set Time:</label>
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
            {/* Start/Pause Button */}
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