import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./landing.css";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-wrapper d-flex flex-column justify-content-center align-items-center vh-100 position-relative">

      {/* Background Text */}
      <div className="position-absolute w-100 h-100 z-0 opacity-10">
        {[...Array(60)].map((_, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: "1.2rem",
              opacity: 0.05,
              userSelect: "none",
              whiteSpace: "nowrap",
              color: "var(--text-white)",
            }}
          >
            {["note", "link", "vibe", "create", "dream"][i % 5]}
          </span>
        ))}
      </div>

      {/* Main Content */}
      <motion.h1
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="landing-title display-4 fw-bold text-center z-1"
      >
        Welcome to Your Digital Locker Room
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="landing-subtitle lead mt-3 text-center px-3 z-1"
      >
        Store your chaos — from songs to sticky notes — all in one place.
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="enter-btn btn mt-4 px-4 py-2 shadow z-1"
        onClick={() => navigate("/locker")}
      >
        Enter Locker 🚀
      </motion.button>
    </div>
  );
}

export default LandingPage;
