interface TimerProps {
  elapsedSeconds: number;
  textColor: string;
}

export default function Timer({ elapsedSeconds, textColor }: TimerProps) {
  // Format time as HH:MM:SS
  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = Math.floor(totalSeconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  // Calculate pulse animation speed based on elapsed time
  // Slower pulse at the beginning, faster as time goes on
  const pulseSpeed = Math.max(3 - (elapsedSeconds / 120), 1); // Minimum 1s, maximum 3s
  
  return (
    <div 
      className="absolute bottom-8 font-mono text-sm md:text-base opacity-30 hover:opacity-80 transition-all duration-700"
      style={{ 
        transition: "color 7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s ease",
        color: textColor,
        fontFamily: "'Space Mono', monospace",
        letterSpacing: '0.05em',
        padding: '0.5rem 1rem',
        borderRadius: '3px',
        transform: 'translateY(0)',
      }}
      onMouseEnter={(e) => {
        // Apply slight upward movement on hover
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
      }}
    >
      <div 
        className="relative z-10 pulse-animation"
        style={{
          animationDuration: `${pulseSpeed}s`,
          animationIterationCount: "infinite",
          animationDirection: "alternate",
          animationTimingFunction: "ease-in-out"
        }}
      >
        {formatTime(elapsedSeconds)}
      </div>
    </div>
  );
}
