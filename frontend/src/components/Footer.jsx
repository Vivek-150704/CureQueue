import React from 'react'
import { assets } from '../assets/assets'
// We'll use react-icons for a clean, modern icon set
// If you don't have it, run: npm install react-icons
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    // Use a <footer> tag for semantic HTML. Added a subtle background color.
    <footer className='bg-gray-50 border-t border-gray-200'>

      {/* Main content container. This centers your content and manages padding. */}
      <div className='max-w-6xl mx-auto px-6 sm:px-8 py-16'>

        {/* - Grid for links. Starts as a single column on mobile.
          - Becomes a 3-column grid on medium screens and up.
          - Uses a balanced [2fr_1fr_1fr] layout, giving the logo column more space.
        */}
        <div className='grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 md:gap-8'>

          {/* --- Column 1: Logo, About, & Socials --- */}
          <div className='flex flex-col'>
            <img className='mb-4 w-40' src={assets.logo} alt="CureQueue Logo" />
            
            {/* I replaced the 'lorem ipsum' with text that fits your brand */}
            <p className='text-gray-600 leading-relaxed pr-8'>
              CureQueue provides seamless appointment booking with trusted medical professionals, 
              plus AI-powered tools for early health insights.
            </p>

            {/* Added social media icons for a modern feel */}
            <div className='flex gap-4 mt-6'>
              <a href="#" aria-label="Facebook" className='w-9 h-9 bg-white border border-gray-200 rounded-full flex items-center justify-center text-primary transition-all hover:bg-primary hover:text-white hover:scale-110'>
                <FaFacebookF />
              </a>
              <a href="#" aria-label="Twitter" className='w-9 h-9 bg-white border border-gray-200 rounded-full flex items-center justify-center text-primary transition-all hover:bg-primary hover:text-white hover:scale-110'>
                <FaTwitter />
              </a>
              <a href="#" aria-label="LinkedIn" className='w-9 h-9 bg-white border border-gray-200 rounded-full flex items-center justify-center text-primary transition-all hover:bg-primary hover:text-white hover:scale-110'>
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* --- Column 2: Company Links --- */}
          <div>
            <p className='text-lg font-semibold text-gray-900 mb-4'>COMPANY</p>
            <ul className='flex flex-col gap-3 text-gray-600'>
              {/* Added hover effect and cursor-pointer to make them feel like links */}
              <li className='hover:text-primary cursor-pointer transition-colors'>Home</li>
              <li className='hover:text-primary cursor-pointer transition-colors'>About Us</li>
              <li className='hover:text-primary cursor-pointer transition-colors'>Find a Doctor</li>
              <li className='hover:text-primary cursor-pointer transition-colors'>Privacy Policy</li>
            </ul>
          </div>

          {/* --- Column 3: Get in Touch --- */}
          <div>
            <p className='text-lg font-semibold text-gray-900 mb-4'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-3 text-gray-600'>
              {/* These aren't links, so no hover effect */}
              <li>+1-212-456-7890</li>
              <li>CureQueuedev@gmail.com</li>
              {/* Added an address for a more complete feel */}
              <li>Davanagere, Karnataka, IN</li>
            </ul>
          </div>

        </div>
      </div>

      {/* --- Bottom Copyright Bar --- */}
      {/* - Replaced the <hr> with a cleaner top border.
        - Kept the padding and centering consistent with the rest of the site.
      */}
      <div className='border-t border-gray-200'>
        <div className='max-w-6xl mx-auto px-6 sm:px-8'>
          <p className='py-6 text-sm text-gray-500 text-center'>
            Copyright 2024 © CureQueue.com - All Rights Reserved.
          </p>
        </div>
      </div>

    </footer>
  )
}

export default Footer