import React, { useContext, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(false);
    navigate("/login");
  };

  return (
    <div
      className="flex items-center justify-between px-6 md:px-16 py-4 
                 bg-gradient-to-r from-[#0D1B2A] to-[#126A9C] text-sm text-gray-100 
                 rounded-t-2xl rounded-b-xl max-w-7xl mx-auto mt-6 shadow-md"
      style={{
        boxShadow:
          "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      }}
    >
      <img
        onClick={() => navigate("/")}
        className="w-36 cursor-pointer"
        src={assets.logo}
        alt="Logo"
      />
      <ul className="hidden md:flex items-center gap-8 font-medium text-lg">
        {["/", "/doctors", "/about", "/contact"].map((path, idx) => (
          <NavLink
            key={idx}
            to={path}
            className={({ isActive }) =>
              isActive
                ? "text-[#2F9650] border-b-2 border-[#2F9650] pb-1 transition"
                : "hover:text-[#2F9650] transition"
            }
          >
            {path === "/" ? "HOME" : path.replace("/", "").toUpperCase()}
          </NavLink>
        ))}
      </ul>
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={userData.image} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p onClick={logout} className="hover:text-black cursor-pointer">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-white  text-gray-700  px-8 py-3 rounded-full font-light hidden md:block 
                       hover:scale-105 hover:shadow-lg transition-transform duration-300"
          >
            Create Account
          </button>
        )}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt="Menu"
        />
      </div>
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${
          showMenu ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 z-50 rounded-l-2xl`}
      >
        <div className="flex justify-between items-center p-5 border-b">
          <img src={assets.logo} className="w-28" alt="Logo" />
          <img
            onClick={() => setShowMenu(false)}
            src={assets.cross_icon}
            className="w-6 cursor-pointer"
            alt="Close"
          />
        </div>
        <ul className="flex flex-col items-start gap-4 p-5 text-gray-700 font-medium">
          {["/", "/doctors", "/about", "/contact", "/login"].map(
            (path, idx) => (
              <NavLink
                key={idx}
                onClick={() => setShowMenu(false)}
                to={path}
                className="w-full block hover:text-[#126A9C] py-2 border-b"
              >
                {path === "/" ? "HOME" : path.replace("/", "").toUpperCase()}
              </NavLink>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
