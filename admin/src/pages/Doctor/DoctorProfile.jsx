import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData } =
    useContext(DoctorContext);
  const { currency, backendUrl } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const updateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("address", JSON.stringify(profileData.address));
      formData.append("fees", profileData.fees);
      formData.append("about", profileData.about);
      formData.append("available", profileData.available);
      if (newImage) {
        formData.append("image", newImage);
      }

      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        formData,
        {
          headers: {
            dToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        setNewImage(null);
        setPreviewUrl(null);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (dToken) getProfileData();
  }, [dToken]);

  const displayedImage =
    previewUrl || `${profileData?.image}?v=${new Date().getTime()}`;

  return (
    profileData && (
      <div className="px-4 sm:px-6 py-6 bg-[#F8F9FD] min-h-screen">
        <div className="flex flex-col gap-6 sm:flex-row sm:gap-10">
          <div className="w-full sm:w-64 sm:min-h-[22rem]">
            <img
              className="w-full h-full object-cover rounded-xl"
              src={displayedImage}
              alt="Doctor"
            />
          </div>
          <div className="flex-1 border border-gray-100 rounded-xl bg-white p-6 shadow-sm min-h-[22rem]">
            <p className="text-2xl font-semibold text-gray-800">
              {profileData.name}
            </p>
            <div className="flex items-center gap-3 text-gray-600 mt-1">
              <p>
                {profileData.degree} - {profileData.speciality}
              </p>
              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                {profileData.experience}
              </span>
            </div>

            <div className="mt-4">
              <p className="text-sm font-semibold text-gray-700 mb-1">About</p>
              {isEdit ? (
                <textarea
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      about: e.target.value,
                    }))
                  }
                  className="w-full border rounded p-2 outline-[#126A9C] text-sm"
                  rows={6}
                  value={profileData.about}
                />
              ) : (
                <p className="text-sm text-gray-700">{profileData.about}</p>
              )}
            </div>

            <div className="mt-4">
              <p className="font-semibold text-gray-700">Appointment Fee</p>
              {isEdit ? (
                <input
                  type="number"
                  value={profileData.fees}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      fees: e.target.value,
                    }))
                  }
                  className="border px-2 py-1 mt-1 rounded outline-[#126A9C] text-sm"
                />
              ) : (
                <p className="text-sm text-gray-700 mt-1">
                  {currency}
                  {profileData.fees}
                </p>
              )}
            </div>

            <div className="mt-4">
              <p className="font-semibold text-gray-700">Address</p>
              {isEdit ? (
                <div className="space-y-2 mt-1">
                  <input
                    type="text"
                    value={profileData.address.line1}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    className="w-full border px-2 py-1 rounded outline-[#126A9C] text-sm"
                  />
                  <input
                    type="text"
                    value={profileData.address.line2}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    className="w-full border px-2 py-1 rounded outline-[#126A9C] text-sm"
                  />
                </div>
              ) : (
                <p className="text-sm text-gray-700 mt-1">
                  {profileData.address.line1}
                  <br />
                  {profileData.address.line2}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 mt-4 text-gray-700">
              <input
                type="checkbox"
                onChange={() =>
                  isEdit &&
                  setProfileData((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
                checked={profileData.available}
              />
              <label>Available</label>
            </div>

            <button
              onClick={isEdit ? updateProfile : () => setIsEdit(true)}
              className="mt-6 px-5 py-2 rounded-full border border-[#126A9C] text-sm hover:bg-[#126A9C] hover:text-white transition"
            >
              {isEdit ? "Save" : "Edit"}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
