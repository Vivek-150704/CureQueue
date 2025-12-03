import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
// Icons for a modern dashboard UI
import { 
    HiOutlineCurrencyRupee, 
    HiOutlineCalendar, 
    HiOutlineUserGroup, 
    HiOutlineCheckCircle, 
    HiOutlineXCircle 
} from "react-icons/hi";

// --- BUG FIX: Define helper functions locally ---
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const currency = '₹'; // Defining currency locally

const slotDateFormat = (slotDate) => {
    if (!slotDate) return "N/A";
    const dateArray = slotDate.split('_')
    // Corrected the month index to be 0-based
    return dateArray[0] + " " + months[Number(dateArray[1]) - 1] + " " + dateArray[2]
}
// --- End Bug Fix ---

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

// --- Reusable "Stat Card" component ---
const StatCard = ({ title, value, icon: Icon }) => (
    <div className='flex items-center gap-5 bg-white p-5 border border-gray-200 rounded-xl shadow-lg
                   transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer'>
        <div className='p-3 bg-indigo-50 rounded-full'>
            <Icon className='w-8 h-8 text-primary' />
        </div>
        <div>
            <p className='text-2xl font-bold text-gray-800'>{value}</p>
            <p className='text-sm text-gray-500'>{title}</p>
        </div>
    </div>
)

const DoctorDashboard = () => {
    const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext)
    // Removed buggy import from AppContext

    useEffect(() => {
        if (dToken) {
            getDashData()
        }
    }, [dToken])

    return dashData && (
        // --- Main Page Wrapper ---
        <div className='p-6 sm:p-8 w-full'>
            
            {/* --- Stat Cards Grid --- */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                <StatCard title="Total Earnings" value={`${currency} ${dashData.earnings}`} icon={HiOutlineCurrencyRupee} />
                <StatCard title="Total Appointments" value={dashData.appointments} icon={HiOutlineCalendar} />
                <StatCard title="Total Patients" value={dashData.patients} icon={HiOutlineUserGroup} />
            </div>

            {/* --- Latest Bookings Card --- */}
            <div className='bg-white border border-gray-200 rounded-xl shadow-lg mt-10'>
                {/* Card Header */}
                <div className='px-6 py-4 border-b border-gray-200'>
                    <p className='text-lg font-semibold text-gray-900'>Latest Bookings</p>
                </div>

                {/* List of Bookings */}
                <div className='flex flex-col'>
                    {dashData.latestAppointments.slice(0, 5).map((item, index) => (
                        // A responsive grid for each list item
                        <div className='grid grid-cols-[auto_1fr_auto] items-center px-6 py-4 gap-4 
                                      border-t border-gray-100 first:border-t-0 hover:bg-gray-50' key={index}>
                            
                            {/* Image */}
                            <img className='rounded-full w-12 h-12 object-cover' src={item.userData.image} alt={item.userData.name} />
                            
                            {/* Info */}
                            <div className='text-sm'>
                                <p className='text-gray-900 font-semibold'>{item.userData.name}</p>
                                <p className='text-gray-600'>Booking on {slotDateFormat(item.slotDate)}</p>
                            </div>

                            {/* Status / Action */}
                            <div className='flex justify-end'>
                                {item.cancelled ? <StatusBadge status='Cancelled' /> 
                                 : item.isCompleted ? <StatusBadge status='Completed' /> 
                                 : (
                                    // Using the same "cool" buttons from DoctorAppointments
                                    <div className='flex items-center gap-2'>
                                        <button 
                                            onClick={() => cancelAppointment(item._id)}
                                            className='flex items-center justify-center w-8 h-8 rounded-full
                                                       text-red-500 bg-red-100 transition-all hover:bg-red-200'
                                            title='Cancel Appointment'
                                        >
                                            <HiOutlineXCircle className='w-5 h-5' />
                                        </button>
                                        <button 
                                            onClick={() => completeAppointment(item._id)}
                                            className='flex items-center justify-center w-8 h-8 rounded-full
                                                       text-green-700 bg-green-100 transition-all hover:bg-green-200'
                                            title='Complete Appointment'
                                        >
                                            <HiOutlineCheckCircle className='w-5 h-5' />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DoctorDashboard