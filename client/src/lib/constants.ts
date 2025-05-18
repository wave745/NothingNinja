// Color stages from light to dark with a more aesthetic transition
export const colorStages = [
  { bg: '#ffffff', text: '#1a1a1a' }, // Pure white
  { bg: '#f7f7f7', text: '#1a1a1a' }, // Almost white
  { bg: '#f0f0f0', text: '#1a1a1a' }, // Light gray
  { bg: '#e6e6fa', text: '#1a1a1a' }, // Lavender
  { bg: '#dfe7f2', text: '#1a1a1a' }, // Light blue-gray
  { bg: '#d0dbe5', text: '#1a1a1a' }, // Light steel blue
  { bg: '#b0c4de', text: '#1a1a1a' }, // Light steel blue
  { bg: '#8fa6bc', text: '#f7f7f7' }, // Steel blue 
  { bg: '#6d87a8', text: '#f7f7f7' }, // Medium blue
  { bg: '#4b6990', text: '#f7f7f7' }, // Denim
  { bg: '#3a5277', text: '#f7f7f7' }, // Slate blue
  { bg: '#2c3e50', text: '#f7f7f7' }, // Dark slate
  { bg: '#1e2a3a', text: '#f7f7f7' }, // Very dark blue
  { bg: '#121920', text: '#f7f7f7' }, // Almost black-blue
  { bg: '#080c10', text: '#f7f7f7' }, // Near black
  { bg: '#000000', text: '#f7f7f7' }  // Pure black
];

// Level definitions - how many seconds to reach each level
export const levels = [
  { name: "Level 0", seconds: 0, message: "You are experiencing Nothingly." },
  { name: "Level 1", seconds: 7, message: "Embracing stillness." },
  { name: "Level 2", seconds: 21, message: "Finding calm in nothing." },
  { name: "Level 3", seconds: 42, message: "Deeper into nothingness." },
  { name: "Level 4", seconds: 70, message: "The void welcomes you." },
  { name: "Level 5", seconds: 105, message: "Pure nothingness achieved." },
  { name: "Level 6", seconds: 147, message: "You've transcended something." },
  { name: "Level 7", seconds: 196, message: "Approaching the absolute void." },
  { name: "Master of Nothing", seconds: 252, message: "You are nothing. And everything." }
];
