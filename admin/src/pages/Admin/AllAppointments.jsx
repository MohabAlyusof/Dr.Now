import React, { useEffect, useContext } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";

const AllAppointments = () => {
  const { aToken, appointments, cancelAppointment, getAllAppointments } =
    useContext(AdminContext);
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="px-4 py-4 w-full bg-[#F8F9FD] min-h-screen">
      <p className="text-3xl font-semibold text-primary mb-4">
        All Appointments
      </p>

      <div className="bg-white border rounded-xl shadow-sm text-sm max-h-[80vh] overflow-y-auto">
        <div
          className="hidden sm:grid grid-cols-[0.5fr_1fr_1fr_2fr_1.5fr_1fr_1fr]
                        py-3 px-4 bg-gray-100 text-primary text-lg font-medium border-b
                        sticky top-0 z-10"
        >
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {appointments.length === 0 && (
          <p className="text-center py-10 text-primary">
            No appointments found.
          </p>
        )}

        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap justify-between items-start sm:grid sm:grid-cols-[0.5fr_1fr_1fr_2fr_1.5fr_1fr_1fr]
                       gap-y-2 px-4 py-3 border-b text-gray-600 hover:bg-gray-50 transition-all"
          >
            <p className="max-sm:hidden">{index + 1}</p>

            <div>
              <p className="sm:hidden text-xs text-primary">Patient:</p>
              <div className="flex items-center gap-2">
                <img
                  src={item.userData.image}
                  className="w-8 h-8 rounded-full object-cover"
                  alt="Patient"
                />
                <p className="font-medium text-primary">{item.userData.name}</p>
              </div>
            </div>

            <div className="max-sm:hidden">
              {calculateAge(item.userData.dob)}
            </div>

            <div>
              <p className="sm:hidden text-xs text-primary">Date & Time:</p>
              <p>
                {slotDateFormat(item.slotDate)},{" "}
                <span className="text-gray-500">{item.slotTime}</span>
              </p>
            </div>

            <div>
              <p className="sm:hidden text-xs text-primary">Doctor:</p>
              <div className="flex items-center gap-2">
                <img
                  src={item.docData.image}
                  className="w-8 h-8 rounded-full object-cover bg-gray-100"
                  alt="Doctor"
                />
                <p>{item.docData.name}</p>
              </div>
            </div>

            <div>
              <p className="sm:hidden text-xs text-primary">Fees:</p>
              <p className="text-gray-700">
                {currency}
                {item.amount}
              </p>
            </div>

            <div>
              {item.cancelled ? (
                <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs">
                  Cancelled
                </span>
              ) : item.isCompleted ? (
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                  Completed
                </span>
              ) : (
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className="w-6 cursor-pointer hover:scale-105 transition-transform"
                  src={assets.cancel_icon}
                  alt="Cancel"
                  title="Cancel Appointment"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;
