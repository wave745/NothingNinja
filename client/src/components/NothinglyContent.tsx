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
  const [showInitialHint, setShowInitialHint] = useState(true);

  // Handle animations when level changes
  useEffect(() => {
    if (previousLevelName !== levelName || previousMessage !== message) {
      setFadeIn(false);
      
      const timer = setTimeout(() => {
        setPreviousLevelName(levelName);
        setPreviousMessage(message);
        setFadeIn(true);
      }, 800); // Slightly longer fade for smoother effect
      
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
        transition: "color 10s cubic-bezier(0.4, 0, 0.2, 1)",
        color: textColor
      }}
    >
      {/* Level indicator */}
      <div 
        className={`absolute -top-16 left-1/2 transform -translate-x-1/2 text-xs tracking-widest uppercase transition-opacity duration-1000 ${level > 0 ? 'opacity-30' : 'opacity-0'}`}
        style={{ 
          fontFamily: "'Space Mono', monospace",
          letterSpacing: '0.25em'
        }}
      >
        {level > 0 ? `Level ${level}` : ''}
      </div>
      
      {/* Main level name with enhanced animation */}
      <h1 
        className={`text-4xl md:text-6xl font-light mb-6 md:mb-8 tracking-tight transition-all duration-800 ${fadeIn ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'}`}
        style={{ 
          fontFamily: "'Inter', sans-serif",
          letterSpacing: level >= 7 ? '0.05em' : '0' // Wider spacing for highest levels
        }}
      >
        {previousLevelName}
      </h1>
      
      {/* Message with staggered animation */}
      <p 
        className={`text-lg md:text-2xl font-normal mb-8 transition-all duration-800 delay-100 ${fadeIn ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}
        style={{ 
          fontFamily: "'Inter', sans-serif",
          fontWeight: 300
        }}
      >
        {previousMessage}
      </p>
      
      {/* Initial hint that fades away */}
      <p 
        className={`text-xs md:text-sm font-light transition-all duration-1500 absolute left-1/2 transform -translate-x-1/2 bottom-[-4rem] ${showInitialHint ? 'opacity-50' : 'opacity-0'}`}
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
