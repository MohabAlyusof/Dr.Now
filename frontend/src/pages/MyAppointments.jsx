import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import {assets} from "../assets/assets";
import AppVideoCall from "../components/AppVideoCall";
import { motion } from "framer-motion";

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [tokenRTC, setTokenRTC] = useState(null);
  const [channel, setChannel] = useState("");
  const [uid, setUid] = useState("");

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return `${dateArray[0]} ${months[Number(dateArray[1]) - 1]} ${
      dateArray[2]
    }`;
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      });
      setAppointments([...data.appointments].reverse());
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/complete-appointment`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const appointmentStripe = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-stripe`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        window.location.replace(data.session_url);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAgoraToken = async (channelParam, uidParam) => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/agora/rtc-token?channel=${channelParam}&uid=${uidParam}`,
        { headers: { token } }
      );
      return data.token || null;
    } catch (error) {
      toast.error("Failed to get video token.");
      return null;
    }
  };

const startVideoSession = async (item) => {
const uidValue = `user-${item._id}`;

console.log("🎫 [Patient] Joining video call with:");
console.log("📡 Channel:", item.channel);
console.log("🆔 UID:", `user-${item._id}`);

  setUid(uidValue);
  setChannel(item.channel); 
  const videoToken = await getAgoraToken(item.channel, uidValue);
  if (videoToken) {
    setTokenRTC(videoToken);
  } else {
    toast.error("Unable to start video session.");
  }
};




  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className="px-6 md:px-16 max-w-7xl mx-auto text-[#262626]">
      <p className="pb-3 mt-12 text-2xl font-semibold text-center text-gray-700 border-b">
        My Appointments
      </p>

      <div className="grid gap-6 mt-8">
        {appointments.map((item, index) => (
          <motion.div
            key={index}
            className="flex flex-col sm:flex-row gap-6 p-6 border rounded-2xl shadow-lg bg-white hover:shadow-2xl transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <img
              className="w-full sm:w-36 h-36 object-cover rounded-xl bg-[#EAEFFF]"
              src={item.docData.image}
              alt=""
            />
            <div className="flex-1 text-sm text-gray-600 space-y-2">
              <p className="text-[#262626] text-xl font-semibold">
                {item.docData.name}
              </p>
              <p>{item.docData.speciality}</p>
              <div>
                <p className="text-[#464646] font-medium mt-1">Address:</p>
                <p>{item.docData.address.line1}</p>
                <p>{item.docData.address.line2}</p>
              </div>
              <p className="mt-2">
                <span className="font-medium text-gray-800">Date & Time:</span>{" "}
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>

            <div className="flex flex-col gap-2 justify-center text-sm text-center">
              {!item.cancelled && !item.payment && !item.isCompleted && (
                <button
                  onClick={() => appointmentStripe(item._id)}
                  className="py-2 px-4 border rounded-full text-gray-700 hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Pay Online
                </button>
              )}

              {!item.cancelled && item.payment && !item.isCompleted && (
                <>
                  <button
                    onClick={() => startVideoSession(item)}
                    className="py-2 px-4 border rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300"
                  >
                    Start Video Call
                  </button>
                  <button className="py-2 px-4 border rounded-full text-green-600 border-green-500 bg-green-50">
                    Paid
                  </button>
                </>
              )}

              {item.isCompleted && (
                  <button
                  onClick={() => completeAppointment(item._id)}
                  className="text-green-600 border border-green-500 px-2 py-1 rounded hover:bg-green-100 text-xs"
                >
                  Complete
                </button>
              )}

              {!item.cancelled && !item.isCompleted && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="py-2 px-4 border rounded-full text-red-600 border-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
                >
                  Cancel Appointment
                </button>
              )}

              {item.cancelled && !item.isCompleted && (
                <button className="py-2 px-4 border border-red-500 rounded-full text-red-600 bg-red-50">
                  Appointment Cancelled
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

{tokenRTC && (
  <motion.div
    className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="relative bg-white p-6 sm:p-8 rounded-2xl shadow-2xl text-center max-w-3xl w-full flex flex-col items-center"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <AppVideoCall
        channel={channel}
        token={tokenRTC}
        uid={uid}
        onClose={() => setTokenRTC(null)}
      />

      <button
        onClick={() => setTokenRTC(null)}
        className="absolute top-4 right-4 bg-red-600 text-white p-3 rounded-full shadow-md hover:bg-red-700 transition"
        title="End Call"
      >
        ✕
      </button>
    </motion.div>
  </motion.div>
)}

    </div>
  );
};

export default MyAppointments;