import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'; // For the empty state logo

// --- Reusable "Cool" Toggle Switch Component ---
const ToggleSwitch = ({ checked, onChange }) => (
    <label className="relative inline-flex items-center cursor-pointer">
        <input 
            type="checkbox" 
            checked={checked} 
            onChange={onChange} 
            className="sr-only peer" // The invisible, functional checkbox
        />
        {/* The visual "track" of the toggle */}
        <div className="w-11 h-6 bg-gray-200 rounded-full 
                        peer-checked:after:translate-x-full 
                        peer-checked:after:border-white 
                        after:content-[''] after:absolute after:top-0.5 after:left-[2px] 
                        after:bg-white after:border-gray-300 after:border after:rounded-full 
                        after:h-5 after:w-5 after:transition-all 
                        peer-checked:bg-primary"
        ></div>
        <span className="ml-3 text-sm font-medium text-gray-700">
            {checked ? 'Available' : 'Unavailable'}
        </span>
    </label>
);

const DoctorsList = () => {

    const { doctors, changeAvailability, aToken, getAllDoctors } = useContext(AdminContext)

    useEffect(() => {
        if (aToken) {
            getAllDoctors()
        }
    }, [aToken])

    return (
        // --- Main Page Wrapper ---
        <div className='p-6 sm:p-8 w-full'>
            <p className='mb-6 text-2xl font-semibold text-gray-900'>All Doctors</p>

            {doctors.length > 0 ? (
                // --- Responsive Grid Layout ---
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {doctors.map((item, index) => (
                        // --- Standard Admin Card ---
                        <div 
                            className='bg-white border border-gray-200 rounded-xl overflow-hidden
                                       shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1' 
                            key={index}
                        >
                            {/* Fixed height, object-cover image */}
                            <img className='w-full h-48 object-cover' src={item.image} alt={item.name} />
                            
                            <div className='p-4'>
                                <p className='text-gray-900 text-lg font-semibold truncate' title={item.name}>{item.name}</p>
                                <p className='text-gray-600 text-sm'>{item.speciality}</p>
                                
                                {/* --- Toggle Switch Area --- */}
                                <div className='mt-4 pt-4 border-t border-gray-100'>
                                    <ToggleSwitch
                                        checked={item.available}
                                        onChange={() => changeAvailability(item._id)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                // --- Empty State ---
                <div className='text-center text-gray-500 py-20'>
                    <img src={assets.logo} alt="CureQueue" className='w-40 mx-auto opacity-50' />
                    <h2 className='text-xl font-semibold text-gray-700 mt-6'>No Doctors Found</h2>
                    <p className='mt-2'>Use the "Add Doctor" page to add a new doctor.</p>
                </div>
            )}
        </div>
    )
}

export default DoctorsList