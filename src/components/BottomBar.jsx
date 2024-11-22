import React, { useState } from "react";
import icons from "../constants/index";
import { motion, AnimatePresence } from "framer-motion";

function BottomBar() {
  const [showToast, setShowToast] = useState(false);
  const [copied, setCopied] = useState(false);
  const [openGame, setGame] = useState(false);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(board);
  const email = "adrian.hassan.ef@gmail.com";
  const github = "https://github.com/adrian-on-github";

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

  const triggerGame = () => {
    setGame((prevGame) => !prevGame);
  };

  // Function to handle a square click
  const handleSquareClick = (index) => {
    if (board[index] || winner) return; // Ignore if square is already filled or game is over

    const newBoard = board.slice(); // Copy the board state
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  // Function to reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <>
      {openGame === true && (
        <div className="flex justify-center items-center">
          <div className="bg-purple-200/70 w-[27%] min-h-[50vh] rounded-lg mb-[29vh]">
            <div className="px-4 py-3 flex items-start justify-start gap-2">
              <Green />
              <Yellow />
              <Red />
            </div>
            <div className="flex flex-col my-[3vh] items-center justify-center px-4 py-2">
              <h1 className="text-3xl font-bold text-white mb-6">
                Tic Tac Toe
              </h1>
              <Board board={board} onClick={handleSquareClick} />
              {winner && (
                <p className="text-xl font-semibold text-green-500 mt-4">
                  {winner} Wins!
                </p>
              )}
              {!winner && !board.includes(null) && (
                <p className="text-xl font-semibold text-yellow-500 mt-4">
                  It’s a Draw!
                </p>
              )}
              <button
                onClick={resetGame}
                className="mt-6 px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600"
              >
                Reset Game
              </button>
              <div className=""></div>
            </div>
          </div>
        </div>
      )}
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
              src={icons.vscode}
              className="w-9 h-9"
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.95 }}
            />
            <motion.img
              src={icons.tictactoe}
              className="w-9 h-9"
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => triggerGame()}
            />
            <motion.img
              src={icons.github}
              className="w-9 h-9"
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open(github, "_blank")}
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
    </>
  );
}

function Board({ board, onClick }) {
  return (
    <div className="grid grid-cols-3 gap-2 w-64">
      {board.map((value, index) => (
        <Square key={index} value={value} onClick={() => onClick(index)} />
      ))}
    </div>
  );
}

function Square({ value, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-20 h-20 text-2xl font-bold flex items-center justify-center bg-white border border-gray-400 rounded-md hover:bg-gray-200 focus:outline-none"
    >
      {value}
    </button>
  );
}

// Helper function to check for a winner
function calculateWinner(board) {
  const lines = [
    [0, 1, 2], // Rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diagonals
    [2, 4, 6],
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // Return "X" or "O"
    }
  }
  return null;
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
      onClick={() => triggerGame()}
    ></motion.div>
  );
}

export default BottomBar;
