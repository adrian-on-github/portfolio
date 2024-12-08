import Navbar from "./components/Navbar";
import BottomBar from "./components/BottomBar";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import icons from "./constants/index";
import { X } from "lucide-react";

export default function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [triggerAction, setTriggerAction] = useState(false);
  const [turnOff, setTurnOff] = useState(true);
  const [background, setBackground] = useState({ state: "first" });
  const [brightness, setBrightness] = useState(100); // Standardhelligkeit (0–100)
  const [settings, setSettings] = useState(false);

  const triggerBottomBarSettings = () => {
    console.log("Bottom Bar is running.");
    setSettings(!settings);
  };
  // Aktualisiert die CSS-Variable in :root
  const updateBrightness = (value) => {
    document.documentElement.style.setProperty(
      "--page-brightness",
      value / 100
    );
  };

  const toggleSettings = () => {
    setSettings(!settings);
  };

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const handleRequest = () => {
    setTriggerAction(true);
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
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      toggleTurnOff();
    }
  };

  const now = new Date();
  const monthIndex = now.getMonth();
  const dayIndex = now.getDay();
  const hours24 = now.getHours(); // 24-Hour Format
  const minutes = now.getMinutes();
  const date = now.getDate();

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = weekdays[dayIndex];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[monthIndex];

  const hours12 = hours24 % 12 || 12; // 12-Hour Format
  const ampm = hours24 >= 12 ? "PM" : "AM";

  // Format minutes
  const formattedMinutes =
    minutes === 0 ? "00" : minutes.toString().padStart(2, "0");

  return (
    <>
      {background.state === "first" && <div className="background-image"></div>}
      {background.state === "second" && (
        <div className="background-image-second"></div>
      )}
      {background.state === "third" && (
        <div className="background-image-third"></div>
      )}
      <div className="min-h-[15vh]">
        <AnimatePresence mode="wait">
          {turnOff ? (
            <motion.div
              key="turnOffScreen"
              className="bg-gray-500/30 backdrop-blur-[6px] min-h-[100vh] flex justify-center items-center"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-center items-center flex-col">
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gray-100/30 my-1">{`${day} ${month} ${date} `}</p>
                <div className="text-9xl font-bold text-transparent bg-clip-text bg-gray-100/30 mb-5">
                  {`${hours12}:${formattedMinutes} ${ampm}`}
                </div>

                <img
                  src={icons.memoji}
                  alt="adrian"
                  className="w-[20%] rounded-full mt-[27rem]"
                />
                <p className="mt-5 text-white text-lg">Adrian Hassan</p>
                <input
                  className="rounded-full bg-gray-600/30 border border-gray-500/50 shadow-inner backdrop-blur-md py-2 px-4 text-white placeholder-gray-300 focus:outline-none mt-2"
                  type="password"
                  placeholder="Enter Password"
                  onKeyDown={handleKeyDown}
                />
              </div>
            </motion.div>
          ) : isMobile ? (
            <motion.div
              key="mobileScreen"
              className="bg-black text-white min-h-screen flex justify-center items-center"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl text-center">
                Please switch to desktop mode for a better experience
              </h1>
            </motion.div>
          ) : (
            <motion.div
              key="desktopScreen"
              className="relative"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              <div>
                <Navbar
                  request={handleRequest}
                  requestTurnOff={toggleTurnOff}
                  onBrightnessChange={(newBrightness) => {
                    setBrightness(newBrightness);
                    updateBrightness(newBrightness);
                  }}
                  onSettings={triggerBottomBarSettings}
                />
              </div>
              <div className="fixed bottom-2 left-0 w-full">
                <BottomBar
                  triggerSettings={triggerBottomBarSettings}
                  triggerAction={triggerAction}
                  setBackground={setBackground}
                  onBrightnessChange={(newBrightness) => {
                    setBrightness(newBrightness);
                    updateBrightness(newBrightness);
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
