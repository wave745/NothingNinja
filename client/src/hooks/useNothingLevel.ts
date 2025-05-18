import { useState, useEffect, useCallback, useRef } from 'react';
import { levels } from '@/lib/constants';

interface UseNothingLevelResult {
  elapsedSeconds: number;
  level: number;
  levelInfo: typeof levels[0];
  startTimer: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
}

export default function useNothingLevel(): UseNothingLevelResult {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [level, setLevel] = useState(0);
  const [pausedAt, setPausedAt] = useState<number | null>(null);
  
  const intervalRef = useRef<number | null>(null);

  // Get the current level info based on time spent
  const levelInfo = levels.find((_, index) => index === level) || levels[0];

  // Start the timer
  const startTimer = useCallback(() => {
    setStartTime(new Date());
    
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
    
    intervalRef.current = window.setInterval(() => {
      if (startTime) {
        const now = new Date();
        const secondsElapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000);
        setElapsedSeconds(secondsElapsed);
      }
    }, 1000);
  }, [startTime]);

  // Pause the timer (when tab is not visible)
  const pauseTimer = useCallback(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setPausedAt(elapsedSeconds);
  }, [elapsedSeconds]);

  // Resume the timer (when tab becomes visible again)
  const resumeTimer = useCallback(() => {
    if (pausedAt !== null && startTime) {
      // Adjust the start time to account for the paused duration
      const newStartTime = new Date();
      newStartTime.setTime(newStartTime.getTime() - (pausedAt * 1000));
      setStartTime(newStartTime);
      setPausedAt(null);
      startTimer();
    }
  }, [pausedAt, startTimer, startTime]);

  // Handle visibility change to pause/resume timer
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        pauseTimer();
      } else if (document.visibilityState === 'visible') {
        resumeTimer();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [pauseTimer, resumeTimer]);

  // Update the level based on elapsed time
  useEffect(() => {
    for (let i = levels.length - 1; i >= 0; i--) {
      if (elapsedSeconds >= levels[i].seconds) {
        if (level !== i) {
          setLevel(i);
        }
        break;
      }
    }
  }, [elapsedSeconds, level]);

  return {
    elapsedSeconds,
    level,
    levelInfo,
    startTimer,
    pauseTimer,
    resumeTimer
  };
}
