import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext);
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const [docInfo, setDocInfo] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [docSlots, setDocSlots] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const navigate = useNavigate();
  const today = new Date();
  const currentDate = today.getDate();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startDay = new Date(currentYear, currentMonth, 1).getDay();

  const timeSlots = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? '00' : '30';
    return `${hour.toString().padStart(2, '0')}:${minute}`;
  });

  const fetchDocInfo = () => {
    const info = doctors.find((doc) => doc._id === docId);
    setDocInfo(info);
  };

  const getAvailableSlots = () => {
    if (!docInfo) return;
    const allSlots = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const slotDateKey = `${day}_${currentMonth + 1}_${currentYear}`;
      const bookedTimes = docInfo.slots_booked[slotDateKey] || [];
      const slotsForDay = timeSlots.filter(time => !bookedTimes.includes(time));
      allSlots.push({ day, slots: slotsForDay });
    }

    setDocSlots(allSlots);
  };

  const handleMonthChange = (direction) => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
    setSelectedDay(null);
    setSelectedTime('');
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warning('Login to book appointment');
      return navigate('/login');
    }

    try {
      const slotDate = `${selectedDay}_${currentMonth + 1}_${currentYear}`;
      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime: selectedTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctosData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (doctors.length > 0) {
      fetchDocInfo();
    }
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo, currentMonth, currentYear]);

  return docInfo ? (
    <div className="max-w-7xl mx-auto p-4">
      {/* Doctor Details */}
      <motion.div 
        className="flex flex-col sm:flex-row gap-6 items-center mt-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img className="bg-primary w-full sm:max-w-72 rounded-2xl shadow-lg object-cover" src={docInfo.image} alt="" />
        
        <div className="flex-1 border border-gray-200 rounded-2xl p-8 bg-white shadow-md">
          <p className="flex items-center gap-2 text-3xl font-semibold text-gray-700">
            {docInfo.name}
            <img className="w-5" src={assets.verified_icon} alt="Verified" />
          </p>
          <div className="flex items-center gap-2 mt-2 text-gray-600">
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <span className="py-1 px-3 border text-xs rounded-full bg-gray-100">{docInfo.experience}</span>
          </div>
          <div className="mt-4">
            <p className="flex items-center gap-1 text-sm font-medium text-[#262626]">
              About <img className="w-3" src={assets.info_icon} alt="Info" />
            </p>
            <p className="text-sm text-gray-600 mt-2">{docInfo.about}</p>
          </div>
          <p className="text-gray-600 font-medium mt-4">
            Appointment fee: <span className="text-gray-800">{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </motion.div>

      {/* Calendar Controls */}
      <div className="flex justify-between items-center my-8">
        <button 
          onClick={() => handleMonthChange('prev')} 
          className="px-4 py-2 border rounded-xl hover:bg-gray-100 transition"
        >
          Previous
        </button>
        <h3 className="text-xl font-semibold">
          {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
        </h3>
        <button 
          onClick={() => handleMonthChange('next')} 
          className="px-4 py-2 border rounded-xl hover:bg-gray-100 transition"
        >
          Next
        </button>
      </div>

      {/* Calendar */}
      <div className="grid grid-cols-7 gap-2 text-center mb-8">
        {daysOfWeek.map(day => (
          <div key={day} className="font-bold text-gray-700">{day}</div>
        ))}
        {Array.from({ length: startDay }).map((_, idx) => (
          <div key={`empty-${idx}`} />
        ))}
        {docSlots.map(({ day }, idx) => {
          const isPast = currentYear === today.getFullYear() && currentMonth === today.getMonth() && day < currentDate;
          return (
            <motion.div
              key={idx}
              onClick={() => !isPast && setSelectedDay(day)}
              className={`p-3 rounded-full border cursor-pointer transition-all ${
                isPast ? 'bg-gray-100 text-gray-400 cursor-not-allowed' :
                selectedDay === day ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-blue-100'
              }`}
              whileHover={!isPast ? { scale: 1.1 } : {}}
            >
              {day}
            </motion.div>
          );
        })}
      </div>

      {/* Time Slots */}
      {selectedDay && (
        <>
          <h3 className="text-lg font-medium mb-4 text-center">Select a Time</h3>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-4 justify-center mb-8">
            {docSlots.find(d => d.day === selectedDay)?.slots.map((time, idx) => (
              <motion.button
                key={idx}
                onClick={() => setSelectedTime(time)}
                className={`px-4 py-2 text-sm rounded-full border transition-all ${
                  selectedTime === time ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-blue-100'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {time}
              </motion.button>
            ))}
          </div>

          {selectedTime && (
            <div className="text-center mt-8">
              <motion.button
                onClick={bookAppointment}
                className="bg-blue-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-all"
                whileHover={{ scale: 1.05 }}
              >
                Confirm Appointment on {selectedDay}/{currentMonth + 1}/{currentYear} at {selectedTime}
              </motion.button>
            </div>
          )}
        </>
      )}

      <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
    </div>
  ) : null;
};

export default Appointment;
