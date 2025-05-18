import { useEffect, useState } from "react";
import NothinglyContent from "@/components/NothinglyContent";
import Timer from "@/components/Timer";
import useNothingLevel from "@/hooks/useNothingLevel";
import { colorStages } from "@/lib/constants";

export default function Home() {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const { elapsedSeconds, level, levelInfo, startTimer } = useNothingLevel();

  // Set page title
  useEffect(() => {
    document.title = "Nothingly - Experience Nothing, Beautifully";
    
    // Prevent context menu and other interactions
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextMenu", handleContextMenu);
    
    return () => {
      document.removeEventListener("contextMenu", handleContextMenu);
    };
  }, []);

  // Start timer when component mounts
  useEffect(() => {
    startTimer();
  }, [startTimer]);

  // Change background color every 7 seconds
  useEffect(() => {
    const colorChangeInterval = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colorStages.length);
    }, 7000);

    return () => clearInterval(colorChangeInterval);
  }, []);

  // Get current colors from colorStages
  const { bg, text } = colorStages[currentColorIndex];

  return (
    <main
      style={{ 
        backgroundColor: bg,
        color: text,
        transition: "background-color 7s ease, color 7s ease",
        overflow: "hidden",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
      data-level={level}
    >
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
