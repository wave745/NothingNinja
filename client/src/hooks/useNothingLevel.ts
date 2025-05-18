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
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [level, setLevel] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const countRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Get the current level info based on time spent
  const levelInfo = levels.find((_, index) => index === level) || levels[0];

  // Start the timer
  const startTimer = useCallback(() => {
    setIsActive(true);
    setIsPaused(false);
    
    // Clear any existing interval
    if (countRef.current) {
      window.clearInterval(countRef.current);
    }
    
    // Set the start time if it's not already set
    if (!startTimeRef.current) {
      startTimeRef.current = Date.now() - (elapsedSeconds * 1000);
    }
    
    // Start a new interval
    countRef.current = window.setInterval(() => {
      if (startTimeRef.current) {
        const now = Date.now();
        const secondsElapsed = Math.floor((now - startTimeRef.current) / 1000);
        setElapsedSeconds(secondsElapsed);
      }
    }, 1000);
  }, [elapsedSeconds]);

  // Pause the timer
  const pauseTimer = useCallback(() => {
    if (countRef.current) {
      clearInterval(countRef.current);
      countRef.current = null;
    }
    setIsPaused(true);
  }, []);

  // Resume the timer
  const resumeTimer = useCallback(() => {
    if (isPaused) {
      setIsPaused(false);
      
      // Adjust start time to account for the time spent paused
      if (startTimeRef.current) {
        startTimeRef.current = Date.now() - (elapsedSeconds * 1000);
      }
      
      // Start a new interval
      countRef.current = window.setInterval(() => {
        if (startTimeRef.current) {
          const now = Date.now();
          const secondsElapsed = Math.floor((now - startTimeRef.current) / 1000);
          setElapsedSeconds(secondsElapsed);
        }
      }, 1000);
    }
  }, [elapsedSeconds, isPaused]);

  // Handle visibility change to pause/resume timer
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        pauseTimer();
      } else if (document.visibilityState === 'visible' && isActive && isPaused) {
        resumeTimer();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (countRef.current) {
        window.clearInterval(countRef.current);
      }
    };
  }, [isActive, isPaused, pauseTimer, resumeTimer]);

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

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (countRef.current) {
        window.clearInterval(countRef.current);
      }
    };
  }, []);

  return {
    elapsedSeconds,
    level,
    levelInfo,
    startTimer,
    pauseTimer,
    resumeTimer
  };
}
