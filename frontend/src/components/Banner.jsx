import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-gradient-to-r from-[#2F9650] to-[#126A9C] rounded-2xl shadow-lg overflow-visible mt-16 max-w-7xl mx-auto px-6 sm:px-10 md:px-16 py-12 md:py-20 flex flex-col md:flex-row items-center justify-between text-white">
      {/* ✅ Left Section: Text + Button (animiert von unten) */}
      <motion.div
        className="relative z-10 md:w-1/2 text-center md:text-left flex flex-col gap-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
          Join Our Community Today!
        </h1>
        <p className="text-sm sm:text-base font-light max-w-md mx-auto md:mx-0">
          Sign up now and connect with trusted healthcare professionals
          instantly.
        </p>
        <button
          onClick={() => navigate("/login?mode=signup")}
          className="w-full max-w-[260px] bg-white text-[#126A9C] font-medium px-10 py-3 rounded-full shadow-md hover:scale-105 transition-all duration-300 mx-auto md:mx-0"
        >
          Create Account
        </button>
      </motion.div>

      {/* ✅ Placeholder für rechte Hälfte (Layout bleibt stabil) */}
      {/* <div className="md:w-1/2 h-[260px] sm:h-[300px] md:h-[340px] lg:h-[420px]"></div> */}

      {/* ✅ Right Section: Ärztin-Bild animiert von rechts */}
      <motion.img
        src={assets.banner_img}
        alt="Doctor"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute bottom-0 right-10 h-[220px] sm:h-[280px] md:h-[340px] lg:h-[420px] object-contain pointer-events-none"
      />
    </div>
  );
};

export default Banner;
