import React from "react";
import icons from "../constants/index";
import { motion } from "framer-motion";

function Navbar() {
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

  return (
    <nav className="bg-purple-200/70 min-h-9 flex flex-row justify-between items-center">
      <div className="px-3 flex flex-row justify-center items-center">
        <motion.img
          src={icons.apple}
          alt="apple"
          className="w-5 h-5"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
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
  );
}

export default Navbar;
