import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 Year');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('General physician');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  const { backendUrl } = useContext(AppContext);
  const { aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!docImg) return toast.error('Image Not Selected');

      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', Number(fees));
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

      const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, {
        headers: { aToken },
      });

      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName('');
        setPassword('');
        setEmail('');
        setAddress1('');
        setAddress2('');
        setDegree('');
        setAbout('');
        setFees('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="px-6 py-6 w-full bg-[#F8F9FD] min-h-screen">
      <p className="text-2xl font-semibold text-gray-700 mb-6">Add Doctor</p>

      <div className="bg-white px-8 py-10 border rounded-2xl w-full max-w-5xl shadow-md overflow-y-auto">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              className="w-20 h-20 object-cover bg-gray-100 rounded-full cursor-pointer border hover:scale-105 transition-all"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="upload"
            />
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
          <p className="text-sm text-gray-600">Upload doctor picture</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 text-gray-700">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            {[
              { label: 'Your name', value: name, onChange: setName, type: 'text', placeholder: 'Name' },
              { label: 'Doctor Email', value: email, onChange: setEmail, type: 'email', placeholder: 'Email' },
              { label: 'Set Password', value: password, onChange: setPassword, type: 'password', placeholder: 'Password' },
              { label: 'Fees', value: fees, onChange: setFees, type: 'number', placeholder: 'Doctor fees' },
            ].map((field, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <label className="text-sm">{field.label}</label>
                <input
                  type={field.type}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder={field.placeholder}
                  required
                  className="border rounded-lg px-4 py-2 focus:outline-[#126A9C] focus:ring-1"
                />
              </div>
            ))}

            <div className="flex flex-col gap-1">
              <label className="text-sm">Experience</label>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="border rounded-lg px-4 py-2 focus:outline-[#126A9C] focus:ring-1"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={`${i + 1} Year`}>
                    {i + 1} {i === 0 ? 'Year' : 'Years'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm">Speciality</label>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className="border rounded-lg px-4 py-2 focus:outline-[#126A9C] focus:ring-1"
              >
                {['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'].map((spec, i) => (
                  <option key={i} value={spec}>{spec}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm">Degree</label>
              <input
                type="text"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                placeholder="Degree"
                required
                className="border rounded-lg px-4 py-2 focus:outline-[#126A9C] focus:ring-1"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm">Address</label>
              <input
                type="text"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                placeholder="Address 1"
                required
                className="border rounded-lg px-4 py-2 focus:outline-[#126A9C] focus:ring-1"
              />
              <input
                type="text"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                placeholder="Address 2"
                required
                className="border rounded-lg px-4 py-2 focus:outline-[#126A9C] focus:ring-1"
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <label className="text-sm mb-2 block">About Doctor</label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full px-4 pt-3 border rounded-lg focus:outline-[#126A9C] focus:ring-1"
            rows={5}
            placeholder="Write about the doctor..."
          />
        </div>

        <button
          type="submit"
          className="bg-[#126A9C] mt-6 text-white px-10 py-3 rounded-full hover:opacity-90 transition-all"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
