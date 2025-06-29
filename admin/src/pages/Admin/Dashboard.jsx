import React, { useContext, useEffect } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } =
    useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="px-4 sm:px-6 py-6 bg-[#F8F9FD] min-h-screen">
        <div className="flex flex-wrap gap-6 mb-8">
          {[
            {
              label: "Doctors",
              value: dashData.doctors,
              icon: assets.doctor_icon,
            },
            {
              label: "Appointments",
              value: dashData.appointments,
              icon: assets.appointments_icon,
            },
            {
              label: "Patients",
              value: dashData.patients,
              icon: assets.patients_icon,
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 bg-white text-primary p-5 rounded-xl min-w-56 border border-gray-100 shadow-sm hover:shadow-md transition-all"
            >
              <img className="w-14" src={stat.icon} alt={stat.label} />
              <div>
                <p className="text-xl font-semibold">{stat.value}</p>
                <p className="text-sm text-primary">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="flex items-center gap-2.5 px-6 py-4 bg-[#F1F4F9] border-b">
            <img src={assets.list_icon} alt="list" />
            <p className="text-base font-semibold text-primary">
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
                  src={item.docData.image}
                  alt=""
                />
                <div className="flex-1 text-sm">
                  <p className="text-primary font-medium">
                    {item.docData.name}
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
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className="w-6 cursor-pointer hover:scale-105 transition-transform"
                    src={assets.cancel_icon}
                    alt="Cancel"
                    title="Cancel Appointment"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
