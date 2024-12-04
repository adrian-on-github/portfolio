import React, { useState, useEffect, useRef } from "react";
import icons from "../constants/index";
import { motion, AnimatePresence } from "framer-motion";
import Draggable from "react-draggable";
import emailjs from "@emailjs/browser";
import {
  Code,
  Cpu,
  GraduationCap,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Wind,
  Inbox,
  Star,
  Clock8,
  FolderClosed,
  Trash2,
  SquarePen,
  ArchiveX,
  Send,
  CornerUpLeft,
  CornerUpRight,
  SendHorizontal,
} from "lucide-react";
import axios from "axios";

function BottomBar({ triggerAction, setBackground }) {
  const [showToast, setShowToast] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [home, setHome] = useState(false);
  const [finder, setFinder] = useState(false);
  const [projects, setProjects] = useState(false);
  const [tech, setTech] = useState(false);
  const [skills, setSkills] = useState(false);
  const [fetch, setFetch] = useState(true);
  const [currentSong, setCurrentSong] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastOpened, setLastOpened] = useState(null);
  const [open, setOpen] = useState(null);
  const [spotifyWidget, setSpotifyWidget] = useState(true);
  const [githubBrowser, setGithubBrowser] = useState(false);
  const [twitterBrowser, setTwitterBrowser] = useState(false);
  const [weatherWidget, setWeatherWidget] = useState(true);
  const [emailWidget, setEmailWidget] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [settings, setSettings] = useState(false);
  const [weatherData, setWeatherData] = useState({
    city: "Erfurt",
    temperature: null,
    condition: "",
    windSpeed: null,
  });
  const email = "adrian.hassan.ef@gmail.com";
  const github = "https://github.com/adrian-on-github";
  const X = "https://x.com/DEadrianJS";
  const project1 = "https://healthai-one.vercel.app";
  const project2 = "https://github.com/adrian-on-github/portfolio-macOS-copy";
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_jqvgyth", "template_58v9fsi", form.current, {
        publicKey: "_WE2vFUiE-vXiARzV",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const city = "Erfurt";
      const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=en`;

      try {
        const response = await axios.get(url);
        const data = response.data; // Daten aus der Antwort
        setWeatherData({
          city: data.location.name,
          temperature: data.current.temp_c,
          condition: data.current.condition.text,
          windSpeed: data.current.wind_kph,
        });
      } catch (error) {
        console.error("Fehler beim Abrufen der Wetterdaten:", error);
      }
    };

    fetchWeatherData();
  }, []);

  const { city, temperature, condition, windSpeed } = weatherData;

  useEffect(() => {
    const fetchCurrentSong = async () => {
      const token = import.meta.env.VITE_SPOTIFY_ACCESS_TOKEN;

      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/player/currently-playing",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 204 || !response.data) {
          console.log("No song is currently playing.");
          setCurrentSong(null);
          setIsPlaying(false);
          return;
        }

        const { item, progress_ms, is_playing } = response.data;
        if (item) {
          setCurrentSong({
            name: item.name,
            artist: item.artists.map((artist) => artist.name).join(", "),
            albumArt: item.album.images[0]?.url,
            songLink: item.external_urls.spotify,
            duration: item.duration_ms,
          });
          setProgress(progress_ms);
          setIsPlaying(is_playing);
        } else {
          setCurrentSong(null);
          setIsPlaying(false);
        }
      } catch (err) {
        console.error("Error fetching current song:", err);
      }
    };

    fetchCurrentSong();

    // Poll every 5 seconds for new song data
    const interval = setInterval(fetchCurrentSong, 5000);

    return () => clearInterval(interval); // Cleanup interval
  }, []);

  useEffect(() => {
    // Progress updater
    const updateProgress = setInterval(() => {
      if (isPlaying && currentSong && progress < currentSong.duration) {
        setProgress((prevProgress) => prevProgress + 1000);
      }
    }, 1000);

    return () => clearInterval(updateProgress); // Cleanup interval
  }, [isPlaying, currentSong, progress]);

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
    setTech(false);
    setSkills(false);
    setProjects(false);
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
      // fallback
    }
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

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const toggleSpotfiy = () => {
    setSpotifyWidget(!spotifyWidget);
  };

  const toggleWeather = () => {
    setWeatherWidget(!weatherWidget);
  };

  const triggerEmailWidget = () => {
    setEmailWidget(!emailWidget);
  };

  useEffect(() => {
    if (
      tech !== true &&
      projects !== true &&
      skills !== true &&
      home !== true &&
      fetch !== true
    ) {
      triggerHome();
    }
  }, [tech, projects, skills, home, fetch, reopenLastOpened, finder]);

  const toggleSettings = () => {
    setSettings(!settings);
  };

  const handleBackgroundChangeFirst = () => {
    setBackground({ state: "first" });
  };

  const handleBackgroundChangeSecond = () => {
    setBackground({ state: "second" });
  };

  const handleBackgroundChangeThird = () => {
    setBackground({ state: "third" });
  };

  return (
    <>
      {finder === true && (
        <Draggable>
          <div className="relative flex justify-start items-start bg-gray-300 w-[45%] min-h-[25rem] rounded-xl bottom-[25vh] left-[55vh]">
            <div className="flex-col h-[25rem] min-w-[29.4%] flex bg-gray-400/20 rounded-tl-xl pointer">
              <div className="flex justify-start items-center py-3 px-3 gap-2 flex-row">
                <motion.div
                  whileHover={{ scale: 0.8 }}
                  className="w-3 h-3 bg-red-500 rounded-full pointer"
                  onClick={() => triggerFinder()}
                ></motion.div>
                <motion.div
                  whileHover={{ scale: 0.8 }}
                  className="w-3 h-3 bg-yellow-500 rounded-full pointer"
                ></motion.div>
                <motion.div
                  whileHover={{ scale: 0.8 }}
                  className="w-3 h-3 bg-green-500 rounded-full pointer"
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
              <div className="relative bottom-[10.5vh] h-[1px] w-[242.5%] bg-gray-400/30 left-[27vh]" />
              <motion.div
                className="absolute top-[2.2%] right-[59%] px-0.5 py-0.5 rounded-lg"
                whileHover={{ backgroundColor: "rgba(133, 141, 157, 0.5)" }}
                onClick={() => reopenLastOpened()}
              >
                <ChevronRight size={25} className="text-gray-400/70" />
              </motion.div>

              <motion.div
                className="absolute top-[2.2%] right-[65%] px-0.5 py-0.5 rounded-lg"
                whileHover={{ backgroundColor: "rgba(133, 141, 157, 0.5)" }}
                onClick={() => {
                  setFetch(true);
                  setHome(true);
                  setProjects(false);
                  setSkills(false);
                  setTech(false);
                }}
              >
                <ChevronLeft size={25} className="text-gray-400/70" />
              </motion.div>
              <div className="absolute top-[1.2vh] ml-[40vh] px-0.5 py-0.5 rounded-lg">
                <p className="text-sm">
                  {(fetch === true && "Finder") ||
                    (home === true && "Finder") ||
                    (projects === true && "Projects") ||
                    (skills === true && "Skills") ||
                    (tech === true && "Technologies")}
                </p>
              </div>
              {home === true && (
                <div className="relative bottom-[10vh] left-[28vh] py-1">
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
                        className="w-14 h-14 ml-4"
                      />
                      <p className="text-sm font-normal ml-0.5 text-center">
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
                      <p className="text-sm font-normal ml-0.5 text-center">
                        Skills
                      </p>
                    </motion.div>
                  </div>
                </div>
              )}
              {projects === true && skills === false && tech === false && (
                <div className="absolute bottom-[26vh] left-[28vh]">
                  <div className="flex-row flex text-center">
                    <motion.div
                      className="flex-col flex text-center justify-center items-center px-2 py-1 rounded-lg"
                      onClick={() => window.open(project1, "_blank")}
                      whileHover={{
                        backgroundColor: "rgba(133, 141, 157, 0.5)",
                      }}
                    >
                      <motion.img
                        whileHover={{ scale: 0.8 }}
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
                        whileHover={{ scale: 0.8 }}
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
                <div></div>
              )}
              {skills === true && tech === false && projects === false && (
                <>
                  <div className="relative justify-center items-end bottom-[10vh] left-[27vh]">
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
                          className="w-7 h-5"
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
                </>
              )}
            </div>
          </div>
        </Draggable>
      )}
      {emailWidget && (
        <>
          <Draggable>
            <div className="absolute flex justify-start items-start bg-white w-[40%] min-h-[49vh] rounded-xl bottom-[30vh] left-[68vh] z-10">
              <div className="flex-col flex bg-gray-500/10 w-[10rem] h-[31rem] rounded-tl-xl pointer">
                <div className="flex justify-start items-center py-3 px-3 gap-2 flex-row">
                  <motion.div
                    whileHover={{ scale: 0.8 }}
                    className="w-3 h-3 bg-red-500 rounded-full pointer"
                    onClick={() => triggerEmailWidget()}
                  ></motion.div>
                  <motion.div
                    whileHover={{ scale: 0.8 }}
                    className="w-3 h-3 bg-yellow-500 rounded-full pointer"
                  ></motion.div>
                  <motion.div
                    whileHover={{ scale: 0.8 }}
                    className="w-3 h-3 bg-green-500 rounded-full pointer"
                  ></motion.div>
                </div>
                <div className="text-start px-3 pt-2">
                  <p className="font-psemibold text-xs text-gray-400 mb-2">
                    Favorites
                  </p>
                  {/* inboxes */}
                  <div className="flex flex-row text-sm">
                    <ChevronDown size={20} />
                    <Inbox size={18} className="mr-1 text-blue-500" />
                    <p className="text-black">All Inboxes</p>
                  </div>
                  <div className="px-4 pt-2 flex flex-col">
                    <div className="flex flex-row text-sm">
                      <Inbox
                        size={16}
                        className="mt-0.5 mr-1 mb-2 text-blue-500"
                      />
                      <p className="text-sm">iCloud</p>
                    </div>
                    <div className="flex flex-row text-sm">
                      <Inbox size={16} className="mt-0.5 mr-1 text-blue-500" />
                      <p className="text-sm">Google</p>
                    </div>
                  </div>
                  {/* VIP */}
                  <div className="flex flex-row text-sm mt-2.5">
                    <ChevronRight size={20} />
                    <Star size={18} className="mr-1 text-yellow-500" />
                    <p className="text-black">VIP</p>
                  </div>
                  <div className="px-4 pt-2 flex flex-col">
                    <div className="flex flex-row text-sm">
                      <Clock8
                        size={16}
                        className="mr-1 mb-2 mt-0.5 text-blue-500"
                      />
                      <p className="text-sm">Remind Me</p>
                    </div>
                  </div>
                  <p className="font-psemibold text-xs text-gray-400 my-2">
                    iCloud
                  </p>
                  <div className="px-4 flex flex-col">
                    <div className="flex flex-row text-sm">
                      <FolderClosed
                        size={16}
                        className="mt-0.5 mr-1 mb-2 text-blue-500"
                      />
                      <p className="text-sm">Work</p>
                    </div>
                    <div className="flex flex-row text-sm">
                      <FolderClosed
                        size={16}
                        className="mt-0.5 mr-1 mb-2 text-blue-500"
                      />
                      <p className="text-sm">Newsletter</p>
                    </div>
                    <div className="flex flex-row text-sm">
                      <Inbox
                        size={16}
                        className="mt-0.5 mr-1 mb-2 text-blue-500"
                      />
                      <p className="text-sm">Inbox</p>
                    </div>
                    <div className="flex flex-row text-sm">
                      <SquarePen
                        size={16}
                        className="mt-0.5 mr-1 mb-2 text-blue-500"
                      />
                      <p className="text-sm">Drafts</p>
                      <div className="flex text-center justify-center items-center px-2.5 h-5 w-5 bg-gray-300 text-xs rounded-full ml-5">
                        <p className="text-gray-700">1</p>
                      </div>
                    </div>
                    <div className="flex flex-row text-sm">
                      <Send
                        size={16}
                        className="mt-0.5 mr-1 mb-2 text-blue-500"
                      />
                      <p className="text-sm">Sent</p>
                    </div>
                    <div className="flex flex-row text-sm">
                      <Trash2
                        size={16}
                        className="mt-0.5 mr-1 mb-2 text-blue-500"
                      />
                      <p className="text-sm">Trash</p>
                      <div className="flex text-center justify-center items-center px-2.5 h-5 w-5 bg-gray-300 text-xs rounded-full ml-[1.45rem]">
                        <p className="text-gray-700">3</p>
                      </div>
                    </div>
                    <div className="flex flex-row text-sm">
                      <ArchiveX
                        size={16}
                        className="mt-0.5 mr-1 mb-2 text-blue-500"
                      />
                      <p className="text-sm">Archive</p>
                    </div>
                  </div>
                </div>
              </div>
              <form ref={form} onSubmit={sendEmail}>
                <div className="flex flex-col justify-start items-center px-5 py-3">
                  <div className="flex flex-row">
                    <div className="rounded-full px-4 py-3 bg-gray-200">
                      <img
                        src={icons.memoji}
                        alt="user"
                        className="w-12 h-14 rounded-full"
                      />
                    </div>
                    <div className="flex flex-col mt-2.5">
                      <p className="ml-4 text-gray-700 text-2xl">User</p>
                      <p className="ml-4 text-gray-700 text-sm">
                        to:adrian.business.ef@gmail.com
                      </p>
                    </div>

                    <div className="flex flex-row text-sm ml-[18vh] gap-3">
                      <motion.div
                        className="px-2 py-1 rounded-lg max-h-12"
                        whileTap={{ scale: 0.9 }}
                        whileHover={{
                          backgroundColor: "rgba(243, 244, 246, 1)",
                        }}
                        onClick={() =>
                          document.getElementById("submitButton").click()
                        }
                      >
                        <CornerUpLeft
                          strokeWidth={1}
                          size={28}
                          className="text-blue-500"
                        />
                        <input
                          type="submit"
                          value="Send"
                          id="submitButton"
                          className="hidden"
                        />
                      </motion.div>
                      <motion.div
                        className="px-2 py-1 rounded-lg max-h-12"
                        whileTap={{ scale: 0.9 }}
                        whileHover={{
                          backgroundColor: "rgba(243, 244, 246, 1)",
                        }}
                      >
                        <CornerUpRight
                          strokeWidth={1}
                          size={28}
                          className="text-purple-500"
                        />
                      </motion.div>
                    </div>
                  </div>
                  <div className="border-gray-500/10 border w-[108.5%] mt-2 ml-2.5" />
                  <div className="mt-1 flex flex-col justify-start items-start mr-[25rem]">
                    <input
                      type="text"
                      name="user_name"
                      className="w-full px-2 py-2 placeholder-gray-300 outline-none focus:outline-none"
                      placeholder="Your Name"
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                    />
                    <div className="absolute bottom-[34vh] left-[18.5vh] w-[70%] h-0.5 bg-gray-200 origin-left rounded-full" />
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isFocused ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-[34vh] left-[18.5vh] w-[70%] h-0.5 bg-blue-500 origin-left rounded-full"
                    />
                    <input
                      type="email"
                      name="user_email"
                      className="px-2 py-2 placeholder-gray-300 border-none outline-none rounded-lg mt-3 w-[250%]"
                      placeholder="Your Email"
                      onFocus={() => setIsFocusedEmail(true)}
                      onBlur={() => setIsFocusedEmail(false)}
                    />
                    <div className="absolute bottom-[29vh] left-[18.5vh] w-[70%] h-0.5 bg-gray-200 origin-left rounded-full" />
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isFocusedEmail ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-[29vh] left-[18.5vh] w-[70%] h-0.5 bg-blue-500 origin-left rounded-full"
                    />
                    <textarea
                      name="message"
                      className="px-2 py-2 placeholder-gray-300 border-none outline-none rounded-lg min-h-20 mt-3 w-[250%]"
                      placeholder="Message"
                    />
                  </div>
                </div>
              </form>
            </div>
          </Draggable>
        </>
      )}
      {weatherWidget && (
        <div className="absolute bg-gradient-to-t bottom-[76.2vh] left-[153vh] from-blue-400 to-blue-500 w-[25%] min-h-[18vh] rounded-2xl shadow-lg">
          <div className="flex justify-between px-4 py-3">
            <div className="flex flex-col">
              <p className="text-white text-xl">{city}</p>
              <p className="text-white text-2xl mt-1">
                {temperature !== null
                  ? `${Math.round(temperature)}°C`
                  : "Loading..."}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-white text-xl">{condition || "Loading..."}</p>
              <div className="flex flex-row">
                <Wind className="text-white text-lg mt-1" />
                <p className="text-white text-lg mt-1">
                  {windSpeed !== null ? `${windSpeed} km/h` : "..."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {spotifyWidget && (
        <div className="absolute bottom-[57.5vh] mr-1 left-[153vh] bg-gray-800 w-[25%] min-h-[18vh] rounded-2xl shadow-lg p-4">
          <div className="flex items-center">
            {currentSong && (
              <img
                src={currentSong.albumArt}
                alt="Album Art"
                className="w-12 h-12 rounded-lg"
              />
            )}
            <div className="ml-4">
              {currentSong ? (
                <>
                  <p className="text-white text-sm">{currentSong.name}</p>
                  <p className="text-white text-sm mt-1">
                    {currentSong.artist}
                  </p>
                  <a
                    href={currentSong.songLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 text-sm mt-1"
                  >
                    Listen on Spotify
                  </a>
                </>
              ) : (
                <>
                  <p className="text-white text-sm mt-1">
                    Adrian is currently not listening to spotify...
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Progress bar */}
          {currentSong && (
            <div className="mt-4">
              <div className="relative w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                <div
                  className="absolute bg-white h-full transition-all"
                  style={{
                    width: `${(progress / currentSong.duration) * 100}%`,
                    transitionDuration: isPlaying ? "1s" : "0s",
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(currentSong.duration)}</span>
              </div>
            </div>
          )}
        </div>
      )}
      {settings && (
        <>
          <Draggable>
            <div className="absolute flex justify-start items-start bg-gray-300 w-[40%] min-h-[49vh] rounded-xl bottom-[30vh] left-[68vh] z-10 pointer">
              <div className="flex flex-col">
                <div className="flex justify-start items-center py-3 px-3 gap-2 flex-row">
                  <motion.div
                    whileHover={{ scale: 0.8 }}
                    className="w-3 h-3 bg-red-500 rounded-full pointer"
                    onClick={() => toggleSettings()}
                  ></motion.div>
                  <motion.div
                    whileHover={{ scale: 0.8 }}
                    className="w-3 h-3 bg-yellow-500 rounded-full pointer"
                  ></motion.div>
                  <motion.div
                    whileHover={{ scale: 0.8 }}
                    className="w-3 h-3 bg-green-500 rounded-full pointer"
                  ></motion.div>
                </div>
                <div className="px-3 mt-3">
                  <div className="flex justify-start items-center">
                    <div className="flex flex-row bg-gray-200 rounded-xl px-2 py-1 w-[18vh] h-[4vh] border border-gray-300 hover:border-gray-500 focus-within:border-blue-400 transition-all duration-300 ease-in-out">
                      <input
                        type="text"
                        placeholder="Search"
                        className="bg-transparent border-none outline-none w-full h-full px-2 text-sm text-black placeholder-black focus:ring-0"
                      />
                      <div className="relative top-0.5">
                        <ion-icon
                          name="search-outline"
                          className="text-gray-600 text-sm ml-2d"
                        ></ion-icon>
                      </div>
                    </div>
                  </div>
                  <motion.div
                    className="mt-5 w-[18vh] h-[4vh] rounded-xl bg-gray-200 flex justify-start items-center px-3 text-sm"
                    whileHover={{ backgroundColor: "#60a5fa" }}
                  >
                    <ion-icon name="settings" size="small"></ion-icon>
                    <p className="ml-1">General</p>
                  </motion.div>
                  <motion.div
                    className="mt-2 w-[18vh] h-[4vh] rounded-xl bg-gray-200 flex justify-start items-center px-3 text-sm"
                    whileHover={{ backgroundColor: "#60a5fa" }}
                  >
                    <ion-icon name="color-palette" size="small"></ion-icon>
                    <p className="ml-1">Appearance</p>
                  </motion.div>
                  <motion.div
                    className="mt-2 w-[18vh] h-[4vh] rounded-xl bg-gray-200 flex justify-start items-center px-3 text-sm"
                    whileHover={{ backgroundColor: "#60a5fa" }}
                  >
                    <ion-icon name="wifi-outline" size="small"></ion-icon>
                    <p className="ml-1">Network</p>
                  </motion.div>
                  <motion.div
                    className="mt-2 w-[18vh] h-[4vh] rounded-xl bg-gray-200 flex justify-start items-center px-3 text-sm"
                    whileHover={{ backgroundColor: "#60a5fa" }}
                  >
                    <ion-icon name="volume-high" size="small"></ion-icon>
                    <p className="ml-1">Sound</p>
                  </motion.div>
                  <motion.div
                    className="mt-2 w-[18vh] h-[4vh] rounded-xl bg-gray-200 flex justify-start items-center px-3 text-sm"
                    whileHover={{ backgroundColor: "#60a5fa" }}
                  >
                    <ion-icon name="laptop" size="small"></ion-icon>
                    <p className="ml-1">Devices</p>
                  </motion.div>
                  <motion.div
                    className="mt-2 w-[18vh] h-[4vh] rounded-xl bg-gray-200 flex justify-start items-center px-3 text-sm"
                    whileHover={{ backgroundColor: "#60a5fa" }}
                  >
                    <ion-icon name="hammer" size="small"></ion-icon>
                    <p className="ml-1">System Settings</p>
                  </motion.div>
                </div>
              </div>
              <div className="mt-5 px-4">
                <div className="text-2xl text-black">General</div>
              </div>
            </div>
          </Draggable>
        </>
      )}
      <div className="flex justify-center items-center">
        <div className="bg-gray-300/50 w-7/12 min-h-[4.5rem] rounded-2xl backdrop-blur-xl">
          <div className="flex justify-center items-center pt-2">
            <div className="flex justify-center items-center flex-row">
              <div
                className={`flex justify-center items-center flex-col ${
                  finder === false && "mb-2"
                }`}
              >
                <motion.img
                  src={icons.finder}
                  className="w-[3.1rem] h-[3.1rem] mx-2"
                  whileHover={{ scale: 1.25 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={triggerFinder}
                />
                {finder && (
                  <div className="px-1 py-1 bg-gray-300/80 rounded-full"></div>
                )}
              </div>
              <div
                className={`flex justify-center items-center flex-col ${
                  settings === false && "mb-2"
                }`}
              >
                <motion.img
                  src={icons.settings}
                  className="h-[3.27rem] w-[3.27rem] rounded-lg mx-2"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleSettings()}
                />
                {settings && (
                  <div className="px-1 py-1 bg-gray-300/80 rounded-full"></div>
                )}
              </div>
              <div
                className={`flex justify-center items-center flex-col ${
                  emailWidget === false && "mb-3"
                }`}
              >
                <motion.img
                  src={icons.gmail}
                  className="w-12 h-12 rounded-lg mx-2"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    triggerEmailWidget();
                  }}
                />
                {emailWidget === true && (
                  <div className="px-1 py-1 bg-gray-300/80 rounded-full mt-1"></div>
                )}
              </div>
              <div className="flex justify-center items-center flex-col">
                <motion.img
                  src={icons.folder}
                  className={`w-[2.7rem] h-[2.7rem] bg-white px-1 py-1 rounded-lg mx-2 ${
                    projects === false && "mb-3"
                  }`}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (finder === true) {
                      triggerProjects();
                    }
                  }}
                />
                {projects === true && (
                  <div className="px-1 py-1 bg-gray-300/80 rounded-full mt-1"></div>
                )}
              </div>
            </div>
            <div className="rotate-90 border border-gray-300/30 w-[3rem] mb-1.5" />

            <div className="flex justify-center items-center flex-col mb-3">
              <motion.img
                src={icons.photoshop}
                className="w-10 h-10 mx-2"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              />
            </div>
            <div className="flex justify-center items-center flex-col mb-3">
              <motion.img
                src={icons.ae}
                className="w-10 h-10 rounded-lg mx-2"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              />
            </div>
            <div
              className={`flex justify-center items-center flex-col ${
                spotifyWidget === false && "mb-3"
              }`}
            >
              <motion.img
                src={icons.spotify}
                className="w-10 h-10 mx-2 rounded-lg"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleSpotfiy()}
              />
              {spotifyWidget && (
                <div className="px-1 py-1 bg-gray-300/80 rounded-full mt-1"></div>
              )}
            </div>
            <div
              className={`flex justify-center items-center flex-col ${
                weatherWidget === false && "mb-3"
              }`}
            >
              <motion.img
                src={icons.weather}
                className="h-10 rounded-lg mx-2"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleWeather()}
              />
              {weatherWidget && (
                <div className="px-1 py-1 bg-gray-300/80 rounded-full mt-1"></div>
              )}
            </div>
            <div className="flex justify-center items-center flex-col mb-3">
              <motion.img
                src={icons.word}
                className="w-10 h-10 bg-white px-1 py-1 rounded-lg mx-2"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              />
            </div>
            <div className="flex justify-center items-center flex-col mb-3">
              <motion.img
                src={icons.powerpoint}
                className="w-10 h-10 bg-white px-1 py-1 rounded-lg mx-2"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              />
            </div>
            <div className="flex justify-center items-center flex-col mb-3">
              <motion.img
                src={icons.excel}
                className="h-10 bg-white px-1 py-1 rounded-lg mx-2"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              />
            </div>
            <div className="flex justify-center items-center flex-col mb-3">
              <motion.img
                src={icons.vscode}
                className="w-10 h-10 bg-white px-1 py-1 rounded-lg mx-2"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              />
            </div>
            <div
              className={`flex justify-center items-center flex-col ${
                githubBrowser === false && "mb-3"
              }`}
            >
              <motion.img
                src={icons.github}
                className="w-10 h-10 bg-white px-1 py-1 rounded-lg mx-2"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open(github, "_blank")}
              />
              {githubBrowser && (
                <div className="px-1 py-1 bg-gray-300/80 rounded-full mt-1"></div>
              )}
            </div>
            <div
              className={`flex justify-center items-center flex-col ${
                twitterBrowser === false && "mb-3"
              }`}
            >
              <motion.img
                src={icons.X}
                className="w-10 h-10 bg-white px-1 py-1 rounded-lg mx-2"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open(X, "_blank")}
              />
              {twitterBrowser && (
                <div className="px-1 py-1 bg-gray-300/80 rounded-full mt-1"></div>
              )}
            </div>
            <div className="flex justify-center items-center flex-col mb-3">
              <motion.img
                src={icons.notion}
                className="w-10 h-10 mx-2"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              />
            </div>
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
