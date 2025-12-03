import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { HiOutlineInformationCircle } from 'react-icons/hi'

// --- Reusable "Cool" Toggle Switch Component ---
const ToggleSwitch = ({ checked, onChange, disabled = false }) => (
    <label className="relative inline-flex items-center cursor-pointer">
        <input 
            type="checkbox" 
            checked={checked} 
            onChange={onChange} 
            className="sr-only peer"
            disabled={disabled}
        />
        <div className={`w-11 h-6 bg-gray-200 rounded-full 
                        peer-checked:after:translate-x-full 
                        after:content-[''] after:absolute after:top-0.5 after:left-[2px] 
                        after:bg-white after:border after:rounded-full 
                        after:h-5 after:w-5 after:transition-all 
                        peer-checked:bg-primary
                        ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`}
        ></div>
        <span className={`ml-3 text-sm font-medium ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
            {checked ? 'Available' : 'Unavailable'}
        </span>
    </label>
);

// --- Reusable Form Input Component ---
const FormInput = ({ ...props }) => (
    <input
        {...props}
        className='w-full px-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm
                   focus:outline-none focus:ring-primary focus:border-primary'
    />
);

// --- Reusable Form Textarea Component ---
const FormTextarea = ({ ...props }) => (
    <textarea
        {...props}
        className='w-full px-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm
                   focus:outline-none focus:ring-primary focus:border-primary'
    />
);


const DoctorProfile = () => {
    const { dToken, profileData, getProfileData } = useContext(DoctorContext)
    const { currency, backendUrl } = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false)

    // --- LOGIC FIX: Use local state for edits ---
    const [formData, setFormData] = useState(profileData || null)

    useEffect(() => {
        if (dToken) {
            getProfileData()
        }
    }, [dToken])

    // Sync context data to local form data when it loads or changes
    useEffect(() => {
        if (profileData) {
            setFormData(profileData)
        }
    }, [profileData])

    // Handlers to update local state
    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }))
    }
    const onAddressChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            address: { ...prev.address, [name]: value }
        }))
    }
    const onAvailableChange = () => {
        setFormData(prev => ({ ...prev, available: !prev.available }))
    }

    // "Cancel" button reverts local changes
    const cancelEdit = () => {
        setIsEdit(false)
        setFormData(profileData) // Reset to original data
    }

    // --- Updated to use local formData ---
    const updateProfile = async () => {
        try {
            const updateData = {
                address: formData.address,
                fees: formData.fees,
                about: formData.about,
                available: formData.available
            }
            const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                setIsEdit(false)
                getProfileData() // Re-fetch data, which will update context & local state
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    // --- Refactored JSX ---
    return formData && (
        // --- Main Page Wrapper ---
        <div className='p-6 sm:p-8 w-full'>
            <p className='mb-6 text-2xl font-semibold text-gray-900'>My Profile</p>

            {/* --- 2-Column Dashboard Layout --- */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                
                {/* --- Left Column (Image + Static Info) --- */}
                <div className='lg:col-span-1 flex flex-col gap-6'>
                    <img className='w-full rounded-xl shadow-lg object-cover' src={formData.image} alt={formData.name} />
                    <div className='bg-white border border-gray-200 rounded-xl shadow-lg p-6'>
                        <p className='text-2xl font-bold text-gray-900'>{formData.name}</p>
                        <p className='text-base text-primary font-medium mt-1'>{formData.speciality}</p>
                        <p className='text-sm text-gray-600 mt-2'>{formData.degree}</p>
                        <span className='inline-block bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full mt-3'>
                            {formData.experience}
                        </span>
                    </div>
                </div>

                {/* --- Right Column (Editable Info Card) --- */}
                <div className='lg:col-span-2 bg-white border border-gray-200 rounded-xl shadow-lg p-6'>
                    
                    <div className='flex flex-col gap-6'>
                        {/* --- About Section --- */}
                        <div>
                            <label className='flex items-center gap-1.5 text-base font-semibold text-gray-900 mb-2'>
                                <HiOutlineInformationCircle className='text-primary text-xl' /> About
                            </label>
                            {isEdit ? (
                                <FormTextarea 
                                    name="about"
                                    rows={8}
                                    onChange={onChangeHandler}
                                    value={formData.about}
                                />
                            ) : (
                                <p className='text-sm text-gray-600 leading-relaxed'>{formData.about}</p>
                            )}
                        </div>

                        {/* --- Fees --- */}
                        <div>
                            <label htmlFor="fees" className='block text-base font-semibold text-gray-900 mb-2'>
                                Appointment Fee
                            </label>
                            {isEdit ? (
                                <div className='relative'>
                                    <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500'>{currency}</span>
                                    <FormInput
                                        id="fees"
                                        name="fees"
                                        type="number"
                                        className="pl-8" // Add padding for the currency symbol
                                        onChange={onChangeHandler}
                                        value={formData.fees}
                                    />
                                </div>
                            ) : (
                                <p className='text-sm text-gray-600'>{currency} {formData.fees}</p>
                            )}
                        </div>

                        {/* --- Address --- */}
                        <div>
                            <label className='block text-base font-semibold text-gray-900 mb-2'>
                                Address
                            </label>
                            {isEdit ? (
                                <div className='flex flex-col gap-3'>
                                    <FormInput 
                                        name="line1"
                                        placeholder='Address Line 1'
                                        onChange={onAddressChange}
                                        value={formData.address.line1}
                                    />
                                    <FormInput 
                                        name="line2"
                                        placeholder='Address Line 2 (City, State)'
                                        onChange={onAddressChange}
                                        value={formData.address.line2}
                                    />
                                </div>
                            ) : (
                                <p className='text-sm text-gray-600'>
                                    {formData.address.line1} <br/> {formData.address.line2}
                                </p>
                            )}
                        </div>

                        {/* --- Availability Toggle --- */}
                        <div>
                            <label className='block text-base font-semibold text-gray-900 mb-2'>
                                Availability
                            </label>
                            <ToggleSwitch
                                checked={formData.available}
                                onChange={isEdit ? onAvailableChange : () => {}} // Only allow change in edit mode
                                disabled={!isEdit}
                            />
                        </div>

                        {/* --- Action Buttons --- */}
                        <div className='mt-4 pt-6 border-t border-gray-200 flex justify-end gap-3'>
                            {isEdit ? (
                                <>
                                    <button 
                                        onClick={cancelEdit} 
                                        className='bg-white text-gray-700 border border-gray-300 font-semibold px-6 py-2.5 rounded-full
                                                   transition-all duration-300 ease-in-out
                                                   hover:bg-gray-100'
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        onClick={updateProfile} 
                                        className='bg-primary text-white font-semibold px-6 py-2.5 rounded-full
                                                   transition-all duration-300 ease-in-out
                                                   hover:bg-opacity-90 hover:shadow-lg'
                                    >
                                        Save Changes
                                    </button>
                                </>
                            ) : (
                                <button 
                                    onClick={() => setIsEdit(true)} 
                                    className='bg-white text-primary border border-primary font-semibold px-6 py-2.5 rounded-full
                                               transition-all duration-300 ease-in-out
                                               hover:bg-primary hover:text-white hover:shadow-lg'
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorProfile