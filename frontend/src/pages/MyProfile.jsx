import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaUser, FaBirthdayCake } from 'react-icons/fa';

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);
      if (image) formData.append('image', image);

      const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, formData, { headers: { token } });

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return userData ? (
    <motion.div
      className="max-w-lg flex flex-col gap-6 text-sm pt-5 mx-auto text-[#262626]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-center">
        {isEdit ? (
          <label htmlFor="image">
            <div className="relative cursor-pointer">
              <img
                className="w-36 h-36 object-cover rounded-full border-4 border-[#126A9C] shadow-lg"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt="Profile"
              />
              <img className="w-10 absolute bottom-2 right-2" src={assets.upload_icon} alt="Upload" />
            </div>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
          </label>
        ) : (
          <img className="w-36 h-36 object-cover rounded-full border-4 border-[#126A9C] shadow-lg" src={userData.image} alt="Profile" />
        )}
      </div>

      <div className="text-center">
        {isEdit ? (
          <input
            className="bg-gray-100 text-3xl font-semibold max-w-60 text-center rounded p-2 border border-gray-300"
            type="text"
            onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
            value={userData.name}
          />
        ) : (
          <p className="font-semibold text-3xl mt-4">{userData.name}</p>
        )}
      </div>

      <hr className="h-[1px] bg-gray-300 border-none my-4" />

      <div>
        <p className="text-[#126A9C] text-lg font-semibold flex items-center gap-2">
          <FaEnvelope /> Contact Information
        </p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-3 mt-4 text-[#363636]">
          <p className="font-medium flex items-center gap-2"><FaEnvelope /> Email:</p>
          <p className="text-blue-500">{userData.email}</p>

          <p className="font-medium flex items-center gap-2"><FaPhone /> Phone:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 rounded p-2 border border-gray-300 w-full"
              type="text"
              onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
              value={userData.phone}
            />
          ) : (
            <p className="text-blue-500">{userData.phone}</p>
          )}

          <p className="font-medium flex items-center gap-2"><FaMapMarkerAlt /> Address:</p>
          {isEdit ? (
            <div className="flex flex-col gap-2">
              <input
                className="bg-gray-100 rounded p-2 border border-gray-300"
                type="text"
                onChange={(e) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                value={userData.address.line1}
              />
              <input
                className="bg-gray-100 rounded p-2 border border-gray-300"
                type="text"
                onChange={(e) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                value={userData.address.line2}
              />
            </div>
          ) : (
            <p className="text-gray-500">
              {userData.address.line1}<br />{userData.address.line2}
            </p>
          )}
        </div>
      </div>

      <div>
        <p className="text-[#126A9C] text-lg font-semibold flex items-center gap-2 mt-4">
          <FaUser /> Basic Information
        </p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-3 mt-4 text-gray-600">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              className="bg-gray-100 rounded p-2 border border-gray-300"
              onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
              value={userData.gender}
            >
              <option value="Not Selected">Not Selected</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-500">{userData.gender}</p>
          )}

          <p className="font-medium flex items-center gap-2"><FaBirthdayCake /> Birthday:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 rounded p-2 border border-gray-300"
              type="date"
              onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
              value={userData.dob}
            />
          ) : (
            <p className="text-gray-500">{userData.dob}</p>
          )}
        </div>
      </div>

      <div className="mt-8 text-center">
        {isEdit ? (
          <button
            onClick={updateUserProfileData}
            className="bg-[#126A9C] text-white px-8 py-2 rounded-full hover:bg-blue-700 transition-all duration-300"
          >
            Save Information
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="border border-[#126A9C] px-8 py-2 rounded-full text-[#126A9C] hover:bg-[#126A9C] hover:text-white transition-all duration-300"
          >
            Edit Profile
          </button>
        )}
      </div>
    </motion.div>
  ) : null;
};

export default MyProfile;
