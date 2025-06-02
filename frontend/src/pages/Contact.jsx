import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const fadeInVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Contact = () => {
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ADMIN,
      e.target,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    ).then((result) => {
      console.log('Admin email sent:', result.text);
    }, (error) => {
      console.error('Admin email error:', error.text);
    });

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_USER,
      e.target,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    ).then((result) => {
      console.log('Auto-reply sent:', result.text);
      toast.success("Your message has been sent. We'll get back to you soon!", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        
      });
      e.target.reset();
    }, (error) => {
      console.error('Auto-reply error:', error.text);
      toast.error("There was an error sending your message. Please try again later.", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    });
  };

  return (
    <motion.div 
      className="px-6 md:px-16 max-w-7xl mx-auto text-[#262626]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInVariant}
    >

      <ToastContainer />
      
      <div className='text-center text-2xl pt-10 text-[#707070]'>
        <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      <motion.div 
        className='my-12 flex flex-col md:flex-row items-center gap-12 text-sm'
        variants={fadeInVariant}
      >
        <motion.img 
          className='w-full md:max-w-[360px] rounded-2xl shadow-lg' 
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
              Email: dr.now2025@gmail.com
            </p>
          </div>

          <div className="pt-4">
            <p className="font-semibold text-lg">Questions or Requests?</p>
            <p className="text-gray-500 mt-1">
              Use the form below to contact us with appointment-related
              inquiries, technical issues, or general questions about our
              services. We aim to respond as quickly and helpfully as possible.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="bg-gray-50 p-8 rounded-2xl shadow-lg mb-20"
        variants={fadeInVariant}
      >
        <h2 className="text-xl font-semibold text-center text-[#126A9C] mb-8">Get In Touch</h2>
        <form onSubmit={sendEmail} className="flex flex-col gap-6 max-w-2xl mx-auto">
          <input 
            type="text" 
            name="user_name" 
            placeholder="Your Name" 
            required 
            className="border border-gray-300 p-4 rounded-xl focus:outline-none focus:border-[#126A9C] transition-all duration-300"
          />
          <input 
            type="email" 
            name="user_email" 
            placeholder="Your Email" 
            required 
            className="border border-gray-300 p-4 rounded-xl focus:outline-none focus:border-[#126A9C] transition-all duration-300"
          />
          <textarea 
            name="user_message" 
            rows="5" 
            placeholder="Your Message" 
            required 
            className="border border-gray-300 p-4 rounded-xl focus:outline-none focus:border-[#126A9C] transition-all duration-300"
          ></textarea>
          <button 
            type="submit"
            className="border border-[#126A9C] text-[#126A9C] px-8 py-4 text-sm rounded-2xl shadow-md hover:bg-[#126A9C] hover:text-white transition-all duration-500"
          >
            Send Message
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
