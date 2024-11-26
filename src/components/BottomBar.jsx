import React, { useState, useEffect, useRef } from "react";
import icons from "../constants/index";
import { motion, AnimatePresence } from "framer-motion";
import Draggable from "react-draggable";
import {
  Code,
  Cpu,
  GraduationCap,
  ChevronRight,
  ChevronLeft,
  EyeOff,
  Wind,
} from "lucide-react";
import axios from "axios";

function BottomBar({ triggerAction }) {
  const [showToast, setShowToast] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [home, setHome] = useState(false);
  const [finder, setFinder] = useState(false);
  const [projects, setProjects] = useState(false);
  const [tech, setTech] = useState(false);
  const [skills, setSkills] = useState(false);
  const [fetch, setFetch] = useState(true);
  const [lastOpened, setLastOpened] = useState(null);
  const email = "adrian.hassan.ef@gmail.com";
  const github = "https://github.com/adrian-on-github";
  const X = "https://x.com/DEadrianJS";
  const project1 = "https://healthai-one.vercel.app";
  const project2 = "https://github.com/adrian-on-github/portfolio-macOS-copy";

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
    setHome(true);
  };

  const triggerProjects = () => {
    if ((tech === false && skills === false) || home === false) {
      setProjects(!projects);
      setFetch(false);
      setHome(false);
      setLastOpened("projects");
    } else {
      setTech(false);
      setSkills(false);
      setFetch(false);
    }
  };

  const triggerSkills = () => {
    if ((projects === false && tech === false) || home === false) {
      setSkills(!skills);
      setFetch(false);
      setHome(false);
      setLastOpened("skills");
    } else {
      setProjects(false);
      setTech(false);
      setFetch(false);
    }
  };

  const triggerTech = () => {
    if ((projects === false && skills === false) || home === false) {
      setTech(!tech);
      setFetch(false);
      setHome(false);
      setLastOpened("tech");
    } else {
      setProjects(false);
      setSkills(false);
      setFetch(false);
    }
  };

  const triggerHome = () => {
    if (projects === false && skills === false && tech === false) {
      setHome(!home);
      setFetch(false);
      setLastOpened("home");
    } else {
      setProjects(false);
      setSkills(false);
      setTech(false);
      setFetch(false);
    }
  };

  const reopenLastOpened = () => {
    setFetch(false);
    if (lastOpened === "projects") {
      triggerProjects();
    } else if (lastOpened === "tech") {
      triggerTech();
    } else if (lastOpened === "skills") {
      triggerSkills();
    } else if (lastOpened === "") {
      triggerHome();
    }
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const prevTriggerActionRef = useRef();

  useEffect(() => {
    if (
      prevTriggerActionRef.current !== undefined &&
      prevTriggerActionRef.current === false &&
      triggerAction === true
    ) {
      // Nur wenn triggerAction von false auf true geändert wurde
      triggerFinder();
    }

    // Speichern des vorherigen Werts von triggerAction
    prevTriggerActionRef.current = triggerAction;
  }, [triggerAction]);

  const requestOpen = () => {
    if (finder === false) {
      triggerFinder();
    }
    reopenLastOpened();
  };

  return (
    <>
      {finder === true && (
        <Draggable bounds={{}}>
          <div className="relative top-[-25vh] left-[31%]">
            <div className="bg-gray-400 w-[40%] min-h-[39vh] rounded-2xl backdrop-blur-xl shadow-lg pointer">
              {/* Header with Close Buttons */}
              <div className="flex justify-start items-center py-3 px-3 gap-2">
                <motion.div
                  whileHover={{ scale: 0.7 }}
                  className="w-3 h-3 bg-green-500 rounded-full pointer"
                ></motion.div>
                <motion.div
                  whileHover={{ scale: 0.7 }}
                  className="w-3 h-3 bg-yellow-500 rounded-full pointer"
                ></motion.div>
                <motion.div
                  whileHover={{ scale: 0.7 }}
                  className="w-3 h-3 bg-red-500 rounded-full pointer"
                  onClick={() => triggerFinder()}
                ></motion.div>
              </div>
              {/* Content Section */}
              <div className="flex flex-col">
                {/* Favorites Section */}
                <div className="text-xs text-gray-500 mb-2 px-2 mt-2">
                  Favorites
                </div>
                <div className="flex items-center flex-row ml-1">
                  <motion.div className="px-2 py-1 rounded-lg flex flex-row gap-1 mt-0.5">
                    <Code size={15} color="#3b82f6" className="mt-0.5" />
                    <p className="text-sm font-normal">Projects</p>
                  </motion.div>
                </div>
                <div className="flex items-center ml-1">
                  <motion.div className="px-2 py-1 rounded-lg flex flex-row gap-1 mt-0.5">
                    <Cpu size={15} color="#3b82f6" className="mt-0.5" />
                    <p className="text-sm font-normal">Technologies</p>
                  </motion.div>
                </div>
                <div className="flex items-center ml-1">
                  <motion.div className="px-2 py-1 rounded-lg flex flex-row gap-1 mt-0.5">
                    <GraduationCap
                      size={15}
                      color="#3b82f6"
                      className="mt-0.5"
                    />
                    <p className="text-sm font-normal">Skills</p>
                  </motion.div>
                </div>

                {/* Commissions Section */}
                {/* <div className="text-xs text-gray-500 mt-4 mb-2">
                  Commissions
                </div> */}
              </div>
              {/* <div className="text-xs text-gray-500 mt-4 mb-2">
                  Commissions
                </div> */}
              {/* Rotated Divider */}
              <div className="flex mt-[3.79vh] rotate-90 h-[1px] w-[47.6%] bg-gray-500/70" />
              <div className="relative bottom-[14.5vh] h-[1px] w-[76.24%] bg-gray-500/70 left-[19.5vh]" />
              <motion.div
                className="absolute top-[2.2%] right-[65%] px-0.5 py-0.5 rounded-lg"
                whileHover={{ backgroundColor: "rgba(133, 141, 157, 0.5)" }}
                onClick={() => reopenLastOpened()}
              >
                <ChevronRight size={25} color="#6b7280" />
              </motion.div>

              <motion.div
                className="absolute top-[2.2%] right-[71%] px-0.5 py-0.5 rounded-lg"
                whileHover={{ backgroundColor: "rgba(133, 141, 157, 0.5)" }}
                onClick={() => {
                  setFetch(true);
                  setHome(true);
                  setProjects(false);
                  setSkills(false);
                  setTech(false);
                }}
              >
                <ChevronLeft size={25} color="#6b7280" />
              </motion.div>
              <div className="absolute top-[1.2vh] ml-[31vh] px-0.5 py-0.5 rounded-lg">
                <p className="text-sm">
                  {(fetch === true && "Finder") ||
                    (home === true && "Finder") ||
                    (projects === true && "Projects") ||
                    (skills === true && "Skills") ||
                    (tech === true && "Technologies")}
                </p>
              </div>
              {home === true && (
                <div className="relative bottom-[13vh] left-[21vh] py-1">
                  <div className="flex flex-row gap-2 justify-start">
                    <motion.div
                      className="flex flex-col px-2 py-1 rounded-lg"
                      whileHover={{
                        backgroundColor: "rgba(133, 141, 157, 0.5)",
                      }}
                      onDoubleClick={triggerProjects}
                      whileTap={{
                        opacity: 0.8,
                      }}
                    >
                      <motion.img
                        whileHover={{ scale: 0.7 }}
                        src={icons.folder}
                        alt="folder"
                        className="w-14 h-14"
                      />
                      <p className="text-sm font-normal ml-0.5 text-center">
                        Projects
                      </p>
                    </motion.div>
                    <motion.div
                      className="flex flex-col px-2 py-1 rounded-lg"
                      whileHover={{
                        backgroundColor: "rgba(133, 141, 157, 0.5)",
                      }}
                      onDoubleClick={triggerTech}
                      whileTap={{
                        opacity: 0.8,
                      }}
                    >
                      <motion.img
                        whileHover={{ scale: 0.7 }}
                        src={icons.folder}
                        alt="folder"
                        className="w-14 h-14 ml-3"
                      />
                      <p className="text-sm font-normal text-center">
                        Technologies
                      </p>
                    </motion.div>
                    <motion.div
                      className="flex flex-col px-2 py-1 rounded-lg"
                      whileHover={{
                        backgroundColor: "rgba(133, 141, 157, 0.5)",
                      }}
                      onDoubleClick={triggerSkills}
                      whileTap={{
                        opacity: 0.8,
                      }}
                    >
                      <motion.img
                        whileHover={{ scale: 0.7 }}
                        src={icons.folder}
                        alt="folder"
                        className="w-14 h-14"
                      />
                      <p className="text-sm font-normal text-center">Skills</p>
                    </motion.div>
                  </div>
                </div>
              )}
              {projects === true && skills === false && tech === false && (
                <div className="absolute ml-[20.5vh] bottom-[22.5vh]">
                  <div className="flex-row flex text-center">
                    <motion.div
                      className="flex-col flex text-center justify-center items-center px-2 py-1 rounded-lg"
                      onClick={() => window.open(project1, "_blank")}
                      whileHover={{
                        backgroundColor: "rgba(133, 141, 157, 0.5)",
                      }}
                    >
                      <motion.img
                        whileHover={{ scale: 0.9 }}
                        whileTap={{ scale: 0.6 }}
                        src={icons.folder}
                        alt="HealthAI"
                        className="w-12 h-12"
                      />
                      <p className="text-sm font-normal">HealthAI</p>
                    </motion.div>
                    <motion.div
                      className="flex-col flex text-center justify-center items-center ml-5 px-2 py-1 rounded-lg"
                      onClick={() => window.open(project2, "_blank")}
                      whileHover={{
                        backgroundColor: "rgba(133, 141, 157, 0.5)",
                      }}
                    >
                      <motion.img
                        whileHover={{ scale: 0.9 }}
                        whileTap={{ scale: 0.6 }}
                        src={icons.folder}
                        alt="HealthAI"
                        className="w-12 h-12"
                      />
                      <p className="text-sm font-normal">Portfolio</p>
                    </motion.div>
                  </div>
                </div>
              )}
              {tech === true && projects === false && skills === false && (
                <div className="absolute ml-[22vh] bottom-[25vh] gap-2">
                  <img
                    src={icons.raspberry}
                    alt="raspberry"
                    className="w-[15%] absolute top-5 left-[11vh]"
                  />
                  <img src={icons.macbook} alt="macbook" className="w-[15%]" />
                </div>
              )}
              {skills === true && tech === false && projects === false && (
                <>
                  <div className="relative justify-center items-start bottom-[10vh] left-20">
                    <div className="flex items-center justify-center flex-col py-1">
                      <div className="flex flex-row gap-3 py-2">
                        <motion.img
                          whileHover={{ scale: 0.9 }}
                          src={icons.html}
                          alt="html"
                          className="w-7 h-7"
                        />
                        <motion.img
                          whileHover={{ scale: 0.9 }}
                          src={icons.css}
                          alt="css"
                          className="w-7 h-7"
                        />
                        <motion.img
                          whileHover={{ scale: 0.9 }}
                          src={icons.js}
                          alt="js"
                          className="w-7 h-7"
                        />
                        <motion.img
                          whileHover={{ scale: 0.9 }}
                          src={icons.ts}
                          alt="ts"
                          className="w-7 h-7"
                        />
                        <motion.img
                          whileHover={{ scale: 0.9 }}
                          src={icons.tailwind}
                          alt="tailwind"
                          className="w-10 h-7"
                        />
                        <motion.img
                          whileHover={{ scale: 0.9 }}
                          src={icons.nextjs}
                          alt="nextjs"
                          className="w-7 h-7"
                        />
                      </div>
                      <div className="flex flex-row gap-3">
                        <motion.img
                          whileHover={{ scale: 0.9 }}
                          src={icons.node}
                          alt="node"
                          className="w-7 h-7"
                        />
                        <motion.img
                          whileHover={{ scale: 0.9 }}
                          src={icons.express}
                          alt="express"
                          className="w-7 h-7"
                        />
                        <motion.img
                          whileHover={{ scale: 0.9 }}
                          src={icons.react}
                          alt="react"
                          className="w-10 h-7"
                        />
                        <motion.img
                          whileHover={{ scale: 0.9 }}
                          src={icons.mongodb}
                          alt="mongodb"
                          className="w-7 h-7"
                        />
                        <motion.img
                          whileHover={{ scale: 0.9 }}
                          src={icons.php}
                          alt="php"
                          className="w-7 h-7"
                        />
                        <motion.img
                          whileHover={{ scale: 0.9 }}
                          src={icons.mysql}
                          alt="mysql"
                          className="w-10 h-7"
                        />
                      </div>
                    </div>
                  </div>

                  <motion.div
                    className="absolute justify-center text-center items-center h-9 ml-[30vh] bottom-[13vh] flex-row px-1 py-1 w-2/4 rounded-lg bg-black/20"
                    onClick={toggleVisibility}
                  >
                    {isVisible === false && (
                      <div className="items-center justify-center flex mt-1">
                        <EyeOff size={20} />
                      </div>
                    )}
                  </motion.div>

                  {isVisible && (
                    <div className="absolute bottom-[-2vh] left-20">
                      <div className="flex justify-center text-center flex-row px-1 py-1 rounded-lg w-2/4 ml-[30vh] mb-[15vh]">
                        <p className="text-sm mt-1">portfolio:</p>
                        <img
                          src={icons.react}
                          alt="react"
                          className="w-10 h-7"
                        />
                        <img
                          src={icons.tailwind}
                          alt="tailwind"
                          className="w-6 h-4 mt-1.5"
                        />
                        <img
                          src={icons.js}
                          alt="js"
                          className="w-5 h-5 mt-1 ml-2.5"
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </Draggable>
      )}
      <div className="absolute bg-gradient-to-t bottom-[76vh] left-[153vh] from-blue-400 to-blue-500 w-[25%] min-h-[18vh] rounded-2xl shadow-lg">
        <div className="flex justify-between px-4 py-3">
          <div className="flex flex-col">
            <p className="text-white text-xl">loc</p>
            <p className="text-white text-2xl mt-1">°C</p>
          </div>
          <div className="flex flex-col">
            <p className="text-white text-xl">con</p>
            <p className="text-white text-lg mt-1">km/h</p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[57vh] mr-1 left-[153vh] bg-gray-800 w-[25%] min-h-[18vh] rounded-2xl shadow-lg">
        <div className="flex justify-start px-4 py-2">
          <img
            src={icons.spotify}
            alt="spofify"
            className="w-12 h-12 rounded-lg"
          />
        </div>
        <div className="flex flex-col text-center justify-center items-center">
          <p className="text-white text-sm">con</p>
          <p className="text-white text-sm mt-1">km/h</p>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="bg-gray-300/50 w-[45%] min-h-16 rounded-2xl backdrop-blur-xl">
          <div className="flex justify-center items-center py-2">
            <motion.img
              src={icons.finder}
              className="w-12 h-12 mx-2"
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
              src={icons.spotify}
              className="w-10 h-10 mx-2 rounded-lg"
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
              className="w-10 h-10 bg-white px-1 py-1 rounded-lg mx-1"
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => requestOpen()}
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
              ✅ Email copied to clipboard
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default BottomBar;
