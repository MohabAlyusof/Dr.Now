import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorDashboard = () => {
  const {
    dToken,
    dashData,
    getDashData,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContext);
  const { slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) getDashData();
  }, [dToken]);

  return (
    dashData && (
      <div className="px-4 sm:px-6 py-6 bg-[#F8F9FD] min-h-screen">
        <div className="flex flex-wrap gap-6 mb-8">
          {[
            {
              icon: assets.earning_icon,
              label: "Earnings",
              value: `${currency} ${dashData.earnings}`,
            },
            {
              icon: assets.appointments_icon,
              label: "Appointments",
              value: dashData.appointments,
            },
            {
              icon: assets.patients_icon,
              label: "Patients",
              value: dashData.patients,
            },
          ].map((card, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-white text-gray-800 p-5 rounded-xl min-w-56 border border-gray-100 shadow-sm hover:shadow-md transition-all"
            >
              <img className="w-14" src={card.icon} alt={card.label} />
              <div>
                <p className="text-xl font-semibold">{card.value}</p>
                <p className="text-sm text-gray-500">{card.label}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="flex items-center gap-2.5 px-6 py-4 bg-[#F1F4F9] border-b">
            <img src={assets.list_icon} alt="list" />
            <p className="text-base font-semibold text-gray-700">
              Latest Bookings
            </p>
          </div>

          <div className="divide-y">
            {dashData.latestAppointments.slice(0, 5).map((item, index) => (
              <div
                key={index}
                className="flex items-center px-6 py-4 gap-4 hover:bg-gray-50 transition-all"
              >
                <img
                  className="rounded-full w-10 h-10 object-cover"
                  src={item.userData.image}
                  alt="user"
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">
                    {item.userData.name}
                  </p>
                  <p className="text-gray-500">
                    Booking on {slotDateFormat(item.slotDate)}
                  </p>
                </div>

                {item.cancelled ? (
                  <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium">
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    Completed
                  </span>
                ) : (
                  <div className="flex items-center gap-2">
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className="w-6 cursor-pointer hover:scale-105 transition-transform"
                      src={assets.cancel_icon}
                      alt="Cancel"
                      title="Cancel Appointment"
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      className="w-6 cursor-pointer hover:scale-105 transition-transform"
                      src={assets.tick_icon}
                      alt="Complete"
                      title="Mark as Completed"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
