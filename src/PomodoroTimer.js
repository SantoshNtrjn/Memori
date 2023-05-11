import React, { useState, useEffect } from 'react';
import { MdOutlinePlayCircleOutline } from "react-icons/md";
import { MdOutlinePauseCircleOutline} from "react-icons/md";
import { MdOutlineStopCircle } from "react-icons/md";
import { MdOutlineRotateLeft } from "react-icons/md";

const PomodoroTimer = ({ onClose }) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let intervalId = null;

    if (isActive) {
      intervalId = setInterval(() => {
        if (seconds === 0 && minutes === 0) {
          setIsActive(false);
          return;
        }

        if (seconds === 0) {
          setSeconds(59);
          setMinutes(minutes - 1);
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, seconds, minutes]);

  const startTimer = () => {
    setIsActive(true);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(0);
    setMinutes(25);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div style={{ position: 'fixed', top: '24px', right: '24px', backgroundColor: '#fff', padding: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', borderRadius: '5px' }}>
      <div style={{fontSize:"2rem",padding:"10px"}}>{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</div>
      <div>
        {isActive ? (
          <button onClick={() => setIsActive(false)}><MdOutlinePauseCircleOutline size='2rem'/></button>
        ) : (
          <button onClick={startTimer}><MdOutlinePlayCircleOutline size='2rem'/></button>
        )}
        <button onClick={resetTimer}><MdOutlineRotateLeft size='2rem'/></button>
        <button onClick={handleClose}><MdOutlineStopCircle size='2rem'/></button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
