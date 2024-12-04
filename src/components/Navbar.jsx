import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GitHubCalendar from "react-github-calendar";
import icons from "../constants/index";
import Draggable from "react-draggable";

function Navbar({ request, requestTurnOff, onBrightnessChange }) {
  const [widgetStatus, setWidgetStatus] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [volume, setVolume] = useState(50);
  const [brightness, setBrightness] = useState(100);

  const handleBarClick = (e) => {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const newVolume = Math.min(
      Math.max((clickPosition / rect.width) * 100, 0),
      100
    );
    setVolume(newVolume);
  };

  const calculateBrightness = (e, bar) => {
    const rect = bar.getBoundingClientRect();
    const position = e.clientX - rect.left;
    return Math.min(Math.max((position / rect.width) * 100, 0), 100);
  };

  const handleBarClickBrightness = (e) => {
    const bar = e.currentTarget;
    const newBrightness = calculateBrightness(e, bar);
    setBrightness(newBrightness);
    onBrightnessChange(newBrightness);
  };

  const handleDrag = (e) => {
    if (e.clientX === 0) return;
    const bar = e.currentTarget.parentElement;
    const newBrightness = calculateBrightness(e, bar);
    setBrightness(newBrightness);
    onBrightnessChange(newBrightness);
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

  // Toggle DropDown
  const toggleDropDown = () => {
    if (!widgetStatus) {
      // Normalerweise Dropdown umschalten
      setShowDropDown(!showDropDown);
    } else {
      handleCloseDropdown();
    }
  };

  const handleCloseDropdown = () => {
    setWidgetStatus(false);
  };

  // Toggle Widget
  const toggleWidget = () => {
    toggleDropDown();
    setWidgetStatus((prevWidget) => !prevWidget);
  };

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <>
      <nav className="bg-gray-300/50 min-h-8 flex flex-row justify-between items-center backdrop-blur-xl">
        <div className="flex flex-row justify-center items-start px-2 py-1">
          <motion.div
            className="flex justify-center items-start px-2 py-2 rounded-lg pointer"
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
              className="px-1 py-1 rounded-[0.7vh] pointer"
              onClick={request}
            >
              Finder
            </motion.p>
            <motion.p
              whileHover={{ backgroundColor: "rgba(107, 114, 128, 0.7)" }}
              className="px-1 py-1 rounded-[0.7vh] pointer"
            >
              File
            </motion.p>
            <motion.p
              whileHover={{ backgroundColor: "rgba(107, 114, 128, 0.7)" }}
              className="px-1 py-1 rounded-[0.7vh] pointer"
            >
              Edit
            </motion.p>
            <motion.p
              whileHover={{ backgroundColor: "rgba(107, 114, 128, 0.7)" }}
              className="px-1 py-1 rounded-[0.7vh] pointer"
            >
              View
            </motion.p>
            <motion.p
              whileHover={{ backgroundColor: "rgba(107, 114, 128, 0.7)" }}
              className="px-1 py-1 rounded-[0.7vh] pointer"
            >
              Window
            </motion.p>
            <motion.p
              whileHover={{ backgroundColor: "rgba(107, 114, 128, 0.7)" }}
              className="px-1 py-1 rounded-[0.7vh] pointer"
            >
              Help
            </motion.p>
          </div>
        </div>
        <div className="px-4 flex flex-row justify-center items-end">
          <div className="flex flex-row gap-[1.5vh] text-sm text-end">
            <motion.div
              className="flex justify-end items-center gap-4 px-2 py-1 rounded-[0.7vh]"
              whileHover={{ backgroundColor: "rgba(107, 114, 128, 0.7)" }}
              onClick={() => toggleInfo()}
            >
              <ion-icon name="sunny-outline"></ion-icon>
              <ion-icon name="battery-full-outline"></ion-icon>
              <ion-icon name="wifi-outline"></ion-icon>
              <ion-icon name="volume-off"></ion-icon>
              <ion-icon name="search-outline"></ion-icon>
            </motion.div>

            <p className="mt-1.5">{`${day} ${month} ${date} ${hours12}:${formattedMinutes} ${ampm}`}</p>
          </div>
        </div>
      </nav>
      {showInfo === true && (
        <div className="min-h-[18vh] w-[35vh] bg-gray-400/70 backdrop-blur-xl mt-2 absolute left-[167vh] z-10 rounded-xl">
          <div className="px-3 py-2">
            <div className="flex flex-row justify-between gap-2">
              <motion.div
                whileHover={{ backgroundColor: "#60a5fa" }}
                className="bg-gray-300/50 rounded-xl px-3 py-2 w-[10vh] h-[7vh] flex items-center justify-center"
              >
                <ion-icon name="battery-full-outline" size="large"></ion-icon>
              </motion.div>
              <motion.div
                whileHover={{ backgroundColor: "#60a5fa" }}
                className="bg-gray-300/50 rounded-xl px-3 py-2 w-[10vh] h-[7vh] flex items-center justify-center"
              >
                <ion-icon name="wifi-outline" size="large"></ion-icon>
              </motion.div>
              <motion.div
                whileHover={{ backgroundColor: "#60a5fa" }}
                className="bg-gray-300/50 rounded-xl px-3 py-2 w-[10vh] h-[7vh] flex items-center justify-center"
              >
                <ion-icon name="search-outline" size="large"></ion-icon>
              </motion.div>
            </div>
            <div className="flex-col flex">
              <div className="w-[32.5vh] bg-gray-300/50 mt-3 px-2 py-1 rounded-2xl flex items-center justify-between">
                {/* Symbol für wenig Licht */}
                <ion-icon name="sunny-outline"></ion-icon>
                <div
                  className="relative w-full h-4 bg-gray-200 rounded-lg mx-2 pointer"
                  onClick={handleBarClickBrightness}
                >
                  {/* Füllbereich der Bar */}
                  <div
                    className="absolute top-0 left-0 h-4 bg-gray-400 rounded-lg"
                    style={{ width: `${brightness}%` }}
                  ></div>
                  {/* Schieberegler */}
                  <div
                    className="absolute top-0 h-4 w-4 bg-gray-500 rounded-full pointer"
                    style={{ left: `calc(${brightness}% - 12px)` }}
                    draggable
                    onDrag={handleDrag}
                    onDragEnd={(e) => {
                      const bar = e.currentTarget.parentElement;
                      const newBrightness = calculateBrightness(e, bar);
                      setBrightness(newBrightness);
                      onBrightnessChange(newBrightness);
                    }}
                  ></div>
                </div>
                {/* Symbol für maximale Helligkeit */}
                <ion-icon name="sunny"></ion-icon>
              </div>
              <div className="w-[32.5vh] bg-gray-300/50 mt-3 px-2 py-1 rounded-2xl flex items-center justify-between">
                <ion-icon name="volume-off"></ion-icon>
                <div
                  className="relative w-full h-4 bg-gray-200 rounded-lg mx-2 pointer"
                  onClick={handleBarClick}
                >
                  <div
                    className="absolute top-0 left-0 h-4 bg-gray-400 rounded-lg"
                    style={{ width: `${volume}%` }} // Breite entspricht der Lautstärke
                  ></div>
                  <div
                    className="absolute top-0 h-4 w-4 bg-gray-500 rounded-full pointer"
                    style={{ left: `calc(${volume}% - 12px)` }} // Position des Schiebeknopfs
                    draggable
                    onDrag={(e) => {
                      if (e.clientX !== 0) {
                        const bar = e.currentTarget.parentElement;
                        const rect = bar.getBoundingClientRect();
                        const dragPosition = e.clientX - rect.left;
                        const newVolume = Math.min(
                          Math.max((dragPosition / rect.width) * 100, 0),
                          100
                        );
                        setVolume(newVolume);
                      }
                    }}
                  ></div>
                </div>
                <ion-icon name="volume-high"></ion-icon>
              </div>
            </div>
          </div>
        </div>
      )}
      {showDropDown === true && (
        <div className="min-h-[18vh] w-[13%] bg-gray-300/50 rounded-lg mx-2 mt-0.5 backdrop-blur-xl">
          <div className="px-4 py-2 gap-1 flex items-start justify-start flex-col">
            <p
              onClick={() => toggleWidget()}
              className="font-normal text-sm pointer"
            >
              About this Mac
            </p>
            <div className="w-full border border-gray-300/20" />
            <p className="font-normal text-sm pointer">System Settings</p>
            <div className="w-full border border-gray-300/20" />
            <p className="font-normal text-sm pointer">Stop Immediately</p>
            <div className="w-full border border-gray-300/20" />
            <p className="font-normal text-sm pointer" onClick={requestTurnOff}>
              Turn off
            </p>
            <div className="w-full border border-gray-300/20" />
            <p className="font-normal text-sm pointer" onClick={requestTurnOff}>
              Lock Screen
            </p>
            <p className="font-normal text-sm pointer" onClick={requestTurnOff}>
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
          <div className="min-h-[50vh] w-[28%] bg-gray-400 rounded-lg mx-4 my-5 backdrop-blur-xl pointer">
            <div className="px-4 py-3 flex items-start justify-start gap-2">
              <motion.div
                whileHover={{ scale: 0.8 }}
                className="w-3 h-3 bg-red-500 rounded-full"
                onClick={() => handleCloseDropdown()}
              ></motion.div>
              <motion.div
                whileHover={{ scale: 0.8 }}
                className="w-3 h-3 bg-yellow-500 rounded-full"
              ></motion.div>
              <motion.div
                whileHover={{ scale: 0.8 }}
                className="w-3 h-3 bg-green-500 rounded-full"
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
              <div className="transform scale-60">
                <GitHubCalendar username="adrian-on-github" />
              </div>
            </div>
          </div>
        </Draggable>
      )}
    </>
  );
}

export default Navbar;
