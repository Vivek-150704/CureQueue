import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
    return (
        // --- Main Page Container ---
        // Wraps the whole page in our standard, centered, max-width container
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24'>

            {/* --- "About Us" Title Section --- */}
            <div className='text-center mb-16'>
                <h1 className='text-3xl font-bold text-gray-900 sm:text-4xl'>
                    About <span className='text-primary'>CureQueue</span>
                </h1>
                <p className='mt-4 max-w-2xl mx-auto text-base text-gray-600'>
                    Your trusted partner in managing healthcare needs conveniently and efficiently.
                </p>
            </div>

            {/* --- Main Content (Image + Text) --- */}
            <div className='flex flex-col md:flex-row items-center gap-12 lg:gap-16'>
                
                {/* Image */}
                <img 
                    className='w-full md:w-5/12 rounded-xl shadow-lg object-cover' 
                    src={assets.about_image} 
                    alt="Doctors" 
                />
                
                {/* Text Content */}
                <div className='md:w-7/12 flex flex-col gap-4'>
                    <p className='text-base text-gray-600 leading-relaxed'>
                        Welcome to CureQueue! We understand the challenges individuals face when it comes to 
                        scheduling doctor appointments and managing their health records.
                    </p>
                    
                    <h2 className='text-xl font-semibold text-gray-900 mt-4'>
                        Our Vision
                    </h2>
                    <p className='text-base text-gray-600 leading-relaxed'>
                        Our vision at CureQueue is to create a seamless healthcare experience for every user. 
                        We aim to bridge the gap between patients and healthcare providers, making it easier 
                        for you to access the care you need, when you need it.
                    </p>
                    <p className='text-base text-gray-600 leading-relaxed'>
                        We continuously strive to enhance our platform, integrating the latest advancements 
                        to improve user experience. Whether you're booking your first appointment or 
                        managing ongoing care, CureQueue is here to support you every step of the way.
                    </p>
                </div>
            </div>

            {/* --- "Why Choose Us" Section --- */}
            <div className='mt-24'>
                {/* Section Title */}
                <div className='text-center mb-12'>
                    <h2 className='text-3xl font-bold text-gray-900 sm:text-4xl'>
                        Why <span className='text-primary'>Choose Us</span>
                    </h2>
                </div>

                {/* --- Responsive 3-Column Grid --- */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    
                    {/* Card 1: Efficiency */}
                    <div className='bg-white border border-gray-200 rounded-xl shadow-md p-6
                                    flex flex-col gap-3 transition-all duration-300
                                    hover:shadow-xl hover:-translate-y-1.5 cursor-pointer'>
                        <h3 className='text-lg font-semibold text-primary'>EFFICIENCY</h3>
                        <p className='text-base text-gray-600'>
                            Streamlined appointment scheduling that fits into your busy lifestyle.
                        </p>
                    </div>
                    
                    {/* Card 2: Convenience */}
                    {/* Card 2: Convenience */}
                    <div className='bg-white border border-gray-200 rounded-xl shadow-md p-6
                                    flex flex-col gap-3 transition-all duration-300
                                    hover:shadow-xl hover:-translate-y-1.5 cursor-pointer'>
                        <h3 className='text-lg font-semibold text-primary'>CONVENIENCE</h3>
                        <p className='text-base text-gray-600'>
                            Access to a network of trusted healthcare professionals in your area.
                        </p> 
                    </div>
                    
                    {/* Card 3: Personalization */}
                    <div className='bg-white border border-gray-200 rounded-xl shadow-md p-6
                                    flex flex-col gap-3 transition-all duration-300
                                    hover:shadow-xl hover:-translate-y-1.5 cursor-pointer'>
                        <h3 className='text-lg font-semibold text-primary'>PERSONALIZATION</h3>
                        <p className='text-base text-gray-600'>
                            Tailored recommendations and reminders to help you stay on top of your health.
                        </p>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default About