import { useEffect, useState, useRef } from "react";
import NothinglyContent from "@/components/NothinglyContent";
import Timer from "@/components/Timer";
import useNothingLevel from "@/hooks/useNothingLevel";
import { colorStages } from "@/lib/constants";

export default function Home() {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { elapsedSeconds, level, levelInfo, startTimer } = useNothingLevel();
  const transitionTimeRef = useRef(7000); // Set to 7 seconds as requested
  const intervalRef = useRef<number | null>(null);
  
  // Set page title and prevent interactions
  useEffect(() => {
    document.title = "Nothingly - Experience Nothing, Beautifully";
    
    // Prevent context menu and other interactions
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);
    
    // Prevent selection
    const handleSelect = (e: Event) => e.preventDefault();
    document.addEventListener("selectstart", handleSelect);
    
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("selectstart", handleSelect);
    };
  }, []);

  // Start timer when component mounts
  useEffect(() => {
    startTimer();
  }, [startTimer]);

  // Color transition logic - fixed at 7 seconds
  useEffect(() => {
    // Clear any existing interval to prevent duplicates
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Set a consistent 7-second interval for color changes
    intervalRef.current = window.setInterval(() => {
      setIsTransitioning(true);
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colorStages.length);
      
      // Reset transition flag for animation purposes
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }, 7000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []); // Empty dependency array so it only runs once

  // Get current colors from colorStages
  const { bg, text } = colorStages[currentColorIndex];

  return (
    <main
      style={{ 
        backgroundColor: bg,
        color: text,
        transition: "background-color 7s cubic-bezier(0.4, 0, 0.2, 1), color 7s cubic-bezier(0.4, 0, 0.2, 1)",
        overflow: "hidden",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        cursor: "default",
        userSelect: "none"
      }}
      data-level={level}
      data-transitioning={isTransitioning ? "true" : "false"}
    >
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${bg}00 0%, ${bg} 70%)`,
          opacity: 0.7,
          transition: "opacity 7s ease"
        }}
      />
      
      <NothinglyContent 
        level={level}
        levelName={levelInfo.name}
        message={levelInfo.message} 
        textColor={text}
        showPhrase="You are experiencing Nothingly" // This will be the constant phrase
      />
      
      <Timer 
        elapsedSeconds={elapsedSeconds}
        textColor={text}
      />
    </main>
  );
}
