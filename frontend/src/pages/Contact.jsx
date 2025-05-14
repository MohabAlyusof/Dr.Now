import React from "react";
import { assets } from "../assets/assets";

function Contact() {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          CONTACT <span className="text-gray-700 font-semibold">US</span>
        </p>
      </div>

      <div className="my-10 flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.contact_image}
          alt=""
        />
      </div>
      <div className="flex flex-col justify-center items-start gap-6">
        <p className="font-semibold text-lg text-gray-600">OUR OFFICE</p>
        <p className="text-gray-500">
        Alter Markt 06 <br />31134 Hildesheim , Lower Saxony, Germany
        </p>
        <p className="text-gray-500">
          Tel: (+49) 1575910542 <br /> Email:  Dr.Now2025@gmail.com
        </p>
        <p className="font-semibold text-lg text-gray-600">Careers at Dr.Now</p>
        <p className="text-gray-500">
          Learn more about our teams and job openings.
        </p>
        <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 ">
          Explore Jobs
        </button>
      </div>
    </div>
  );
}

export default Contact;
