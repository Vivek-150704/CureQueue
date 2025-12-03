import React from 'react'
import { assets } from '../assets/assets'
// Using icons for a cleaner, more modern look
import { HiOutlineOfficeBuilding, HiOutlineMail, HiOutlinePhone, HiOutlineBriefcase } from "react-icons/hi";

const Contact = () => {
    return (
        // --- Main Page Container ---
        // Wraps the page in our standard, centered, max-width container
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24'>

            {/* --- "Contact Us" Title Section --- */}
            <div className='text-center mb-16'>
                <h1 className='text-3xl font-bold text-gray-900 sm:text-4xl'>
                    Contact <span className='text-primary'>Us</span>
                </h1>
                <p className='mt-4 max-w-2xl mx-auto text-base text-gray-600'>
                    We are here to help. Reach out to us with any questions you may have.
                </p>
            </div>

            {/* --- Main Content (Image + Text) --- */}
            <div className='flex flex-col md:flex-row items-center gap-12 lg:gap-16'>
                
                {/* Image */}
                <img 
                    className='w-full md:w-5/12 rounded-xl shadow-lg object-cover' 
                    src={assets.contact_image} 
                    alt="Contact" 
                />
                
                {/* --- Text Content --- */}
                <div className='md:w-7/12 flex flex-col gap-8'>

                    {/* --- "Our Office" Section --- */}
                    <div className='flex flex-col gap-3'>
                        <h2 className='text-xl font-semibold text-gray-900 flex items-center gap-2'>
                            <HiOutlineOfficeBuilding className='text-primary' /> OUR OFFICE
                        </h2>
                        <p className='text-base text-gray-600 leading-relaxed ml-7'>
                            GM Institute of Technology, <br />
                            Davanagere, Karnataka, India
                        </p>
                        <div className='flex flex-col gap-2 ml-7'>
                            <p className='text-base text-gray-600 flex items-center gap-2'>
                                <HiOutlinePhone className='text-gray-500' /> 89515-05885
                            </p>
                            <p className='text-base text-gray-600 flex items-center gap-2'>
                                <HiOutlineMail className='text-gray-500' /> CureQueuedev@gmail.com
                            </p>
                        </div>
                    </div>

                    {/* --- "Careers" Section --- */}
                    <div className='flex flex-col gap-3'>
                        <h2 className='text-xl font-semibold text-gray-900 flex items-center gap-2'>
                            <HiOutlineBriefcase className='text-primary' /> CAREERS AT CUREQUEUE
                        </h2>
                        <p className='text-base text-gray-600 leading-relaxed ml-7'>
                            Learn more about our teams and job openings.
                        </p>
                        {/* --- Restyled Button --- */}
                        <div className='ml-7 mt-2'>
                            <button className='bg-white text-primary border border-primary font-semibold px-8 py-3 rounded-full
                                               transition-all duration-300 ease-in-out
                                               hover:bg-primary hover:text-white hover:shadow-lg'>
                                Explore Jobs
                            </button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Contact