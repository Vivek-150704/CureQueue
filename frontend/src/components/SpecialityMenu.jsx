import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

// A utility class to hide the scrollbar.
// You might need the 'tailwind-scrollbar-hide' plugin for this,
// or add this to your global CSS file:
/*
.no-scrollbar::-webkit-scrollbar {
    display: none;
}
.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
*/

const SpecialityMenu = () => {
    return (
        // --- Main Container ---
        // Added max-w-6xl, mx-auto, and standard padding for site-wide consistency
        <div id='speciality' className='my-16 sm:my-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
            
            {/* --- Header Section --- */}
            <div className='flex flex-col items-center gap-3 text-center'>
                <h1 className='text-3xl font-bold text-gray-900'>Find by Speciality</h1>
                <p className='max-w-lg text-base text-gray-600'>
                    Browse our extensive list of trusted doctors by their speciality.
                </p>
            </div>

            {/* --- Speciality List ---
                - On Mobile (default): A 'flex' row with 'overflow-x-auto' for horizontal scrolling.
                  'no-scrollbar' utility class hides the scrollbar.
                  'pb-6' adds padding at the bottom for the shadow to look good.
                - On Desktop (lg:): Converts to a 'grid' layout that wraps.
            */}
            <div className='w-full flex overflow-x-auto no-scrollbar gap-4 pt-10 pb-6
                            lg:grid lg:grid-cols-4 xl:grid-cols-6 lg:gap-6 lg:overflow-visible'>
                
                {specialityData.map((item, index) => (
                    
                    // --- Speciality Card ---
                    <Link 
                        to={`/doctors/${item.speciality}`} 
                        onClick={() => scrollTo(0, 0)} 
                        className='flex flex-col items-center justify-center gap-2 p-4
                                   bg-white border border-gray-200 rounded-xl shadow-md
                                   flex-shrink-0 w-32 h-32 sm:w-36 sm:h-36
                                   transition-all duration-300 ease-in-out
                                   hover:shadow-xl hover:-translate-y-1.5' // More subtle "lift" effect
                        key={index}
                    >
                        {/* Image: Kept sizing, but constrained it slightly */}
                        <img className='w-14 sm:w-16' src={item.image} alt={item.speciality} />
                        
                        {/* Text: Standardized color and weight */}
                        <p className='text-sm font-medium text-gray-700 text-center'>{item.speciality}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SpecialityMenu