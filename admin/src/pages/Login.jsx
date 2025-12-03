import axios from 'axios'
import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom' // Import useNavigate
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets' // Import assets for the logo

// --- Reusable Form Input Component ---
const FormInput = ({ label, id, ...props }) => (
    <div>
        <label htmlFor={id} className='block text-sm font-medium text-gray-700 mb-1.5'>
            {label}
        </label>
        <input
            id={id}
            {...props}
            className='w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm
                       focus:outline-none focus:ring-primary focus:border-primary'
        />
    </div>
);

const Login = () => {

    const [state, setState] = useState('Admin')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate() // Initialize navigate

    const { dToken, setDToken } = useContext(DoctorContext)
    const { aToken, setAToken } = useContext(AdminContext)

    // --- Refactored login logic ---
    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const url = state === 'Admin' 
            ? '/api/admin/login' 
            : '/api/doctor/login';
        
        try {
            const { data } = await axios.post(backendUrl + url, { email, password });

            if (data.success) {
                if (state === 'Admin') {
                    setAToken(data.token);
                    localStorage.setItem('aToken', data.token);
                    toast.success('Admin login successful!');
                    navigate('/admin-dashboard'); // Redirect admin
                } else {
                    setDToken(data.token);
                    localStorage.setItem('dToken', data.token);
                    toast.success('Doctor login successful!');
                    navigate('/doctor-dashboard'); // Redirect doctor
                }
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
            console.log(error);
        }
    }

    // --- Redirect if already logged in ---
    useEffect(() => {
        if (aToken) {
            navigate('/admin-dashboard');
        } else if (dToken) {
            navigate('/doctor-dashboard');
        }
    }, [aToken, dToken, navigate])

    return (
        // --- Main container to center the form ---
        <div className='min-h-[90vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50'>
            
            {/* --- Form Card --- */}
            <form onSubmit={onSubmitHandler} className='w-full max-w-md space-y-6 bg-white p-8 sm:p-10 border border-gray-200 rounded-2xl shadow-2xl'>
                
                {/* --- Header --- */}
                <div className='text-center'>
                    <img className='mx-auto w-40 mb-4' src={assets.admin_logo} alt="CureQueue Admin" />
                    <h2 className='text-3xl font-bold text-gray-900'>
                        <span className='text-primary'>{state}</span> Login
                    </h2>
                </div>

                {/* --- Input Fields --- */}
                <div className='flex flex-col gap-4'>
                    <FormInput 
                        label="Email" 
                        id="email" 
                        type="email" 
                        placeholder="email@example.com"
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email} 
                        required 
                    />
                    <FormInput 
                        label="Password" 
                        id="password" 
                        type="password" 
                        placeholder="••••••••"
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password} 
                        required 
                    />
                </div>

                {/* --- Submit Button --- */}
                <button 
                    type='submit'
                    className='w-full bg-primary text-white py-3 px-4 rounded-lg text-base font-semibold shadow-lg
                               transition-all duration-300 ease-in-out
                               hover:bg-opacity-90 hover:shadow-xl'
                >
                    Login
                </button>

                {/* --- Toggle Link --- */}
                <p className='text-center text-sm text-gray-600'>
                    {state === 'Admin'
                        ? <>Login as a Doctor? <span onClick={() => setState('Doctor')} className='font-medium text-primary hover:underline cursor-pointer'>Click here</span></>
                        : <>Login as an Admin? <span onClick={() => setState('Admin')} className='font-medium text-primary hover:underline cursor-pointer'>Click here</span></>
                    }
                </p>
            </form>
        </div>
    )
}

export default Login