import { useState, useEffect } from "react";

interface NothinglyContentProps {
  level: number;
  levelName: string;
  message: string;
  textColor: string;
}

export default function NothinglyContent({ 
  level, 
  levelName, 
  message, 
  textColor 
}: NothinglyContentProps) {
  const [fadeIn, setFadeIn] = useState(true);
  const [previousLevelName, setPreviousLevelName] = useState(levelName);
  const [previousMessage, setPreviousMessage] = useState(message);

  // Handle animations when level changes
  useEffect(() => {
    if (previousLevelName !== levelName || previousMessage !== message) {
      setFadeIn(false);
      
      const timer = setTimeout(() => {
        setPreviousLevelName(levelName);
        setPreviousMessage(message);
        setFadeIn(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [levelName, message, previousLevelName, previousMessage]);

  return (
    <div 
      className="px-4 text-center z-10" 
      style={{ 
        transition: "color 7s ease",
        color: textColor
      }}
    >
      <h2 
        className={`text-4xl md:text-5xl font-light mb-3 md:mb-5 tracking-tight transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {previousLevelName}
      </h2>
      <p 
        className={`text-lg md:text-2xl font-normal mb-4 transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {previousMessage}
      </p>
      <p 
        className={`text-xs md:text-sm opacity-50 font-light transition-opacity duration-1000 ${level >= 2 ? 'opacity-0' : ''}`}
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Just stay. Do nothing.
      </p>
    </div>
  );
}
