import React, { useContext, useEffect } from 'react';
import { assets } from '../assets/assets';
import { DoctorContext } from '../context/DoctorContext';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { dToken, setDToken, profileData, getProfileData } = useContext(DoctorContext);
  const { aToken, setAToken } = useContext(AdminContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (dToken && !profileData) {
      getProfileData();
    }
  }, [dToken]);

  const logout = () => {
    if (dToken) {
      setDToken('');
      localStorage.removeItem('dToken');
    }
    if (aToken) {
      setAToken('');
      localStorage.removeItem('aToken');
    }
    navigate('/');
  };

  return (
    <div
      className="mt-6 flex flex-wrap justify-between items-center px-4 sm:px-6 md:px-10 py-4 mx-4
                 bg-gradient-to-r from-[#0D1B2A] to-[#126A9C] text-white text-sm
                 rounded-xl shadow-md z-10"
    >
      <div className="flex items-center gap-2">
        <img
          onClick={() => navigate('/')}
          className="w-32 sm:w-36 cursor-pointer"
          src={assets.admin_logo}
          alt="Logo"
        />
        {(aToken || dToken) && (
          <p className="bg-white text-primary px-3 py-1 text-xs sm:text-sm rounded-full shadow-inner">
            {aToken ? 'Admin' : `Doctor: ${profileData?.name || '...'}`}
          </p>
        )}
      </div>

      {(aToken || dToken) && (
        <button
          onClick={logout}
          className="mt-2 sm:mt-0 bg-white text-primary px-4 py-2 rounded-full font-light 
                     hover:scale-105 hover:shadow-lg transition-transform duration-300 text-sm"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Navbar;
