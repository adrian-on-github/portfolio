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

  return (
    <div className="min-h-[15vh]">
      <AnimatePresence mode="wait">
        {turnOff ? (
          <motion.div
            key="turnOffScreen"
            className="bg-gray-500/30 backdrop-blur-lg min-h-[100vh] flex justify-center items-center"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center items-center flex-col">
              <img
                src={icons.memoji}
                alt="adrian"
                className="w-[45%] rounded-full"
              />
              <p className="mt-5 text-white text-lg">Adrian Hassan</p>
              <input
                className="rounded-full bg-gray-600/30 border border-gray-500/50 shadow-inner backdrop-blur-md py-2 px-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-500 transition-all duration-300 mt-2"
                type="password"
                placeholder="Enter Password"
                onKeyDown={handleKeyDown}
              />
              <p className="mt-3 text-white">Touch ID or Enter Password</p>
              <motion.div
                className="flex justify-center items-center relative top-[28vh] px-1 py-1 bg-gray-600/30 rounded-full backdrop-blur-xl"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 1 }}
              >
                <div className="flex justify-center items-center">
                  <X className="text-gray-300" />
                </div>
              </motion.div>
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
              <Navbar request={handleRequest} requestTurnOff={toggleTurnOff} />
            </div>
            <div className="fixed bottom-2 left-0 w-full">
              <BottomBar triggerAction={triggerAction} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
