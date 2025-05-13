import React from 'react'
import { assets } from './assets/assets'



const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-sm'>

        <div>
          <img className='mb-5 w-40' src={assets.logo} alt="" />
          <p className='text-xs text-gray-500 italic mb-3'>Your Trusted Health Partner</p>
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>An integrated platform that allows you to easily and securely connect with doctors through live video sessions without the need to download any applications. We offer appointment booking services, secure online payments, and appointment reminders, with a full commitment to protecting your data .</p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+4915756910542</li>
            <li>Dr.Now2025@gmail.com</li>
          </ul>
        </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2025 @ Dr.Now.com - All Right Reserved.</p>
      </div>

    </div>
  )
}

export default Footer;