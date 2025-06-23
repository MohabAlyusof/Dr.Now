import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import AppVideoCall from "../../components/AppVideoCall";

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    cancelAppointment,
    completeAppointment,
    doctor,
  } = useContext(DoctorContext);
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext);

  const [videoSession, setVideoSession] = useState({
    channel: "",
    uid: "",
    token: "",
  });

  useEffect(() => {
    if (dToken) getAppointments();
  }, [dToken]);

  const startVideoCall = async (item) => {
    const uidValue = `doctor-${item._id}`;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/agora/rtc-token?channel=${
          item.channel
        }&uid=${uidValue}`,
        { headers: { token: dToken } }
      );
      const data = await res.json();
      if (data.success) {
        console.log("🎫 [Doctor] Joining video call with:");
        console.log("📡 Channel:", item.channel);
        console.log("🆔 UID:", `doctor-${item._id}`);

        setVideoSession({
          channel: item.channel,
          uid: uidValue,
          token: data.token,
        });
      }
    } catch (err) {
      console.error("Error starting video call:", err);
    }
  };

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-2xl font-medium text-primary">All Appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.3fr_1.5fr_1fr_0.8fr_2fr_1fr_1.2fr] py-3 px-4 border-b text-[#126A9C] text-lg font-semibold sticky top-0 bg-white z-10">
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
              <img
                src={item.userData.image}
                className="w-7 h-7 rounded-full object-cover"
                alt="Patient"
              />
              <p className="font-medium text-primary">{item.userData.name}</p>
            </div>

            <p>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.payment
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {item.payment ? "Paid" : "Online"}
              </span>
            </p>

            <p className="max-sm:hidden">
              {item.userData.dob ? calculateAge(item.userData.dob) : "N/A"}
            </p>

            <p>
              {slotDateFormat(item.slotDate)},{" "}
              <span className="text-gray-500">{item.slotTime}</span>
            </p>

            <p>
              {currency}
              {item.amount}
            </p>

            {item.cancelled ? (
              <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium">
                Cancelled
              </span>
            ) : item.isCompleted ? (
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                Completed
              </span>
            ) : (
              <div className="flex flex-col gap-1">
                {item.payment && item.channel && (
                  <button
                    onClick={() => startVideoCall(item)}
                    className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 text-xs"
                  >
                    Start Video Call
                  </button>
                )}
                <button
                  onClick={() => completeAppointment(item._id)}
                  className="text-green-600 border border-green-500 px-2 py-1 rounded hover:bg-green-100 text-xs"
                >
                  Complete
                </button>
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="text-red-600 border border-red-500 px-2 py-1 rounded hover:bg-red-100 text-xs"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {videoSession.token && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="relative bg-white p-6 sm:p-8 rounded-2xl shadow-2xl text-center max-w-3xl w-full flex flex-col items-center">
            <AppVideoCall
              channel={videoSession.channel}
              uid={videoSession.uid}
              token={videoSession.token}
              onClose={() =>
                setVideoSession({ channel: "", uid: "", token: "" })
              }
            />
            <button
              onClick={() =>
                setVideoSession({ channel: "", uid: "", token: "" })
              }
              className="absolute top-4 right-4 bg-red-600 text-white p-3 rounded-full shadow-md hover:bg-red-700 transition"
              title="End Call"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorAppointments;
