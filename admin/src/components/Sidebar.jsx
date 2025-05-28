import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorContext';
import { AdminContext } from '../context/AdminContext';

const Sidebar = () => {
  const { dToken } = useContext(DoctorContext);
  const { aToken } = useContext(AdminContext);

  const linkClass = (isActive) =>
    `group flex items-center gap-3 py-3 px-6 rounded-lg 
     transition-all duration-300 ${
       isActive
         ? 'bg-white text-[#126A9C] font-semibold shadow-md'
         : 'text-white hover:bg-white/10'
     }`;

  return (
    <div className="bg-gradient-to-b from-[#0D1B2A] to-[#126A9C] p-4 ml-4 mt-4 mb-4 rounded-xl shadow-lg min-h-screen flex flex-col">
      {/* Navigation Links */}
      <div className="flex flex-col items-start gap-3 overflow-y-auto mt-4">
        {aToken && (
          <ul className="w-full flex flex-col gap-2">
            <NavLink to="/admin-dashboard" className={({ isActive }) => linkClass(isActive)}>
              <img className="w-5 filter invert brightness-200" src={assets.home_icon} alt="" />
              <p>Dashboard</p>
            </NavLink>
            <NavLink to="/all-appointments" className={({ isActive }) => linkClass(isActive)}>
              <img className="w-5 filter invert brightness-200" src={assets.appointment_icon} alt="" />
              <p>Appointments</p>
            </NavLink>
            <NavLink to="/add-doctor" className={({ isActive }) => linkClass(isActive)}>
              <img className="w-5 filter invert brightness-200" src={assets.add_icon} alt="" />
              <p>Add Doctor</p>
            </NavLink>
            <NavLink to="/doctor-list" className={({ isActive }) => linkClass(isActive)}>
              <img className="w-5 filter invert brightness-200" src={assets.people_icon} alt="" />
              <p>Doctors List</p>
            </NavLink>
          </ul>
        )}

        {dToken && (
          <ul className="w-full flex flex-col gap-2">
            <NavLink to="/doctor-dashboard" className={({ isActive }) => linkClass(isActive)}>
              <img className="w-5 filter invert brightness-200" src={assets.home_icon} alt="" />
              <p>Dashboard</p>
            </NavLink>
            <NavLink to="/doctor-appointments" className={({ isActive }) => linkClass(isActive)}>
              <img className="w-5 filter invert brightness-200" src={assets.appointment_icon} alt="" />
              <p>Appointments</p>
            </NavLink>
            <NavLink to="/doctor-profile" className={({ isActive }) => linkClass(isActive)}>
              <img className="w-5 filter invert brightness-200" src={assets.people_icon} alt="" />
              <p>Profile</p>
            </NavLink>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
