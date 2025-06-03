import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const fadeInVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const About = () => {
  return (
    <motion.div
      className="px-6 md:px-16 max-w-7xl mx-auto text-[#262626]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInVariant}
    >
      <div className="text-center text-2xl pt-10 text-[#707070]">
        <p>
          ABOUT <span className="text-gray-700 font-semibold">US</span>
        </p>
      </div>
      <motion.div
        className="my-12 flex flex-col md:flex-row items-center gap-12"
        variants={fadeInVariant}
      >
        <img
          className="w-full md:max-w-[360px] rounded-2xl shadow-lg"
          src={assets.about_image}
          alt="About"
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-l text-gray-600 leading-relaxed">
          <p>
            Welcome to <b className="text-[#126A9C]">Dr.Now</b> — your reliable
            partner for modern digital healthcare. At Dr.Now, we understand the
            challenges of managing appointments and keeping track of your
            medical records. That's why we offer a platform that makes it easy —
            fast, secure, and user-friendly.
          </p>
          <p>
            <b className="text-[#126A9C]">Dr.Now</b> stands for innovation and
            trust. Our goal is to combine advanced technology with the personal
            care everyone deserves. Whether you're booking your first
            appointment or managing ongoing treatments, Dr.Now is here to
            support you every step of the way.
          </p>
          <b className="text-gray-800 text-xl">Our Vision</b>
          <p>
            Our vision at <b className="text-[#126A9C]">Dr.Now</b> is to create
            a seamless connection between patients and healthcare providers. We
            aim to revolutionize access to medical care — making it fast,
            digital, and available wherever you are. With Dr.Now, your health is
            just one click away.
          </p>
        </div>
      </motion.div>
      <motion.div
        className="text-center text-xl my-8 text-[#707070]"
        variants={fadeInVariant}
      >
        <p>
          WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
        </p>
      </motion.div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        variants={fadeInVariant}
      >
        {[
          {
            title: "EFFICIENCY",
            desc: "Streamlined appointment scheduling that fits into your busy lifestyle.",
          },
          {
            title: "CONVENIENCE",
            desc: "Access to a network of trusted healthcare professionals in your area.",
          },
          {
            title: "PERSONALIZATION",
            desc: "Tailored recommendations and reminders to help you stay on top of your health.",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="border px-8 py-12 rounded-2xl shadow-lg hover:shadow-2xl hover:bg-[#126A9C] hover:text-white transition-all duration-300 text-gray-600 text-[15px] flex flex-col gap-6 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            variants={fadeInVariant}
          >
            <b className="text-base">{item.title}:</b>
            <p>{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default About;