import { useState, useEffect } from "react";

interface NothinglyContentProps {
  level: number;
  levelName: string;
  message: string;
  textColor: string;
  showPhrase?: string; // Optional phrase that stays constant
}

export default function NothinglyContent({ 
  level, 
  levelName, 
  message, 
  textColor,
  showPhrase
}: NothinglyContentProps) {
  const [fadeIn, setFadeIn] = useState(true);
  const [previousLevelName, setPreviousLevelName] = useState(levelName);
  const [previousMessage, setPreviousMessage] = useState(message);
  const [showInitialHint, setShowInitialHint] = useState(true);

  // Handle animations when level changes
  useEffect(() => {
    if (previousLevelName !== levelName || previousMessage !== message) {
      setFadeIn(false);
      
      const timer = setTimeout(() => {
        setPreviousLevelName(levelName);
        setPreviousMessage(message);
        setFadeIn(true);
      }, 500); // Shorter fade for quicker transitions
      
      return () => clearTimeout(timer);
    }
  }, [levelName, message, previousLevelName, previousMessage]);

  // Hide initial hint after reaching level 2
  useEffect(() => {
    if (level >= 2 && showInitialHint) {
      setShowInitialHint(false);
    }
  }, [level, showInitialHint]);

  return (
    <div 
      className="px-6 text-center z-10 relative max-w-xl" 
      style={{ 
        transition: "color 7s cubic-bezier(0.4, 0, 0.2, 1)",
        color: textColor
      }}
    >
      {/* Constant phrase at the top */}
      {showPhrase && (
        <h1 
          className="text-4xl md:text-5xl font-light mb-8 tracking-tight"
          style={{ 
            fontFamily: "'Inter', sans-serif",
            opacity: 0.9
          }}
        >
          {showPhrase}
        </h1>
      )}
      
      {/* Level indicator at the bottom */}
      <div 
        className={`mt-4 text-xs tracking-widest uppercase transition-opacity duration-700 ${level > 0 ? 'opacity-80' : 'opacity-0'}`}
        style={{ 
          fontFamily: "'Space Mono', monospace",
          letterSpacing: '0.2em'
        }}
      >
        {level > 0 ? `Level ${level}` : ''}
      </div>
      
      {/* Message with smooth animation - appears between constant phrase and level */}
      <p 
        className={`text-lg md:text-xl font-normal mb-4 transition-all duration-500 ${fadeIn ? 'opacity-90 transform translate-y-0' : 'opacity-0 transform translate-y-2'}`}
        style={{ 
          fontFamily: "'Inter', sans-serif",
          fontWeight: 300
        }}
      >
        {previousMessage}
      </p>
      
      {/* Initial hint that fades away */}
      <p 
        className={`text-xs md:text-sm font-light transition-all duration-1000 ${showInitialHint ? 'opacity-50' : 'opacity-0'}`}
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Just stay. Do nothing.
      </p>
      
      {/* Subtle ambient element for high levels */}
      {level >= 5 && (
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: `radial-gradient(circle at center, ${textColor}22 0%, ${textColor}00 70%)`,
            mixBlendMode: 'overlay',
            filter: 'blur(40px)',
            transition: 'all 5s ease'
          }}
        />
      )}
    </div>
  );
}
