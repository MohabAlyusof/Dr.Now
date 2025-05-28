import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const fadeInVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Contact = () => {
  return (
    <motion.div
      className="px-6 md:px-16 max-w-7xl mx-auto text-[#262626]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInVariant}
    >
      {/* Heading */}
      <div className="text-center text-2xl pt-10 text-[#707070]">
        <p>
          CONTACT <span className="text-gray-700 font-semibold">US</span>
        </p>
      </div>

      {/* Image + Contact Info */}
      <motion.div
        className="my-12 flex flex-col md:flex-row items-center gap-12 text-sm"
        variants={fadeInVariant}
      >
        <img
          className="w-full md:max-w-[360px] rounded-2xl shadow-lg"
          src={assets.contact_image}
          alt="Contact"
        />
        <div className="flex flex-col justify-center items-start gap-6 text-gray-600 leading-relaxed md:w-2/4">
          <div>
            <p className="font-semibold text-lg">Dr.Now Office</p>
            <p className="text-gray-500">
              Prenzlauer Allee 186
              <br />
              10405 Berlin, Germany
            </p>
            <p className="text-gray-500 mt-2">
              Tel: +49 1575 6910542
              <br />
              Email: contact@drnow.com
            </p>
          </div>

          <div className="pt-4">
            <p className="font-semibold text-lg">Questions or Requests?</p>
            <p className="text-gray-500 mt-1">
              Use the form below to contact us with appointment-related
              inquiries, technical issues, or general questions about our
              services. We aim to respond as quickly and helpfully as possible.
            </p>
            {/* <p className="font-semibold text-lg">Careers at Dr.Now</p>
            <p className="text-gray-500 mt-1">
              We're always looking for passionate people. Discover open roles
              and join our team.
            </p>
            <motion.button
              className="border border-[#126A9C] text-[#126A9C] px-6 py-2 text-sm rounded-full mt-3 hover:bg-[#126A9C] hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              Explore Jobs
            </motion.button> */}
          </div>
        </div>
      </motion.div>

      {/* Contact Form */}
      <motion.div
        className="bg-gray-50 p-8 rounded-2xl shadow-lg mb-20"
        variants={fadeInVariant}
      >
        <h2 className="text-xl font-semibold text-center text-[#126A9C] mb-8">
          Get In Touch
        </h2>
        <form className="flex flex-col gap-6 max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Your Name"
            className="border border-gray-300 p-4 rounded-xl focus:outline-none focus:border-[#126A9C] transition-all duration-300"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="border border-gray-300 p-4 rounded-xl focus:outline-none focus:border-[#126A9C] transition-all duration-300"
          />
          <textarea
            rows="5"
            placeholder="Your Message"
            className="border border-gray-300 p-4 rounded-xl focus:outline-none focus:border-[#126A9C] transition-all duration-300"
          ></textarea>
          <motion.button
            type="submit"
            className="bg-[#126A9C] text-white px-8 py-4 rounded-2xl shadow-md hover:scale-105 transition-transform duration-300 self-center"
            whileHover={{ scale: 1.05 }}
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
