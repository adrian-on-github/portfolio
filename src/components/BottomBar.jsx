import React, { useState } from "react";
import icons from "../constants/index";
import { motion, AnimatePresence } from "framer-motion";
import Draggable from "react-draggable";
import {
  Code,
  Cpu,
  GraduationCap,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

function BottomBar() {
  const [showToast, setShowToast] = useState(false);
  const [copied, setCopied] = useState(false);
  const [finder, setFinder] = useState(false);
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

  const triggerFinder = () => {
    setFinder(!finder);
  };

  return (
    <>
      {finder === true && (
        <Draggable
          bounds={{
            top: -195,
            right: 555,
            left: -555,
            bottom: 240,
          }}
        >
          <div className="flex justify-center items-center mb-[27vh]">
            <div className="bg-gray-400 w-[40%] min-h-[39vh] rounded-2xl backdrop-blur-xl shadow-lg">
              {/* Header with Close Buttons */}
              <div className="flex justify-start items-center py-2 px-3 gap-2">
                <motion.div
                  whileHover={{ scale: 0.9 }}
                  className="w-3 h-3 bg-green-500 rounded-full cursor-pointer"
                ></motion.div>
                <motion.div
                  whileHover={{ scale: 0.9 }}
                  className="w-3 h-3 bg-yellow-500 rounded-full cursor-pointer"
                ></motion.div>
                <motion.div
                  whileHover={{ scale: 0.9 }}
                  className="w-3 h-3 bg-red-500 rounded-full cursor-pointer"
                  onClick={() => triggerFinder()}
                ></motion.div>
              </div>
              {/* Content Section */}
              <div className="px-4 py-2 flex flex-col">
                {/* Favorites Section */}
                <div className="text-xs text-gray-500 mb-2">Favorites</div>
                <div className="flex items-center flex-row">
                  <motion.div
                    className="px-2 py-1 rounded-lg cursor-pointer flex flex-row gap-1 mt-0.5"
                    whileHover={{ backgroundColor: "rgba(107, 114, 128, 0.7)" }}
                  >
                    <Code size={15} color="#3b82f6" />
                    <p className="text-sm font-normal">Projects</p>
                  </motion.div>
                </div>
                <div className="flex items-center">
                  <motion.div
                    className="px-2 py-1 rounded-lg cursor-pointer flex flex-row gap-1 mt-0.5"
                    whileHover={{ backgroundColor: "rgba(107, 114, 128, 0.7)" }}
                  >
                    <Cpu size={15} color="#3b82f6" />
                    <p className="text-sm font-normal">Technologies</p>
                  </motion.div>
                </div>
                <div className="flex items-center">
                  <motion.div
                    className="px-2 py-1 rounded-lg cursor-pointer flex flex-row gap-1 mt-0.5"
                    whileHover={{ backgroundColor: "rgba(107, 114, 128, 0.7)" }}
                  >
                    <GraduationCap size={15} color="#3b82f6" />
                    <p className="text-sm font-normal">Skills</p>
                  </motion.div>
                </div>

                {/* Commissions Section */}
                <div className="text-xs text-gray-500 mt-4 mb-2">
                  Commissions
                </div>
              </div>
              {/* Rotated Divider */}
              <div className="absolute top-[50%] rotate-90 h-[1px] w-[47.7%] bg-gray-500/70" />
              <div className="absolute top-[15%] h-[1px] w-[76.2%] bg-gray-500/70 right-[-0.1%]" />
              <div className="absolute top-[3.5%] right-[68%]">
                <motion.div
                  className="px-1 py-1 rounded-lg"
                  whileHover={{ backgroundColor: "#9CA3AFB3" }}
                >
                  <ChevronRight size={25} color="#6b7280" />
                </motion.div>
              </div>
              <div className="absolute top-[3.5%] right-[72%]">
                <motion.div
                  className="px-1 py-1 rounded-lg"
                  whileHover={{ backgroundColor: "#9CA3AFB3" }}
                >
                  <ChevronLeft size={25} color="#6b7280" />
                </motion.div>
              </div>
              {/* <div className="flex justify-center items-center">Fetching results here</div> */}
            </div>
          </div>
        </Draggable>
      )}
      <div className="flex justify-center items-center">
        <div className="bg-gray-300/50 w-[35%] min-h-16 rounded-2xl backdrop-blur-xl">
          <div className="flex justify-center items-center py-2">
            <motion.img
              src={icons.finder}
              className="w-[5vh] h-[5vh] mx-2"
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.95 }}
              onClick={triggerFinder}
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
              className="w-[4.7vh] h-[4.7vh] bg-white px-1 py-1 rounded-lg mx-2"
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
