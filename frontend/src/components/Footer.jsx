import React from 'react';
import { assets } from '../assets/assets';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-16">
      <div className="max-w-7xl mx-auto bg-gradient-to-r from-[#0D1B2A] to-[#126A9C] text-gray-100 
                      py-4 px-6 md:px-16 rounded-t-3xl rounded-b-3xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-4">
          <div className="md:col-span-5">
            <img className="mb-3 w-32" src={assets.logo} alt="Logo" />
            <p className="text-sm mb-3 italic opacity-80">Your Trusted Health Partner</p>
            <p className="leading-relaxed text-sm opacity-90">
              An integrated platform that allows you to easily and securely connect with doctors through live video sessions. 
              We offer appointment booking, secure online payments, and reminders, fully committed to protecting your data.
            </p>
          </div>
          <div className="md:col-span-2 md:col-start-7 pt-6">
            <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-[#2F9650] hover:underline transition cursor-pointer">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="hover:text-[#2F9650] hover:underline transition cursor-pointer">
                  Doctors
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#2F9650] hover:underline transition cursor-pointer">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#2F9650] hover:underline transition cursor-pointer">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-2 md:col-start-10 pt-6">
            <h3 className="text-lg font-semibold text-white mb-3">Get In Touch</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li className="flex items-center gap-2">
                <FaPhoneAlt className="text-[#2F9650]" /> +49 1575 6910542
              </li>
              <li className="flex items-center gap-1">
                <FaEnvelope className="text-[#2F9650]" />
                <a href="mailto:Dr.Now2025@gmail.com" className="hover:text-white hover:underline">
                  Dr.Now2025@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-[#2F9650]" /> Berlin, Germany
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-4 border-t border-gray-200 pt-3 text-center text-gray-200 text-sm opacity-80">
          © 2025 Dr.Now.com - All Rights Reserved.
        </div>
      </div>
      <div className="h-4"></div>
    </footer>
  );
};

export default Footer;