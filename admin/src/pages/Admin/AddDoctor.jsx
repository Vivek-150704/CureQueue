import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
// Icons for a cleaner UI
import { HiOutlinePhotograph } from 'react-icons/hi'

// --- Reusable Form Input Component ---
const FormInput = ({ label, id, ...props }) => (
    <div>
        <label htmlFor={id} className='block text-sm font-medium text-gray-700 mb-1.5'>
            {label}
        </label>
        <input
            id={id}
            {...props}
            className='w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm
                       focus:outline-none focus:ring-primary focus:border-primary'
        />
    </div>
);

// --- Reusable Form Select Component ---
const FormSelect = ({ label, id, children, ...props }) => (
    <div>
        <label htmlFor={id} className='block text-sm font-medium text-gray-700 mb-1.5'>
            {label}
        </label>
        <select
            id={id}
            {...props}
            className='w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white
                       focus:outline-none focus:ring-primary focus:border-primary'
        >
            {children}
        </select>
    </div>
);

// --- Reusable Form Textarea Component ---
const FormTextarea = ({ label, id, ...props }) => (
    <div>
        <label htmlFor={id} className='block text-sm font-medium text-gray-700 mb-1.5'>
            {label}
        </label>
        <textarea
            id={id}
            {...props}
            className='w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm
                       focus:outline-none focus:ring-primary focus:border-primary'
        />
    </div>
);


const AddDoctor = () => {
    // --- All your state and logic is preserved ---
    const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('General physician')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    const { backendUrl } = useContext(AppContext)
    const { aToken } = useContext(AdminContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {
            if (!docImg) {
                return toast.error('Image Not Selected')
            }
            const formData = new FormData();
            formData.append('image', docImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fees', Number(fees))
            formData.append('about', about)
            formData.append('speciality', speciality)
            formData.append('degree', degree)
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))
            
            const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                setDocImg(false)
                setName('')
                setPassword('')
                setEmail('')
                setAddress1('')
                setAddress2('')
                setDegree('')
                setAbout('')
                setFees('')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    // --- Refactored JSX ---
    return (
        // Main page wrapper with padding
        <div className='p-6 sm:p-8 w-full'>
            <form onSubmit={onSubmitHandler}>
                <p className='mb-6 text-2xl font-semibold text-gray-900'>Add New Doctor</p>

                {/* Main form card */}
                <div className='bg-white p-6 sm:p-8 border border-gray-200 rounded-xl shadow-lg'>
                    
                    {/* --- Image Upload --- */}
                    <label htmlFor="doc-img" className='cursor-pointer'>
                        <div className='w-full border-2 border-dashed border-gray-300 rounded-xl
                                      flex flex-col items-center justify-center p-6 text-center
                                      hover:bg-gray-50 transition-colors'>
                            {docImg ? (
                                <img 
                                    className='w-32 h-32 rounded-full object-cover shadow-md' 
                                    src={URL.createObjectURL(docImg)} 
                                    alt="Doctor Preview" 
                                />
                            ) : (
                                <div className='flex flex-col items-center gap-2 text-gray-500'>
                                    <HiOutlinePhotograph className='w-12 h-12' />
                                    <span className='font-medium'>Upload Doctor's Picture</span>
                                    <span className='text-xs'>Click to browse</span>
                                </div>
                            )}
                        </div>
                        <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden required />
                    </label>

                    {/* --- Responsive 2-Column Grid --- */}
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8'>
                        
                        {/* --- Column 1 --- */}
                        <FormInput label="Doctor's Name" id="name" type="text" placeholder="Dr. John Doe"
                                   onChange={e => setName(e.target.value)} value={name} required />
                        
                        <FormInput label="Doctor Email" id="email" type="email" placeholder="email@example.com"
                                   onChange={e => setEmail(e.target.value)} value={email} required />
                        
                        <FormInput label="Set Password" id="password" type="password" placeholder="••••••••"
                                   onChange={e => setPassword(e.target.value)} value={password} required />

                        <FormInput label="Degree" id="degree" type="text" placeholder="MBBS, MD"
                                   onChange={e => setDegree(e.target.value)} value={degree} required />
                        
                        <FormInput label="Address Line 1" id="address1" type="text" placeholder="Main St"
                                   onChange={e => setAddress1(e.target.value)} value={address1} required />

                        {/* --- Column 2 --- */}
                        <FormSelect label="Speciality" id="speciality"
                                    onChange={e => setSpeciality(e.target.value)} value={speciality}>
                            <option value="General physician">General physician</option>
                            <option value="Gynecologist">Gynecologist</option>
                            <option value="Dermatologist">Dermatologist</option>
                            <option value="Pediatricians">Pediatricians</option>
                            <option value="Neurologist">Neurologist</option>
                            <option value="Gastroenterologist">Gastroenterologist</option>
                        </FormSelect>
                        
                        <FormSelect label="Experience" id="experience"
                                    onChange={e => setExperience(e.target.value)} value={experience}>
                            <option value="1 Year">1 Year</option>
                            <option value="2 Years">2 Years</option>
                            <option value="3 Years">3 Years</option>
                            <option value="4 Years">4 Years</option>
                            <option value="5 Years">5 Years</option>
                            <option value="6 Years">6 Years</option>
                            <option value="8 Years">8 Years</option>
                            <option value="9 Years">9 Years</option>
                            <option value="10 Years">10 Years</option>
                        </FormSelect>

                        <FormInput label="Appointment Fees" id="fees" type="number" placeholder="500"
                                   onChange={e => setFees(e.target.value)} value={fees} required />
                        
                        <div className='lg:h-0'></div> {/* Empty spacer for grid alignment */}

                        <FormInput label="Address Line 2" id="address2" type="text" placeholder="City, State, Zip"
                                   onChange={e => setAddress2(e.target.value)} value={address2} required />

                        {/* --- About (Full Width) --- */}
                        <div className='lg:col-span-2'>
                            <FormTextarea label="About Doctor" id="about" rows={5} placeholder="Write a brief bio..."
                                          onChange={e => setAbout(e.target.value)} value={about} />
                        </div>
                    </div>

                    {/* --- Submit Button --- */}
                    <div className='mt-8 flex justify-end'>
                        <button type='submit' className='bg-primary text-white text-base font-medium px-10 py-3 rounded-full
                                                      shadow-lg transition-all duration-300
                                                      hover:bg-opacity-90 hover:shadow-xl'>
                            Add Doctor
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddDoctor