import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'
// Using an icon for the 'info' asset for a cleaner look
import { HiInformationCircle } from "react-icons/hi";

const Appointment = () => {

    const { docId } = useParams()
    const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext)
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const [docInfo, setDocInfo] = useState(false)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')

    const navigate = useNavigate()

    const fetchDocInfo = async () => {
        const docInfo = doctors.find((doc) => doc._id === docId)
        setDocInfo(docInfo)
    }

    // --- This is your original, correct logic function ---
    const getAvailableSolts = async () => {
        setDocSlots([])
        let today = new Date()
        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)
            let endTime = new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }
            let timeSlots = [];
            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                let day = currentDate.getDate()
                let month = currentDate.getMonth() + 1
                let year = currentDate.getFullYear()
                const slotDate = day + "_" + month + "_" + year
                const slotTime = formattedTime
                const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true
                if (isSlotAvailable) {
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime
                    })
                }
                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }
            setDocSlots(prev => ([...prev, timeSlots]))
        }
    }

    // --- This is your original, correct logic function ---
    const bookAppointment = async () => {
        if (!token) {
            toast.warning('Login to book appointment')
            return navigate('/login')
        }
        const date = docSlots[slotIndex][0].datetime
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        const slotDate = day + "_" + month + "_" + year
        try {
            const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getDoctosData()
                navigate('/my-appointments')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (doctors.length > 0) {
            fetchDocInfo()
        }
    }, [doctors, docId])

    useEffect(() => {
        if (docInfo) {
            getAvailableSolts()
        }
    }, [docInfo])

    // --- This is the new, refactored JSX ---
    return docInfo ? (
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20'>

            <div className='grid grid-cols-1 md:grid-cols-3 md:gap-8 lg:gap-12'>

                {/* --- Left Column (Image) --- */}
                <div className='md:col-span-1'>
                    <img 
                        className='w-full h-auto md:h-96 object-cover rounded-xl shadow-lg' 
                        src={docInfo.image} 
                        alt={docInfo.name} 
                    />
                </div>

                {/* --- Right Column (Info + Booking) --- */}
                <div className='md:col-span-2'>

                    {/* --- Doctor Info Box --- */}
                    <div className='bg-white border border-gray-200 rounded-xl shadow-lg p-6 mt-6 md:mt-0'>
                        
                        <div className='flex items-center gap-2'>
                            <p className='text-3xl font-bold text-gray-900'>{docInfo.name}</p>
                            <img className='w-6 h-6' src={assets.verified_icon} alt="Verified" />
                        </div>
                        
                        <div className='flex items-center gap-4 mt-2 text-base text-gray-600'>
                            <p>{docInfo.degree} - {docInfo.speciality}</p>
                            <span className='bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full'>
                                {docInfo.experience}
                            </span>
                        </div>
                        
                        <div className='mt-4'>
                            <p className='flex items-center gap-1.5 text-base font-semibold text-gray-900'>
                                <HiInformationCircle className='text-primary text-xl' /> About
                            </p>
                            <p className='text-sm text-gray-600 max-w-2xl mt-1.5 leading-relaxed'>{docInfo.about}</p>
                        </div>

                        <p className='text-primary text-lg font-semibold mt-4'>
                            Appointment fee: <span className='text-gray-900'>{currencySymbol}{docInfo.fees}</span>
                        </p>
                    </div>

                    {/* --- Booking Slots Section --- */}
                    <div className='bg-white border border-gray-200 rounded-xl shadow-lg p-6 mt-8'>
                        <h3 className='text-2xl font-semibold text-gray-900'>Book a slot</h3>
                        
                        {/* --- Day Picker --- */}
                        <div className='mt-4'>
                            <p className='text-base font-medium text-gray-700 mb-3'>1. Select a day</p>
                            <div className='flex gap-3 w-full overflow-x-auto no-scrollbar pb-2'>
                                {docSlots.length && docSlots.map((item, index) => (
                                    <button
                                        onClick={() => setSlotIndex(index)}
                                        key={index}
                                        className={`flex flex-col items-center justify-center min-w-[72px] h-24 rounded-lg
                                                    transition-all duration-200 ease-in-out
                                                    ${slotIndex === index 
                                                        ? 'bg-primary text-white shadow-lg scale-105' 
                                                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                                                    }`}
                                    >
                                        <p className='text-xs font-bold'>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                                        <p className='text-2xl font-semibold'>{item[0] && item[0].datetime.getDate()}</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* --- Time Picker --- */}
                        <div className='mt-6'>
                            <p className='text-base font-medium text-gray-700 mb-3'>2. Select a time</p>
                            <div className='flex flex-wrap gap-3'>
                                {docSlots.length && docSlots[slotIndex].length > 0 ? (
                                    docSlots[slotIndex].map((item, index) => (
                                        <button 
                                            onClick={() => setSlotTime(item.time)} 
                                            key={index}
                                            className={`text-sm font-medium px-4 py-2 rounded-full cursor-pointer
                                                        transition-all duration-200 ease-in-out flex-shrink-0
                                                        ${item.time === slotTime 
                                                            ? 'bg-primary text-white shadow-md' 
                                                            : 'bg-white text-primary border border-primary hover:bg-indigo-50'
                                                        }`}
                                        >
                                            {item.time.toLowerCase()}
                                        </button>
                                    ))
                                ) : (
                                    <p className='text-sm text-gray-500'>No slots available for this day.</p>
                                )}
                            </div>
                        </div>

                        {/* --- Book Button --- */}
                        <button 
                            onClick={bookAppointment}
                            disabled={!slotTime} // Disable button if no time is selected
                            className='w-full sm:w-auto bg-primary text-white text-base font-medium px-10 py-3 rounded-full 
                                       mt-8 shadow-lg transition-all duration-300
                                       hover:bg-opacity-90 hover:shadow-xl
                                       disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed'
                        >
                            Book an appointment
                        </button>
                    </div>
                </div>
            </div>

            {/* --- Related Doctors Section --- */}
            <div className='border-t border-gray-200 mt-16 sm:mt-24 pt-16 sm:pt-24'>
                <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
            </div>
        </div>
    ) : null
}

export default Appointment