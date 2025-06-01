import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="my-16">
      <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col items-center gap-6 text-[#262626]">
        <h1 className="text-3xl font-semibold text-[#126A9C]">
          Top Doctors to Book
        </h1>
        <p className="sm:w-2/3 text-center text-gray-600 text-sm">
          Simply browse through our extensive list of trusted doctors.
        </p>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-8">
          {doctors.slice(0, 10).map((item, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                scrollTo(0, 0);
              }}
              className="bg-white shadow-lg hover:shadow-xl rounded-2xl overflow-hidden cursor-pointer 
                         transition transform hover:-translate-y-2 duration-300"
            >
              <img
                className="w-full bg-gray-100 rounded-2xl shadow-md object-contain h-64 p-4"
                src={item.image}
                alt={item.name}
              />
              <div className="p-4 text-center">
                <div
                  className={`flex items-center justify-center gap-2 text-sm mb-2 ${
                    item.available ? "text-[#2F9650]" : "text-gray-500"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.available ? "bg-[#2F9650]" : "bg-gray-500"
                    }`}
                  ></span>
                  <span>{item.available ? "Available" : "Not Available"}</span>
                </div>
                <p className="text-lg font-semibold text-[#262626]">
                  {item.name}
                </p>
                <p className="text-gray-500 text-sm capitalize">
                  {item.speciality}
                </p>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            navigate("/doctors");
            scrollTo(0, 0);
          }}
          className="bg-gradient-to-r from-[#126A9C] to-[#2F9650] text-white px-12 py-3 rounded-full mt-10 
                     hover:scale-105 hover:shadow-lg transition-transform duration-300"
        >
          View More Doctors
        </button>
      </div>
    </div>
  );
};

export default TopDoctors;
