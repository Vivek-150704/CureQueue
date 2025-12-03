import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'
// Using icons for a cleaner mobile filter button
import { HiOutlineFilter, HiX } from 'react-icons/hi'

// List of specialities to avoid repeating code (DRY principle)
const specialitiesList = [
    'General physician', 
    'Gynecologist', 
    'Dermatologist', 
    'Pediatricians', 
    'Neurologist', 
    'Gastroenterologist'
];

const Doctors = () => {
    const { speciality } = useParams()
    const [filterDoc, setFilterDoc] = useState([])
    const [showFilter, setShowFilter] = useState(false)
    const navigate = useNavigate();
    const { doctors } = useContext(AppContext)

    // Your filter logic is correct, no changes needed
    const applyFilter = () => {
        if (speciality) {
            setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
        } else {
            setFilterDoc(doctors)
        }
    }

    useEffect(() => {
        applyFilter()
    }, [doctors, speciality])

    return (
        // --- Main Page Container ---
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20'>
            
            {/* --- Page Title --- */}
            <div className='text-center mb-12'>
                <h1 className='text-3xl font-bold text-gray-900 sm:text-4xl'>
                    Find Your <span className='text-primary'>Specialist</span>
                </h1>
                <p className='mt-4 max-w-2xl mx-auto text-base text-gray-600'>
                    {speciality ? `Showing results for: ${speciality}` : 'Browse all of our trusted doctors.'}
                </p>
            </div>

            {/* --- Main Layout Grid (Sidebar + Content) --- */}
            <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
                
                {/* --- Filter Sidebar (Left) --- */}
                <div className='md:col-span-1'>
                    {/* --- Mobile Filter Button --- */}
                    <button 
                        onClick={() => setShowFilter(!showFilter)}
                        className='w-full flex md:hidden items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700'
                    >
                        {showFilter ? 'Hide Filters' : 'Show Filters'}
                        {showFilter ? <HiX className="h-5 w-5" /> : <HiOutlineFilter className="h-5 w-5" />}
                    </button>

                    {/* --- Filter List --- */}
                    <div className={`flex-col gap-2 mt-4 md:mt-0 ${showFilter ? 'flex' : 'hidden md:flex'}`}>
                        {/* "All Doctors" Button */}
                        <button
                            onClick={() => navigate('/doctors')}
                            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors
                                        ${!speciality 
                                            ? 'bg-primary text-white shadow-md' 
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                        >
                            All Doctors
                        </button>

                        {/* Mapped Speciality Buttons */}
                        {specialitiesList.map((spec) => (
                            <button
                                key={spec}
                                // This is your original toggle logic, just applied to the new button
                                onClick={() => speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`)}
                                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors
                                            ${speciality === spec 
                                                ? 'bg-primary text-white shadow-md' 
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                            >
                                {spec}
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- Doctor List (Right) --- */}
                <div className='md:col-span-3'>
                    {filterDoc.length > 0 ? (
                        // --- Responsive Grid for Doctors ---
                        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'>
                            {filterDoc.map((item, index) => (
                                // --- Re-using the Standard Doctor Card ---
                                <div 
                                    onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} 
                                    className='bg-white border border-gray-200 rounded-xl overflow-hidden cursor-pointer
                                               shadow-md transition-all duration-300 ease-in-out
                                               hover:shadow-xl hover:-translate-y-1' // Subtle hover
                                    key={index}
                                >
                                    {/* Image container with fixed height */}
                                    <div className='bg-[#EAEFFF]'>
                                        <img className='w-full h-48 object-cover' src={item.image} alt={item.name} />
                                    </div>
                                    {/* Card content */}
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
                    ) : (
                        // --- Empty State (Good UX) ---
                        <div className='text-center text-gray-500 py-20 col-span-full'>
                            <h2 className='text-xl font-semibold text-gray-700'>No Doctors Found</h2>
                            <p className='mt-2'>Try selecting "All Doctors" or a different speciality.</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default Doctors