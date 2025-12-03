import React, { useEffect, useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
// Icons for a modern UI
import { 
    HiOutlineCalendar, 
    HiOutlineIdentification, 
    HiOutlineCheckCircle, 
    HiOutlineXCircle 
} from "react-icons/hi";

// --- BUG FIX: Define helper functions locally ---
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const currency = '₹'; // Assuming currency symbol

const slotDateFormat = (slotDate) => {
    if (!slotDate) return "N/A";
    const dateArray = slotDate.split('_')
    // Corrected the month index to be 0-based
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
// --- End Bug Fix ---

// --- Helper for Appointment Status ---
const AppointmentStatusBadge = ({ status }) => {
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

// --- Helper for Payment Status ---
const PaymentStatusBadge = ({ isOnline }) => {
    const colors = isOnline 
        ? 'bg-purple-100 text-purple-800 border-purple-200' 
        : 'bg-gray-100 text-gray-800 border-gray-200';
    return (
        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${colors}`}>
            {isOnline ? 'Online Payment' : 'Pay at Clinic'}
        </span>
    )
}

const DoctorAppointments = () => {

    const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)
    // Removed buggy AppContext import

    useEffect(() => {
        if (dToken) {
            getAppointments()
        }
    }, [dToken])

    return (
        // --- Main Page Wrapper ---
        <div className='p-6 sm:p-8 w-full'>
            <p className='mb-6 text-2xl font-semibold text-gray-900'>My Appointments</p>

            {/* --- List of Appointment Cards --- */}
            <div className='flex flex-col gap-6'>
                {appointments.length > 0 ? (
                    appointments.map((item, index) => (
                        <div key={index} className='bg-white border border-gray-200 rounded-xl shadow-lg p-6
                                                  flex flex-col sm:flex-row gap-6'>
                            
                            {/* --- Info Section (Patient + Details) --- */}
                            <div className='flex-1 flex items-center gap-4'>
                                <img src={item.userData.image} className='w-16 h-16 rounded-full object-cover' alt={item.userData.name} />
                                <div className='flex flex-col gap-1'>
                                    <p className='text-lg font-semibold text-gray-900'>{item.userData.name}</p>
                                    <p className='text-sm text-gray-600'>{calculateAge(item.userData.dob)} Years Old</p>
                                    <p className='flex items-center gap-2 text-sm text-gray-700 font-medium mt-1'>
                                        <HiOutlineCalendar className='w-5 h-5 text-primary' />
                                        {slotDateFormat(item.slotDate)}, {item.slotTime}
                                    </p>
                                    <p className='flex items-center gap-2 text-sm text-gray-700 font-medium'>
                                        <HiOutlineIdentification className='w-5 h-5 text-primary' />
                                        Fees: {currency}{item.amount}
                                    </p>
                                </div>
                            </div>

                            {/* --- Status & Actions Section --- */}
                            <div className='sm:w-56 flex flex-col justify-between items-start sm:items-end gap-3'>
                                
                                {/* Status Badges */}
                                <div className='flex flex-col sm:items-end gap-2'>
                                    {item.cancelled ? <AppointmentStatusBadge status='Cancelled' />
                                     : item.isCompleted ? <AppointmentStatusBadge status='Completed' />
                                     : <AppointmentStatusBadge status='Active' />}
                                    
                                    <PaymentStatusBadge isOnline={item.payment} />
                                </div>

                                {/* Action Buttons */}
                                {!item.cancelled && !item.isCompleted && (
                                    <div className='flex items-center gap-3 mt-3'>
                                        <button 
                                            onClick={() => cancelAppointment(item._id)}
                                            className='flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold
                                                       bg-red-50 text-red-600 hover:bg-red-100 transition-all'
                                            title='Cancel Appointment'
                                        >
                                            <HiOutlineXCircle className='w-5 h-5' /> Cancel
                                        </button>
                                        <button 
                                            onClick={() => completeAppointment(item._id)}
                                            className='flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold
                                                       bg-green-50 text-green-700 hover:bg-green-100 transition-all'
                                            title='Complete Appointment'
                                        >
                                            <HiOutlineCheckCircle className='w-5 h-5' /> Complete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    // --- Empty State ---
                    <div className='text-center text-gray-500 py-20'>
                        <img src={assets.logo} alt="CureQueue" className='w-40 mx-auto opacity-50' />
                        <h2 className='text-xl font-semibold text-gray-700 mt-6'>No Appointments Found</h2>
                        <p className='mt-2'>You do not have any upcoming or past appointments.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DoctorAppointments