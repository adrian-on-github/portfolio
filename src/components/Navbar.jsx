import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GitHubCalendar from "react-github-calendar";
import icons from "../constants/index";
import Draggable from "react-draggable";

function Navbar() {
  const [widgetStatus, setWidgetStatus] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [showToast, setShowToast] = useState(false);

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

  // Toggle DropDown
  const toggleDropDown = () => {
    if (!widgetStatus) {
      // Normalerweise Dropdown umschalten
      setShowDropDown(!showDropDown);
    } else {
      // Wenn Widget aktiv ist, Toaster auslösen
      triggerToast();
    }
  };

  const handleCloseDropdown = () => {
    // Hierbei handelt es sich um eine separate Funktion, um das Dropdown zu schließen
    // Ohne dass der Toaster ausgelöst wird.
    setWidgetStatus(false);
  };

  // Toggle Widget
  const toggleWidget = () => {
    toggleDropDown();
    setWidgetStatus((prevWidget) => !prevWidget);
  };

  const triggerToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Auto-hide after 3 seconds
  };

  return (
    <>
      <nav className="bg-gray-300/50 min-h-8 flex flex-row justify-between items-center backdrop-blur-xl">
        <div className="flex flex-row justify-center items-start px-2 py-1">
          <motion.div
            className="flex justify-center items-start px-2 py-2 rounded-lg cursor-pointer"
            whileHover={{ backgroundColor: "rgba(107, 114, 128, 0.7)" }}
          >
            <motion.img
              src={icons.apple}
              alt="apple"
              className="w-4 h-4"
              onClick={toggleDropDown}
            />
          </motion.div>
          <div className="ml-2 flex gap-1 flex-row text-sm text-start mt-0.5">
            <motion.p
              whileHover={{ backgroundColor: "rgba(107, 114, 128, 0.7)" }}
              className="px-1 py-1 rounded-[0.7vh] cursor-pointer"
            >
              Finder
            </motion.p>
            <motion.p
              whileHover={{ backgroundColor: "rgba(107, 114, 128, 0.7)" }}
              className="px-1 py-1 rounded-[0.7vh] cursor-pointer"
            >
              Ablage
            </motion.p>
            <motion.p
              whileHover={{ backgroundColor: "rgba(107, 114, 128, 0.7)" }}
              className="px-1 py-1 rounded-[0.7vh] cursor-pointer"
            >
              Bearbeiten
            </motion.p>
            <motion.p
              whileHover={{ backgroundColor: "rgba(107, 114, 128, 0.7)" }}
              className="px-1 py-1 rounded-[0.7vh] cursor-pointer"
            >
              Darstellung
            </motion.p>
            <motion.p
              whileHover={{ backgroundColor: "rgba(107, 114, 128, 0.7)" }}
              className="px-1 py-1 rounded-[0.7vh] cursor-pointer"
            >
              Fenster
            </motion.p>
            <motion.p
              whileHover={{ backgroundColor: "rgba(107, 114, 128, 0.7)" }}
              className="px-1 py-1 rounded-[0.7vh] cursor-pointer"
            >
              Hilfe
            </motion.p>
          </div>
        </div>
        <div className="px-4 flex flex-row justify-center items-end">
          <div className="flex flex-row gap-[1.5vh] text-sm text-end">
            <p>{`${day} ${month} ${date} ${hours12}:${formattedMinutes} ${ampm}`}</p>
          </div>
        </div>
      </nav>
      {showDropDown === true && (
        <div className="min-h-[30vh] w-[13%] bg-gray-300/50 rounded-lg mx-2 mt-0.5 backdrop-blur-xl">
          <div className="px-4 py-2 gap-1 flex items-start justify-start flex-col">
            <p
              onClick={() => toggleWidget()}
              className="font-normal text-sm cursor-pointer"
            >
              About this Mac
            </p>
            <div className="w-full border border-gray-300/20" />
            <p className="font-normal text-sm cursor-pointer">
              System Settings
            </p>
            <p className="font-normal text-sm cursor-pointer">App Store</p>
            <div className="w-full border border-gray-300/20" />
            <p className="font-normal text-sm cursor-pointer">Used Objects</p>
            <div className="w-full border border-gray-300/20" />
            <p className="font-normal text-sm cursor-pointer">
              Stop Immediately
            </p>
            <div className="w-full border border-gray-300/20" />
            <p className="font-normal text-sm cursor-pointer">
              Hibernate State
            </p>
            <p className="font-normal text-sm cursor-pointer">Restart</p>
            <p className="font-normal text-sm cursor-pointer">Turn off</p>
            <div className="w-full border border-gray-300/20" />
            <p className="font-normal text-sm cursor-pointer">Lock Screen</p>
            <p className="font-normal text-sm cursor-pointer">
              Adrian Hassan log out
            </p>
          </div>
        </div>
      )}
      {widgetStatus === true && (
        <Draggable
          bounds={{
            top: -15,
            left: 0,
            right: 1325,
            bottom: 315,
          }}
        >
          <div className="min-h-[50vh] w-[28%] bg-gray-300/50 rounded-lg mx-4 my-5 backdrop-blur-xl">
            <div className="px-4 py-3 flex items-start justify-start gap-2">
              <motion.div
                whileHover={{ scale: 0.9 }}
                className="w-3 h-3 bg-green-500 rounded-full"
              ></motion.div>
              <motion.div
                whileHover={{ scale: 0.9 }}
                className="w-3 h-3 bg-yellow-500 rounded-full"
              ></motion.div>
              <motion.div
                whileHover={{ scale: 0.9 }}
                className="w-3 h-3 bg-red-500 rounded-full"
                onClick={() => handleCloseDropdown()}
              ></motion.div>
            </div>
            <div className="flex-col">
              <div className="flex flex-row px-4 py-3 items-start justify-start">
                Hey Im Adrian <div className="wave-hand">👋</div>
              </div>
              <div className="flex flex-col px-4 py-3 items-start justify-start">
                <p className="mt-1">
                  ⭐ Very young developer, whose on a long way to fullstack
                  developer
                </p>
                <p className="mt-2">
                  ❤️ Love to collaborate with competent and friendly people
                  around the whole world
                </p>
                <p className="mt-2">
                  💭 "During a gold rush, instead of investing in gold diggers,
                  invest in shovels" -André Kostolany
                </p>
                <p className="mt-2">🙏 Being more active on github in 2025</p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="trasform scale-60">
                <GitHubCalendar username="adrian-on-github" />
              </div>
            </div>
          </div>
        </Draggable>
      )}
      <AnimatePresence>
        {showToast && (
          <motion.div
            className="absolute right-4 mt-[33.5vh] bg-white text-black p-4 rounded-lg shadow-md text-center"
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            ❌Close Widget first
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
7;
