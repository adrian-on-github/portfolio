import React, { useState } from "react";
import icons from "../constants/index";
import { motion, AnimatePresence } from "framer-motion";

function BottomBar() {
  const [showToast, setShowToast] = useState(false);
  const [copied, setCopied] = useState(false);
  const email = "adrian.hassan.ef@gmail.com";
  const github = "https://github.com/adrian-on-github";
  const X = "https://x.com/DEadrianJS";

  const handleCopy = () => {
    navigator.clipboard
      .writeText(email)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  // Function to trigger the toaster
  const triggerToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Auto-hide after 3 seconds
  };
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="bg-gray-300/50 w-[40%] min-h-16 rounded-2xl backdrop-blur-xl">
          <div className="flex justify-center items-center py-2">
            <motion.img
              src={icons.finder}
              className="w-[5vh] h-[5vh] mx-2"
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.95 }}
            />
            <motion.img
              src={icons.word}
              className="w-10 h-10 bg-white px-1 py-1 rounded-lg mx-2"
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.95 }}
            />

            <motion.img
              src={icons.photoshop}
              className="w-10 h-10 mx-2"
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.95 }}
            />
            <motion.img
              src={icons.notion}
              className="w-10 h-10 mx-2"
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.95 }}
            />

            <motion.img
              src={icons.vscode}
              className="w-10 h-10 bg-white px-1 py-1 rounded-lg mx-2"
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.95 }}
            />
            <motion.img
              src={icons.gmail}
              className="w-10 h-10 bg-white px-1 py-1 rounded-lg mx-2"
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                handleCopy();
                triggerToast();
              }}
            />
            <motion.img
              src={icons.github}
              className="w-10 h-10 bg-white px-1 py-1 rounded-lg mx-2"
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open(github, "_blank")}
            />
            <motion.img
              src={icons.X}
              className="w-10 h-10 bg-white px-1 py-1 rounded-lg mx-2"
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open(X, "_blank")}
            />
            <div className="rotate-90 border border-gray-300/30 w-10" />
            <motion.img
              src={icons.folder}
              className="w-[4.7vh] h-[4.7vh] bg-white px-1 py-1 rounded-lg"
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.95 }}
            />
          </div>
        </div>
        <AnimatePresence>
          {showToast && (
            <motion.div
              className="absolute right-4 bg-white text-black p-4 rounded-lg shadow-md text-center"
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              ✅Email copied to clipboard
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default BottomBar;
