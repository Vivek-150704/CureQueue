import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {

    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    // Return nothing if there are no doctors to show
    if (!doctors || doctors.length === 0) {
        return null;
    }

    return (
        // --- Main Container ---
        // Added max-w-6xl and mx-auto for consistent site-wide layout
        <div className='my-16 sm:my-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
            
            {/* --- Header Section --- */}
            <div className='flex flex-col items-center gap-3 text-center'>
                <h1 className='text-3xl font-bold text-gray-900'>Top Doctors to Book</h1>
                <p className='max-w-lg text-base text-gray-600'>
                    Simply browse through our extensive list of trusted doctors.
                </p>
            </div>

            {/* --- Responsive Grid ---
                - Uses the same responsive grid as the RelatedDoctors component
            */}
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-10'>
                {/* We only show the first 10 doctors from the main list */}
                {doctors.slice(0, 10).map((item, index) => (
                    
                    // --- Doctor Card (Identical to RelatedDoctors) ---
                    <div 
                        onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} 
                        // Added shadow, bg-white, and a more subtle border
                        className='bg-white border border-gray-200 rounded-xl overflow-hidden cursor-pointer
                                   shadow-md transition-all duration-300 ease-in-out
                                   hover:shadow-xl hover:-translate-y-1' // More subtle hover effect
                        key={index}
                    >
                        {/* --- Image Container ---
                            - Added 'h-48' and 'object-cover' to ensure all images are the same height.
                        */}
                        <div className='bg-[#EAEFFF]'>
                            <img className='w-full h-48 object-cover' src={item.image} alt={item.name} />
                        </div>

                        {/* --- Card Content ---
                            - Kept your structure, just adjusted text colors for consistency.
                        */}
                        <div className='p-4 flex flex-col gap-1.5'>
                            <div className={`flex items-center gap-2 text-sm ${item.available ? 'text-green-600' : "text-gray-500"}`}>
                                <p className={`w-2.5 h-2.5 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-500"}`}></p>
                                <p className='font-medium'>{item.available ? 'Available' : "Not Available"}</p>
                            </div>
                            
                            <p className='text-gray-900 text-lg font-semibold'>{item.name}</p>
                            <p className='text-gray-600 text-sm'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- "More" Button ---
                - Restyled as a clean "outline" button that matches your primary color.
            */}
            <div className='flex justify-center'>
                <button 
                    onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} 
                    className='bg-white text-primary border border-primary font-semibold px-12 py-3 rounded-full mt-12
                               transition-all duration-300 ease-in-out
                               hover:bg-primary hover:text-white hover:shadow-lg'
                >
                    View All Doctors
                </button>
            </div>
        </div>
    )
}

export default TopDoctors