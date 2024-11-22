import React, { useState } from "react";
import icons from "../constants/index";
import { motion, AnimatePresence } from "framer-motion";

function BottomBar() {
  const [showToast, setShowToast] = useState(false);
  const [copied, setCopied] = useState(false);
  const email = "adrian.hassan.ef@gmail.com";

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
  const copyGmail = () => {
    console.log("hey");
  };

  // Function to trigger the toaster
  const triggerToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Auto-hide after 3 seconds
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-purple-100/70 w-[20%] min-h-16 rounded-[3vh]">
        <div className="flex justify-center items-center py-2 gap-6">
          <motion.img
            src={icons.folder}
            className="w-12 h-12"
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.95 }}
          />
          <motion.img
            src={icons.gmail}
            className="w-10 h-8"
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              handleCopy();
              triggerToast();
            }}
          />
          <motion.img
            src={icons.github}
            className="w-9 h-9"
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.95 }}
          />
          <motion.img
            src={icons.tictactoe}
            className="w-9 h-9"
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.95 }}
          />
          <motion.img
            src={icons.vscode}
            className="w-9 h-9"
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.95 }}
          />
        </div>
      </div>
      <AnimatePresence>
        {showToast && (
          <motion.div
            className="absolute top-4 right-4 bg-black text-white p-4 rounded-lg shadow-md"
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
  );
}

export default BottomBar;
