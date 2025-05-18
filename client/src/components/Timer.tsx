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

  return (
    <div 
      className="absolute bottom-8 font-mono text-sm md:text-base opacity-30 hover:opacity-70 transition-opacity duration-300"
      style={{ 
        transition: "color 7s ease",
        color: textColor,
        fontFamily: "'Space Mono', monospace" 
      }}
    >
      {formatTime(elapsedSeconds)}
    </div>
  );
}
