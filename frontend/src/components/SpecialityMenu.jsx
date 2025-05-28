import React from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const SpecialityMenu = () => {
  return (
    <div id="speciality" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col items-center gap-8 text-[#262626]">
        <h1 className="text-3xl font-semibold text-[#126A9C]">Find by Speciality</h1>
        <p className="sm:w-2/3 text-center text-gray-600 text-sm leading-relaxed">
          Simply browse through our extensive list of trusted doctors and schedule your appointment hassle-free.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pt-8 w-full">
          {specialityData.map((item, index) => (
            <motion.div
              whileHover={{ y: -10, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              key={index}
            >
              <Link
                to={`/doctors/${item.speciality}`}
                onClick={() => scrollTo(0, 0)}
                className="flex flex-col justify-center items-center bg-white rounded-2xl shadow-lg p-6 h-48 w-full 
                           hover:shadow-2xl transition-all duration-300"
              >
                <img 
                  className="w-full h-full object-contain mb-3" 
                  src={item.image} 
                  alt={item.speciality} 
                />
                <p className="text-sm font-medium text-gray-700 capitalize text-center mt-2">
                  {item.speciality}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialityMenu;
