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
  EyeOff,
} from "lucide-react";

function BottomBar() {
  const [showToast, setShowToast] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
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
  };

  const triggerProjects = () => {
    if (tech === false && skills === false) {
      setProjects(!projects);
      setFetch(false);
      setLastOpened("projects");
    } else {
      setTech(false);
      setSkills(false);
      setFetch(false);
    }
  };

  const triggerSkills = () => {
    if (projects === false && tech === false) {
      setSkills(!skills);
      setFetch(false);
      setLastOpened("skills");
    } else {
      setProjects(false);
      setTech(false);
      setFetch(false);
    }
  };

  const triggerTech = () => {
    if (projects === false && skills === false) {
      setTech(!tech);
      setFetch(false);
      setLastOpened("tech");
    } else {
      setProjects(false);
      setSkills(false);
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
    }
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
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
              <div className="flex justify-start items-center py-3 px-3 gap-2">
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
                    whileHover={{ backgroundColor: "rgba(133, 141, 157, 0.5)" }}
                    onClick={() => triggerProjects()}
                  >
                    <Code size={15} color="#3b82f6" />
                    <p className="text-sm font-normal">Projects</p>
                  </motion.div>
                </div>
                <div className="flex items-center">
                  <motion.div
                    className="px-2 py-1 rounded-lg cursor-pointer flex flex-row gap-1 mt-0.5"
                    whileHover={{ backgroundColor: "rgba(133, 141, 157, 0.5)" }}
                    onClick={() => triggerTech()}
                  >
                    <Cpu size={15} color="#3b82f6" />
                    <p className="text-sm font-normal">Technologies</p>
                  </motion.div>
                </div>
                <div className="flex items-center">
                  <motion.div
                    className="px-2 py-1 rounded-lg cursor-pointer flex flex-row gap-1 mt-0.5"
                    whileHover={{ backgroundColor: "rgba(133, 141, 157, 0.5)" }}
                    onClick={() => triggerSkills()}
                  >
                    <GraduationCap size={15} color="#3b82f6" />
                    <p className="text-sm font-normal">Skills</p>
                  </motion.div>
                </div>

                {/* Commissions Section */}
                {/* <div className="text-xs text-gray-500 mt-4 mb-2">
                  Commissions
                </div> */}
              </div>
              {/* Rotated Divider */}
              <div className="absolute top-[50%] rotate-90 h-[1px] w-[47.7%] bg-gray-500/70" />
              <div className="absolute top-[15%] h-[1px] w-[76.2%] bg-gray-500/70 right-[-0.1%]" />
              <motion.div
                className="absolute top-[3.5%] right-[68%] px-0.5 py-0.5 rounded-lg"
                whileHover={{ backgroundColor: "rgba(133, 141, 157, 0.5)" }}
                onClick={() => reopenLastOpened()}
              >
                <ChevronRight size={25} color="#6b7280" />
              </motion.div>

              <motion.div
                className="absolute top-[3.5%] right-[72%] px-0.5 py-0.5 rounded-lg"
                whileHover={{ backgroundColor: "rgba(133, 141, 157, 0.5)" }}
                onClick={() => {
                  setFetch(true);
                  setProjects(false);
                  setSkills(false);
                  setTech(false);
                }}
              >
                <ChevronLeft size={25} color="#6b7280" />
              </motion.div>
              <div className="absolute top-[4%] ml-[27vh] px-0.5 py-0.5 rounded-lg">
                <p className="text-sm">
                  {(fetch === true && "Finder") ||
                    (projects === true && "Projects") ||
                    (skills === true && "Skills") ||
                    (tech === true && "Technologies")}
                </p>
              </div>
              {fetch === true &&
                projects === false &&
                tech === false &&
                skills === false && (
                  <div className="absolute top-[6vh] left-[21vh] py-1">
                    <div className="flex flex-row gap-5">
                      <motion.div
                        className="flex flex-col px-2 py-1 rounded-lg cursor-pointer"
                        whileHover={{
                          backgroundColor: "rgba(133, 141, 157, 0.5)",
                        }}
                        onClick={triggerProjects}
                      >
                        <motion.img
                          whileHover={{ scale: 0.8 }}
                          src={icons.folder}
                          alt="folder"
                          className="w-14 h-14"
                        />
                        <p className="text-sm font-normal ml-0.5 text-center">
                          Projects
                        </p>
                      </motion.div>
                      <motion.div
                        className="flex flex-col px-2 py-1 rounded-lg cursor-pointer"
                        whileHover={{
                          backgroundColor: "rgba(133, 141, 157, 0.5)",
                        }}
                        onClick={triggerTech}
                      >
                        <motion.img
                          whileHover={{ scale: 0.8 }}
                          src={icons.folder}
                          alt="folder"
                          className="w-14 h-14 ml-3"
                        />
                        <p className="text-sm font-normal text-center">
                          Technologies
                        </p>
                      </motion.div>
                      <motion.div
                        className="flex flex-col px-2 py-1 rounded-lg cursor-pointer"
                        whileHover={{
                          backgroundColor: "rgba(133, 141, 157, 0.5)",
                        }}
                        onClick={triggerSkills}
                      >
                        <motion.img
                          whileHover={{ scale: 0.8 }}
                          src={icons.folder}
                          alt="folder"
                          className="w-14 h-14"
                        />
                        <p className="text-sm font-normal text-center">
                          Skills
                        </p>
                      </motion.div>
                    </div>
                  </div>
                )}
              {projects === true && skills === false && tech === false && (
                <div className="absolute ml-[21vh] bottom-[25.5vh]">
                  <div className="flex-row flex text-center">
                    <div
                      className="flex-col flex"
                      onClick={() => window.open(project1, "_blank")}
                    >
                      <motion.img
                        whileHover={{ scale: 0.8 }}
                        whileTap={{ scale: 0.6 }}
                        src={icons.folder}
                        alt="HealthAI"
                        className="w-12 h-12"
                      />
                      <p className="text-sm">HealthAI</p>
                    </div>
                    <div
                      className="flex-col flex ml-5"
                      onClick={() => window.open(project2, "_blank")}
                    >
                      <motion.img
                        whileHover={{ scale: 0.8 }}
                        whileTap={{ scale: 0.6 }}
                        src={icons.folder}
                        alt="HealthAI"
                        className="w-12 h-12"
                      />
                      <p className="text-sm">Portfolio</p>
                    </div>
                  </div>
                </div>
              )}
              {tech === true && projects === false && skills === false && (
                <div className="flex justify-center items-center">
                  Fetching tech here
                </div>
              )}
              {skills === true && tech === false && projects === false && (
                <>
                  <div className="absolute right-[1vh] bottom-[28vh]">
                    <div className="flex flex-row gap-3">
                      <motion.img
                        whileHover={{ scale: 0.8 }}
                        src={icons.html}
                        alt="html"
                        className="w-7 h-7"
                      />
                      <motion.img
                        whileHover={{ scale: 0.8 }}
                        src={icons.css}
                        alt="css"
                        className="w-7 h-7"
                      />
                      <motion.img
                        whileHover={{ scale: 0.8 }}
                        src={icons.js}
                        alt="js"
                        className="w-7 h-7"
                      />
                      <motion.img
                        whileHover={{ scale: 0.8 }}
                        src={icons.ts}
                        alt="ts"
                        className="w-7 h-7"
                      />
                      <motion.img
                        whileHover={{ scale: 0.8 }}
                        src={icons.tailwind}
                        alt="tailwind"
                        className="w-10 h-7"
                      />
                      <motion.img
                        whileHover={{ scale: 0.8 }}
                        src={icons.nextjs}
                        alt="nextjs"
                        className="w-7 h-7"
                      />
                      <motion.img
                        whileHover={{ scale: 0.8 }}
                        src={icons.node}
                        alt="node"
                        className="w-7 h-7"
                      />
                      <motion.img
                        whileHover={{ scale: 0.8 }}
                        src={icons.express}
                        alt="express"
                        className="w-7 h-7"
                      />
                      <motion.img
                        whileHover={{ scale: 0.8 }}
                        src={icons.react}
                        alt="react"
                        className="w-10 h-7"
                      />
                      <motion.img
                        whileHover={{ scale: 0.8 }}
                        src={icons.supabase}
                        alt="supabase"
                        className="w-7 h-7"
                      />
                      <motion.img
                        whileHover={{ scale: 0.8 }}
                        src={icons.mongodb}
                        alt="mongodb"
                        className="w-7 h-7"
                      />
                      <motion.img
                        whileHover={{ scale: 0.8 }}
                        src={icons.php}
                        alt="php"
                        className="w-7 h-7"
                      />
                      <motion.img
                        whileHover={{ scale: 0.8 }}
                        src={icons.mysql}
                        alt="mysql"
                        className="w-10 h-7"
                      />
                    </div>
                  </div>

                  <motion.div
                    className="absolute justify-center text-center items-center h-9 ml-[30vh] flex-row px-1 py-1 w-2/4 rounded-lg bg-black/20"
                    onClick={toggleVisibility}
                  >
                    {isVisible === false && (
                      <div className="items-center justify-center flex mt-1">
                        <EyeOff size={20} />
                      </div>
                    )}
                  </motion.div>

                  {isVisible && (
                    <div className="flex justify-center text-center flex-row px-1 py-1 rounded-lg w-2/4 ml-[30vh]">
                      <p className="text-sm mt-1">portfolio programmed in</p>
                      <img src={icons.react} alt="react" className="w-10 h-7" />
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
                  )}
                </>
              )}
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
