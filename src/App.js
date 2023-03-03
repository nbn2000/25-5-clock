import './App.css';
import { useState, useEffect } from 'react';

function App() {
  // State variables for minutes, seconds, and if the timer is running
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // State variables for session length and break length
  const [session, setSession] = useState(25);
  const [breaK, setBreaK] = useState(5);

  // State variable for whether it is break time or not
  const [isBreak, setIsBreak] = useState(false);

  // Audio element for the beep sound
  const beep = document.getElementById('beep');

  // Use effect hook for handling the timer logic
  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        if (seconds > 0) {
          // Decrease seconds by 1
          setSeconds((seconds) => seconds - 1);

          if (seconds === 1 && minutes > 0) {
            // Decrease minutes by 1 if seconds reach 0
            setMinutes((minutes) => minutes - 1);
          }
        }

        if (seconds === 0 && minutes === 0) {
          // Play beep sound and switch between session and break time
          beep.play();

          if (isBreak === false) {
            setMinutes(breaK);
            setIsBreak(true);
          } else if (isBreak === true) {
            setIsBreak(false);
          }
        }
      }, 1000);
    }

    if (seconds === 0 && minutes !== 0) {
      // Reset seconds to 59 if seconds reach 0 but minutes are not 0
      setSeconds(59);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, seconds, minutes, beep, breaK, isBreak]);

  // Function for handling the start/pause button click
  const onChange = () => {
    setIsRunning(!isRunning);

    if (minutes === session) {
      setTimeout(() => {
        setMinutes(minutes - 1);
      }, 100);
    }
  };

  // Function for handling the session length decrease button click
  const decBtnSn = () => {
    if (minutes > 1) {
      setMinutes(minutes - 1);
      setSession(session - 1);
    } else {
      return;
    }
  };

  // Function for handling the session length increase button click
  const incBtnSn = () => {
    if (minutes < 60) {
      setMinutes(minutes + 1);
      setSession(session + 1);
    } else {
      return;
    }
  };

  // Function for handling the break length increase button click
  const incBtnBr = () => {
    if (breaK < 60) {
      setBreaK(breaK + 1);
    } else {
      return;
    }
  };

  // Function for handling the break length decrease button click
  const decBtnBr = () => {
    if (breaK > 1) {
      setBreaK(breaK - 1);
    } else {
      return;
    }
  };

  // Function for handling the reset button click
  const resetBtn = () => {
    // Resetting the values of minutes, seconds, session length, and break length to their default values.
    setMinutes(25);
    setSeconds(60);
    setSession(25);
    setBreaK(5);
    // Setting isBreak to false, indicating that the timer is not in break mode.
    setIsBreak(false);
    // Pausing and resetting the beep sound.
    beep.pause();
    beep.currentTime = 0;
  };
  // Returning the JSX for the app
  return (
    <div className="App">
      <div id="container">
        <div id="app">
          <div>
            <div className="main-title">25 + 5 Clock</div>
            {/* Break length control */}
            <div className="length-control">
              <div id="break-label">Break Length</div>
              <button
                onClick={decBtnBr}
                className="btn-level"
                id="break-decrement"
                value="-"
              >
                <i className="fa fa-arrow-down fa-1x" />
              </button>
              <div className="btn-level" id="break-length">
                {breaK}
              </div>
              <button
                onClick={incBtnBr}
                className="btn-level"
                id="break-increment"
                value="+"
              >
                <i className="fa fa-arrow-up fa-1x" />
              </button>
            </div>
            {/* Session length control */}
            <div className="length-control">
              <div id="session-label">Session Length</div>
              <button
                onClick={decBtnSn}
                className="btn-level"
                id="session-decrement"
                value="-"
              >
                <i className="fa fa-arrow-down fa-1x" />
              </button>
              <div className="btn-level" id="session-length">
                {session}
              </div>
              <button
                onClick={incBtnSn}
                className="btn-level"
                id="session-increment"
                value="+"
              >
                <i className="fa fa-arrow-up fa-1x" />
              </button>
            </div>
            {/* Timer */}
            <div className="timer">
              <div className="timer-wrapper">
                {!isBreak ? (
                  <div id="timer-label">Session</div>
                ) : (
                  <div id="timer-label">Break</div>
                )}
                <div id="time-left">
                  {/* If timer is 0, display "00:00". 
                If timer is equal to session length, display "session length:00".
                Else, display "minutes:seconds" */}
                  {minutes === 0 && seconds === 0
                    ? "00:00"
                    : minutes === session
                      ? `${minutes < 10 ? `0${minutes}` : minutes}:00`
                      : `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds
                      }`}
                </div>
              </div>
            </div>
            {/* Timer controls */}
            <div className="timer-control">
              <button onClick={onChange} id="start_stop">
                {/* If timer is running, display pause button. Otherwise, display play button. */}
                <i className={`fa ${isRunning ? "fa-pause" : "fa-play"} fa-1x`} />
              </button>
              <button onClick={resetBtn} id="reset">
                <i className="fa fa-refresh fa-1x" />
              </button>
            </div>
            {/* Audio element for beep sound */}
            <audio
              id="beep"
              preload="auto"
              src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
            ></audio>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;