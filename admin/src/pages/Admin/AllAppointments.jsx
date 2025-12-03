import React, { useEffect, useContext } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { HiOutlineCalendar, HiOutlineIdentification, HiOutlineXCircle } from "react-icons/hi";

// --- Helper component for status badges ---
const StatusBadge = ({ status }) => {
    let colors = ''
    switch (status) {
        case 'Completed':
            colors = 'bg-green-100 text-green-800 border-green-200'
            break;
        case 'Cancelled':
            colors = 'bg-red-100 text-red-800 border-red-200'
            break;
        default: // Active
            colors = 'bg-blue-100 text-blue-800 border-blue-200'
            break;
    }
    return (
        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${colors}`}>
            {status}
        </span>
    )
}

const AllAppointments = () => {

    const { aToken, appointments, cancelAppointment, getAllAppointments } = useContext(AdminContext)
    
    // --- BUG FIX: These functions are defined locally, not in AppContext ---
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currency = '₹'; // Assuming currency symbol from your other file

    const slotDateFormat = (slotDate) => {
        if (!slotDate) return "N/A";
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1]) - 1] + " " + dateArray[2]
    }

    const calculateAge = (dob) => {
        if (!dob) return "N/A";
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    // --- End of Bug Fix ---

    useEffect(() => {
        if (aToken) {
            getAllAppointments()
        }
    }, [aToken])

    return (
        // --- Main Page Wrapper ---
        <div className='p-6 sm:p-8 w-full'>
            <p className='mb-6 text-2xl font-semibold text-gray-900'>All Appointments</p>

            {/* --- List of Appointment Cards --- */}
            <div className='flex flex-col gap-6'>
                {appointments.length > 0 ? (
                    appointments.map((item, index) => (
                        <div key={index} className='bg-white border border-gray-200 rounded-xl shadow-lg p-6
                                                  flex flex-col md:flex-row gap-6'>
                            
                            {/* --- User & Doctor Info --- */}
                            <div className='flex-1 flex flex-col sm:flex-row gap-6'>
                                {/* Patient Info */}
                                <div className='flex-1 flex items-center gap-3'>
                                    <img src={item.userData.image} className='w-14 h-14 rounded-full object-cover' alt="" />
                                    <div>
                                        <p className='text-xs text-gray-500'>Patient</p>
                                        <p className='text-base font-semibold text-gray-900'>{item.userData.name}</p>
                                        <p className='text-sm text-gray-600'>{calculateAge(item.userData.dob)} Years Old</p>
                                    </div>
                                </div>
                                {/* Doctor Info */}
                                <div className='flex-1 flex items-center gap-3'>
                                    <img src={item.docData.image} className='w-14 h-14 rounded-full object-cover bg-gray-200' alt="" />
                                    <div>
                                        <p className='text-xs text-gray-500'>Doctor</p>
                                        <p className='text-base font-semibold text-gray-900'>{item.docData.name}</p>
                                        <p className='text-sm text-gray-600'>{item.docData.speciality}</p>
                                    </div>
                                </div>
                            </div>

                            {/* --- Appointment Details & Actions --- */}
                            <div className='md:w-64 flex flex-col justify-between items-start md:items-end gap-3'>
                                <div>
                                    <p className='flex items-center gap-2 text-sm text-gray-700 font-medium'>
                                        <HiOutlineCalendar className='w-5 h-5 text-primary' />
                                        {slotDateFormat(item.slotDate)}, {item.slotTime}
                                    </p>
                                    <p className='flex items-center gap-2 text-sm text-gray-700 font-medium mt-1.5'>
                                        <HiOutlineIdentification className='w-5 h-5 text-primary' />
                                        Fees: {currency}{item.amount}
                                    </p>
                                </div>

                                <div className='flex items-center gap-3 mt-3'>
                                    {/* --- Status Badge --- */}
                                    {item.cancelled ? <StatusBadge status='Cancelled' />
                                     : item.isCompleted ? <StatusBadge status='Completed' />
                                     : <StatusBadge status='Active' />}
                                    
                                    {/* --- Cancel Button --- */}
                                    {!item.cancelled && !item.isCompleted && (
                                        <button 
                                            onClick={() => cancelAppointment(item._id)} 
                                            className='flex items-center justify-center w-8 h-8 rounded-full
                                                       text-red-500 bg-red-100
                                                       transition-all hover:bg-red-200'
                                            title='Cancel Appointment'
                                        >
                                            <HiOutlineXCircle className='w-5 h-5' />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    // --- Empty State ---
                    <div className='text-center text-gray-500 py-20'>
                        <img src={assets.logo} alt="CureQueue" className='w-40 mx-auto opacity-50' />
                        <h2 className='text-xl font-semibold text-gray-700 mt-6'>No Appointments Found</h2>
                        <p className='mt-2'>There are currently no appointments in the system.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AllAppointments