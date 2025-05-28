import React from "react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-10 mb-16">
      <div
        className="relative max-w-7xl mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center justify-between 
                   bg-gradient-to-l from-[#2F9650] to-[#126A9C] 
                   rounded-2xl text-white py-10 md:py-14 shadow-lg overflow-visible"
      >
        {/* ✅ Left Section (Text + Button) */}
        <motion.div
          className="relative z-10 md:w-1/2 flex flex-col gap-6 text-center md:text-left"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            Book Appointment <br /> With Trusted Doctors
          </h1>
          <p className="text-sm font-light">
            Simply browse through our extensive list of trusted doctors and
            schedule your <br /> appointment hassle-free.
          </p>
          <button
            onClick={() => navigate("/doctors")}
            className="w-full max-w-[240px] bg-white text-gray-700 px-8 py-3 rounded-full 
                       hover:scale-105 hover:shadow-xl transition-all duration-300 mx-auto md:mx-0"
          >
            Book Appointment
          </button>
        </motion.div>

        {/* ✅ Spacer to preserve layout balance */}
        <div className="md:w-1/2 h-[180px] sm:h-[240px] md:h-[320px] lg:h-[400px]"></div>

        {/* ✅ Image (absolute, animated) */}
        <motion.img
          src={assets.header_img}
          alt="Trusted Doctors"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute bottom-0 right-0 sm:right-0 md:right-10 h-[180px] sm:h-[240px] md:h-[320px] lg:h-[400px] object-contain object-bottom pointer-events-none"
        />
      </div>
    </div>
  );
};

export default Header;
