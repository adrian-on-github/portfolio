import Navbar from "./components/Navbar";
import BottomBar from "./components/BottomBar";
import React, { useState, useEffect } from "react";
import fake from "./assets/turn-off-screen.jpg";

export default function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [triggerAction, setTriggerAction] = useState(false);
  const [turnOff, setTurnOff] = useState(false);

  const handleRequest = () => {
    setTriggerAction(true);
    console.log("Request wurde ausgelöst!");
  };

  useEffect(() => {
    // Function to check the screen width
    const checkScreenSize = () => {
      if (window.innerWidth < 1024) {
        // Tailwind's lg breakpoint is 1024px
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const toggleTurnOff = () => {
    setTurnOff(!turnOff);

    // Verzögert das Schließen des Tabs um 3 Sekunden
    setTimeout(() => {
      closeTab();
    }, 1500); // 3000 ms = 3 Sekunden
  };

  function closeTab() {
    window.close();
  }

  return (
    <div>
      {isMobile ? (
        <div className="bg-black text-white min-h-screen flex justify-center items-center">
          <h1 className="text-4xl text-center">
            Please switch to desktop mode for a better experience
          </h1>
        </div>
      ) : (
        // Desktop View: Navbar and BottomBar
        <div className="relative">
          <div>
            <Navbar request={handleRequest} requestTurnOff={toggleTurnOff} />
          </div>
          <div className="fixed bottom-2 left-0 w-full">
            <BottomBar triggerAction={triggerAction} />
          </div>
        </div>
      )}
    </div>
  );
}
