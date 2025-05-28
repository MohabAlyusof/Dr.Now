import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorsList = () => {
  const { doctors, changeAvailability, aToken, getAllDoctors } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="px-6 py-6 bg-[#F8F9FD] min-h-screen overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-700 mb-6">All Doctors</h1>

      <div className="w-full flex flex-wrap gap-6">
        {doctors.map((item, index) => (
          <div
            key={index}
            className="border border-[#C9D8FF] rounded-xl max-w-xs w-full bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer group"
          >
            <img
              className="w-full h-64 object-contain bg-[#EAEFFF] group-hover:bg-[#126A9C] transition-all duration-300"
              src={item.image}
              alt={item.name}
            />
            <div className="p-4">
              <p className="text-[#262626] text-lg font-semibold mb-1">{item.name}</p>
              <p className="text-[#5C5C5C] text-sm">{item.speciality}</p>
              <div className="mt-3 flex items-center gap-2 text-sm">
                <input
                  onChange={() => changeAvailability(item._id)}
                  type="checkbox"
                  checked={item.available}
                  className="accent-[#126A9C] scale-110"
                />
                <p className="text-gray-600">Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
