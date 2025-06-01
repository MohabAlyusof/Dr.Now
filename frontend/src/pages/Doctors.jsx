import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div className="px-6 md:px-16 max-w-7xl mx-auto text-[#262626]">
      <h2 className="text-center text-2xl pt-10 text-[#707070]">
        Browse Through Our{" "}
        <span className="text-gray-700 font-semibold">Doctors</span>
      </h2>

      <div className="flex flex-col sm:flex-row items-start gap-5 mt-10">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`py-2 px-4 border rounded-xl text-sm shadow-md transition-all sm:hidden ${
            showFilter ? "bg-[#126A9C] text-white" : "bg-white text-gray-700"
          }`}
        >
          Filters
        </button>
        <div
          className={`flex-col gap-4 text-sm text-gray-600 ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
        >
          {[
            "General physician",
            "Gynecologist",
            "Dermatologist",
            "Pediatricians",
            "Neurologist",
            "Gastroenterologist",
          ].map((spec, index) => (
            <p
              key={index}
              onClick={() =>
                speciality === spec
                  ? navigate("/doctors")
                  : navigate(`/doctors/${spec}`)
              }
              className={`w-[94vw] sm:w-auto pl-3 py-2 pr-16 border border-gray-300 rounded-xl shadow-sm cursor-pointer transition-all hover:bg-[#f0f4ff] ${
                speciality === spec
                  ? "bg-[#E2E5FF] text-black font-semibold"
                  : ""
              }`}
            >
              {spec}
            </p>
          ))}
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filterDoc.map((item, index) => (
            <motion.div
              key={index}
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                scrollTo(0, 0);
              }}
              className="border border-[#C9D8FF] rounded-2xl shadow-lg overflow-hidden cursor-pointer bg-white hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <img
                className="bg-[#EAEFFF] w-full h-56 object-cover"
                src={item.image}
                alt={item.name}
              />
              <div className="p-4 space-y-2">
                <div
                  className={`flex items-center gap-2 text-sm ${
                    item.available ? "text-green-500" : "text-gray-500"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.available ? "bg-green-500" : "bg-gray-500"
                    }`}
                  ></span>
                  <span>{item.available ? "Available" : "Not Available"}</span>
                </div>
                <p className="text-[#262626] text-lg font-semibold">
                  {item.name}
                </p>
                <p className="text-[#5C5C5C] text-sm">{item.speciality}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
