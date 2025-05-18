import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add Google fonts for the design
const linkPreconnect1 = document.createElement("link");
linkPreconnect1.rel = "preconnect";
linkPreconnect1.href = "https://fonts.googleapis.com";
document.head.appendChild(linkPreconnect1);

const linkPreconnect2 = document.createElement("link");
linkPreconnect2.rel = "preconnect";
linkPreconnect2.href = "https://fonts.gstatic.com";
linkPreconnect2.crossOrigin = "anonymous";
document.head.appendChild(linkPreconnect2);

const linkFonts = document.createElement("link");
linkFonts.rel = "stylesheet";
linkFonts.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Space+Mono&display=swap";
document.head.appendChild(linkFonts);

// Add metadata
const title = document.createElement("title");
title.textContent = "Nothingly - Experience Nothing, Beautifully";
document.head.appendChild(title);

const metaDescription = document.createElement("meta");
metaDescription.name = "description";
metaDescription.content = "Nothingly - The startup that does absolutely nothing, beautifully. Experience the joy of doing nothing.";
document.head.appendChild(metaDescription);

// Open Graph tags
const ogTitle = document.createElement("meta");
ogTitle.property = "og:title";
ogTitle.content = "Nothingly - Experience Nothing, Beautifully";
document.head.appendChild(ogTitle);

const ogDescription = document.createElement("meta");
ogDescription.property = "og:description";
ogDescription.content = "We built nothing. And it's everything. Experience the journey into nothingness.";
document.head.appendChild(ogDescription);

const ogType = document.createElement("meta");
ogType.property = "og:type";
ogType.content = "website";
document.head.appendChild(ogType);

createRoot(document.getElementById("root")!).render(<App />);
