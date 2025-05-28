import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext);
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) getAppointments();
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium text-gray-800">All Appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.3fr_1.5fr_1fr_0.8fr_2fr_1fr_1.2fr] py-3 px-4 border-b text-[#126A9C] text-xs font-semibold sticky top-0 bg-white z-10">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap justify-between sm:grid sm:grid-cols-[0.3fr_1.5fr_1fr_0.8fr_2fr_1fr_1.2fr] items-center text-gray-700 py-3 px-4 border-b hover:bg-gray-50 text-xs gap-y-2"
          >
            <p className="max-sm:hidden">{index + 1}</p>

            <div className="flex items-center gap-2">
              <img src={item.userData.image} className="w-7 h-7 rounded-full object-cover" alt="Patient" />
              <p className="font-medium">{item.userData.name}</p>
            </div>

            <p>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.payment ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                {item.payment ? 'Online' : 'Cash'}
              </span>
            </p>

            <p className="max-sm:hidden">
              {item.userData.dob ? calculateAge(item.userData.dob) : 'N/A'}
            </p>

            <p>
              {slotDateFormat(item.slotDate)}, <span className="text-gray-500">{item.slotTime}</span>
            </p>

            <p>{currency}{item.amount}</p>

            {item.cancelled ? (
              <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium">Cancelled</span>
            ) : item.isCompleted ? (
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Completed</span>
            ) : (
              <div className="flex gap-1">
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
  );
};

export default DoctorAppointments;
