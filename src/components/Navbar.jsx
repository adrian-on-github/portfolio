import React, { useState } from "react";
import icons from "../constants/index";
import { motion } from "framer-motion";
import GitHubCalendar from "react-github-calendar";

function Navbar() {
  const [widgetStatus, setWidgetStatus] = useState(false);
  const now = new Date();
  const year = now.getFullYear();
  const monthIndex = now.getMonth();
  const dayIndex = now.getDay();
  const hours24 = now.getHours(); // 24-Stunden-Format
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

  const hours12 = hours24 % 12 || 12; // Stunden im 12-Stunden-Format
  const ampm = hours24 >= 12 ? "PM" : "AM";

  // Minuten formatieren
  const formattedMinutes =
    minutes === 0 ? "00" : minutes.toString().padStart(2, "0");

  const toggleWidget = () => {
    setWidgetStatus((prevWidget) => !prevWidget);
  };

  return (
    <>
      <nav className="bg-purple-200/70 min-h-9 flex flex-row justify-between items-center">
        <div className="px-3 flex flex-row justify-center items-center">
          <motion.img
            src={icons.apple}
            alt="apple"
            className="w-5 h-5"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            onClick={toggleWidget}
          />
          <div className="ml-4 flex flex-row gap-[1.2vh]">
            {/* clickable down here */}
          </div>
        </div>
        <div className="px-4 flex flex-row justify-center items-center">
          <div className="flex flex-row gap-[1.5vh]">
            <p>{`${day} ${month} ${date} ${hours12}:${formattedMinutes} ${ampm}`}</p>
          </div>
        </div>
      </nav>
      {widgetStatus === true && <Widget />}
    </>
  );
}

function Widget() {
  return (
    <div className="min-h-[50vh] w-[28%] bg-purple-200/70 rounded-lg mx-4 my-5">
      <div className="px-4 py-3 flex items-start justify-start gap-2">
        <Green />
        <Yellow />
        <Red onClick={toggleWidget} />
      </div>
      <div className="flex-col">
        <div className="flex flex-row px-4 py-3 items-start justify-start">
          Hey Im Adrian <div class="wave-hand">👋</div>
        </div>
        <div className="flex flex-col px-4 py-3 items-start justify-start">
          <p className="mt-1">
            ⭐ Very young developer, whose on a long way to fullstack developer
          </p>
          <p className="mt-2">
            ❤️ Love to collaborate with competent and friendly people around the
            whole world
          </p>
          <p className="mt-2">
            💭 "During a gold rush, instead of investing in gold diggers, invest
            in shovels" -André Kostolany
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
  );
}

function Green() {
  return (
    <motion.div
      whileHover={{ scale: 0.8 }}
      whileTap={{ scale: 0.5 }}
      className="w-3 h-3 bg-green-500 rounded-full"
    ></motion.div>
  );
}

function Yellow() {
  return (
    <motion.div
      whileHover={{ scale: 0.8 }}
      whileTap={{ scale: 0.5 }}
      className="w-3 h-3 bg-yellow-500 rounded-full"
    ></motion.div>
  );
}

function Red() {
  return (
    <motion.div
      whileHover={{ scale: 0.8 }}
      whileTap={{ scale: 0.5 }}
      className="w-3 h-3 bg-red-500 rounded-full"
    ></motion.div>
  );
}

export default Navbar;
