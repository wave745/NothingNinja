import { useEffect, useState, useRef } from "react";
import NothinglyContent from "@/components/NothinglyContent";
import Timer from "@/components/Timer";
import useNothingLevel from "@/hooks/useNothingLevel";
import { colorStages } from "@/lib/constants";

export default function Home() {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { elapsedSeconds, level, levelInfo, startTimer } = useNothingLevel();
  const transitionTimeRef = useRef(10000); // Initial transition time: 10 seconds
  
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

  // Advanced color transition logic
  useEffect(() => {
    // Gradually decrease transition time as level increases (slower to faster)
    if (level <= 2) {
      transitionTimeRef.current = 10000; // 10 seconds for early levels
    } else if (level <= 4) {
      transitionTimeRef.current = 8000; // 8 seconds for middle levels
    } else if (level <= 6) {
      transitionTimeRef.current = 6000; // 6 seconds for higher levels
    } else {
      transitionTimeRef.current = 5000; // 5 seconds for highest levels
    }
    
    const colorChangeInterval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colorStages.length);
      
      // Reset transition flag for animation purposes
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }, transitionTimeRef.current);

    return () => clearInterval(colorChangeInterval);
  }, [level]);

  // Get current colors from colorStages
  const { bg, text } = colorStages[currentColorIndex];

  return (
    <main
      style={{ 
        backgroundColor: bg,
        color: text,
        transition: `background-color ${transitionTimeRef.current/1000}s cubic-bezier(0.4, 0, 0.2, 1), color ${transitionTimeRef.current/1000}s cubic-bezier(0.4, 0, 0.2, 1)`,
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
          transition: `opacity ${transitionTimeRef.current/1000}s ease`
        }}
      />
      
      <NothinglyContent 
        level={level}
        levelName={levelInfo.name}
        message={levelInfo.message} 
        textColor={text}
      />
      
      <Timer 
        elapsedSeconds={elapsedSeconds}
        textColor={text}
      />
    </main>
  );
}
