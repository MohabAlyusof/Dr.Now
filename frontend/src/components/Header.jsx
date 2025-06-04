import React from "react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="pt-6 mb-12">
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 items-center bg-gradient-to-r from-[#126A9C] to-[#2F9650] text-white rounded-3xl shadow-lg overflow-hidden">

        {/* Left: Text */}
        <motion.div
          className="flex flex-col gap-6 text-center md:text-left py-8 md:py-14 px-4 md:px-6 lg:px-8 z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold leading-tight">
            Book with Trusted <br /> Healthcare Professionals
          </h1>
          <p className="text-base text-white/90 leading-relaxed max-w-md mx-auto md:mx-0">
            Explore our certified doctor network and book your appointment easily — comfort, trust, and care in every visit.
          </p>
          <button
            onClick={() => navigate("/doctors")}
            className="w-fit bg-white text-[#126A9C] px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition mx-auto md:mx-0"
          >
            Book Appointment
          </button>
        </motion.div>

        {/* Right: Image */}
        <motion.div
          className="relative flex justify-center items-end h-full min-h-[240px] md:min-h-[320px] lg:min-h-[420px] overflow-hidden"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={assets.header_img}
            alt="Doctor Team"
            className="h-full w-auto max-h-[480px] md:max-h-[540px] lg:max-h-[600px] object-contain object-bottom"
          />
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
