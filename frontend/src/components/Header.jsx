import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
    return (
        // --- Outer Wrapper ---
        <div className='my-16 mx-4 md:mx-8'>
            {/* --- Main Container ---
                - Replaced 'bg-primary' with a custom gradient: 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500'
                  This creates a beautiful, flowing multi-color background.
                - Ensured 'overflow-hidden' for rounded corners.
            */}
            <div className='relative flex flex-col md:flex-row bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl overflow-hidden max-w-6xl mx-auto'>

                {/* --- Header Left (Content) --- */}
                {/* Text colors are now 'text-white' to stand out against the gradient */}
                <div className='md:w-1/2 flex flex-col justify-center gap-6 py-16 px-8 sm:px-12 lg:px-16 z-10'>

                    {/* Headline: Now 'text-white' */}
                    <p className='text-4xl md:text-5xl text-white font-bold leading-tight'>
                        Book Appointment <br /> With Trusted Doctors
                    </p>

                    {/* Sub-text: Adjusted to 'text-indigo-100' or 'text-gray-100' for better contrast on the gradient */}
                    <div className='flex flex-col sm:flex-row items-center gap-4 text-indigo-100 text-base font-normal'>
                        <img className='w-28 flex-shrink-0' src={assets.group_profiles} alt="User profiles" />
                        <p>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
                    </div>

                    {/* Button: Stays white with 'text-primary' as this looks clean against any background */}
                    <a 
                        href='#speciality' 
                        className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-primary text-sm font-semibold 
                                   max-w-max transition-all duration-300 ease-in-out
                                   hover:bg-gray-50 hover:shadow-lg hover:scale-105
                                   mt-4 m-auto md:m-0'
                    >
                        Book appointment <img className='w-3' src={assets.arrow_icon} alt="arrow" />
                    </a>
                </div>

                {/* --- Header Right (Image) --- */}
                <div className='md:w-1/2 relative'>
                    <img 
                        className='w-full h-auto rounded-lg md:absolute md:bottom-0' 
                        src={assets.header_img} 
                        alt="CureQueue Doctor" 
                    />
                </div>

            </div>
        </div>
    )
}

export default Header