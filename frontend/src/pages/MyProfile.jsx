import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
// Icons for a much cleaner UI
import { HiPencil } from "react-icons/hi";

// Helper component for a consistent, styled input
const ProfileInput = ({ label, id, ...props }) => (
    <div className='md:col-span-2'>
        <label htmlFor={id} className='block text-sm font-medium text-gray-700 mb-1'>
            {label}
        </label>
        <input
            id={id}
            {...props}
            className='w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm
                       focus:outline-none focus:ring-primary focus:border-primary
                       disabled:bg-gray-50 disabled:cursor-not-allowed'
        />
    </div>
);

// Helper for a styled <select>
const ProfileSelect = ({ label, id, children, ...props }) => (
    <div className='md:col-span-2'>
        <label htmlFor={id} className='block text-sm font-medium text-gray-700 mb-1'>
            {label}
        </label>
        <select
            id={id}
            {...props}
            className='w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm
                       focus:outline-none focus:ring-primary focus:border-primary'
        >
            {children}
        </select>
    </div>
);

// Helper for a consistent view field
const ProfileViewField = ({ label, value }) => (
    <>
        <dt className='text-sm font-medium text-gray-600'>{label}</dt>
        <dd className='text-sm text-gray-900 md:col-span-2'>{value}</dd>
    </>
);

const MyProfile = () => {

    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)
    const { token, backendUrl, userData, loadUserProfileData } = useContext(AppContext)
    
    // --- CRUCIAL LOGIC UPGRADE ---
    // Use local state for the form. This allows the user to "Cancel" edits.
    const [formData, setFormData] = useState(userData || {})

    // Update local form data when the main userData context changes
    useEffect(() => {
        if (userData) {
            setFormData(userData)
        }
    }, [userData])

    // Handle all text input changes
    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    // Handle address changes (nested object)
    const onAddressChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            address: { ...prev.address, [name]: value }
        }))
    }

    // --- Your original function, now using local 'formData' ---
    const updateUserProfileData = async () => {
        try {
            const data = new FormData();
            data.append('name', formData.name)
            data.append('phone', formData.phone)
            data.append('address', JSON.stringify(formData.address))
            data.append('gender', formData.gender)
            data.append('dob', formData.dob)
            image && data.append('image', image)

            const { data: responseData } = await axios.post(backendUrl + '/api/user/update-profile', data, { headers: { token } })

            if (responseData.success) {
                toast.success(responseData.message)
                await loadUserProfileData() // Reloads context, which triggers useEffect to update local state
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(responseData.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Handle "Cancel" button click
    const cancelEdit = () => {
        setIsEdit(false);
        setFormData(userData); // Revert all local changes back to the original userData
        setImage(false);
    }

    // --- Refactored JSX ---
    return userData ? (
        <div className='min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
            <div className='w-full max-w-2xl bg-white p-8 sm:p-10 border border-gray-200 rounded-2xl shadow-2xl'>
                
                {/* --- Image Upload --- */}
                <div className='flex justify-center'>
                    <label htmlFor='image' className={`relative w-36 h-36 ${isEdit ? 'cursor-pointer' : ''}`}>
                        <img 
                            className='w-full h-full rounded-full object-cover border-4 border-gray-100 shadow-md' 
                            src={image ? URL.createObjectURL(image) : formData.image || assets.profile_placeholder} 
                            alt="Profile" 
                        />
                        {isEdit && (
                            <div className='absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-2.5
                                          border-4 border-white transition-transform hover:scale-110'>
                                <HiPencil className='w-5 h-5' />
                            </div>
                        )}
                        <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden disabled={!isEdit} />
                    </label>
                </div>

                {/* --- Name --- */}
                <div className='text-center mt-6'>
                    {isEdit ? (
                        <input 
                            className='w-full max-w-sm mx-auto text-3xl font-bold text-gray-900 text-center p-2
                                       border border-gray-300 rounded-lg shadow-sm
                                       focus:outline-none focus:ring-primary focus:border-primary' 
                            type="text" 
                            name="name"
                            onChange={onChangeHandler} 
                            value={formData.name} 
                        />
                    ) : (
                        <p className='font-bold text-3xl text-gray-900 mt-4'>{formData.name}</p>
                    )}
                </div>

                {/* --- Contact Information --- */}
                <div className='border-t border-gray-200 mt-8 pt-8'>
                    <h2 className='text-lg font-semibold text-gray-900'>Contact Information</h2>
                    <dl className='grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-6 mt-6'>
                        {isEdit ? (
                            <>
                                <ProfileViewField label="Email id:" value={formData.email} />
                                <ProfileInput label="Phone:" id="phone" name="phone" type="text" onChange={onChangeHandler} value={formData.phone} />
                                <ProfileInput label="Address Line 1:" id="line1" name="line1" type="text" onChange={onAddressChange} value={formData.address.line1} />
                                <ProfileInput label="Address Line 2:" id="line2" name="line2" type="text" onChange={onAddressChange} value={formData.address.line2} />
                            </>
                        ) : (
                            <>
                                <ProfileViewField label="Email id:" value={formData.email} />
                                <ProfileViewField label="Phone:" value={formData.phone} />
                                <ProfileViewField label="Address:" value={`${formData.address.line1}, ${formData.address.line2}`} />
                            </>
                        )}
                    </dl>
                </div>

                {/* --- Basic Information --- */}
                <div className='border-t border-gray-200 mt-8 pt-8'>
                    <h2 className='text-lg font-semibold text-gray-900'>Basic Information</h2>
                    <dl className='grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-6 mt-6'>
                        {isEdit ? (
                            <>
                                <ProfileSelect label="Gender:" id="gender" name="gender" onChange={onChangeHandler} value={formData.gender}>
                                    <option value="Not Selected">Not Selected</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </ProfileSelect>
                                <ProfileInput label="Birthday:" id="dob" name="dob" type="date" onChange={onChangeHandler} value={formData.dob} />
                            </>
                        ) : (
                            <>
                                <ProfileViewField label="Gender:" value={formData.gender} />
                                <ProfileViewField label="Birthday:" value={formData.dob} />
                            </>
                        )}
                    </dl>
                </div>
                
                {/* --- Action Buttons --- */}
                <div className='mt-8 pt-8 border-t border-gray-200 flex justify-end gap-3'>
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
                                onClick={updateUserProfileData} 
                                className='bg-primary text-white font-semibold px-6 py-2.5 rounded-full
                                           transition-all duration-300 ease-in-out
                                           hover:bg-opacity-90 hover:shadow-lg'
                            >
                                Save
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
    ) : null // Show nothing if userData isn't loaded
}

export default MyProfile