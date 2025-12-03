import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets' // We'll use the logo

const Login = () => {

    const [state, setState] = useState('Sign Up')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const { backendUrl, token, setToken } = useContext(AppContext)

    // --- This logic is perfect, no changes needed ---
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        
        let url = state === 'Sign Up' ? '/api/user/register' : '/api/user/login';
        let payload = state === 'Sign Up' ? { name, email, password } : { email, password };

        try {
            const { data } = await axios.post(backendUrl + url, payload);
            if (data.success) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
                toast.success(`Welcome to CureQueue!`);
                navigate('/');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        }
    }

    useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [token])

    return (
        // --- Main container to center the form on the page ---
        <div className='min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
            
            {/* --- Form Card ---
                - Added 'max-w-md' for a clean, constrained width.
                - Used our standard 'shadow-2xl' for a nice "pop".
            */}
            <form onSubmit={onSubmitHandler} className='w-full max-w-md space-y-6 bg-white p-8 sm:p-10 border border-gray-200 rounded-2xl shadow-2xl'>
                
                {/* --- Header --- */}
                <div className='text-center'>
                    <img className='mx-auto w-40 mb-4' src={assets.logo} alt="CureQueue" />
                    <h2 className='text-3xl font-bold text-gray-900'>
                        {state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}
                    </h2>
                    <p className='mt-2 text-base text-gray-600'>
                        Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointments
                    </p>
                </div>

                {/* --- Input Fields --- */}
                <div className='flex flex-col gap-4'>
                    {state === 'Sign Up' && (
                        <div>
                            <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                                Full Name
                            </label>
                            <input 
                                id='name'
                                onChange={(e) => setName(e.target.value)} 
                                value={name} 
                                className='mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm
                                           focus:outline-none focus:ring-primary focus:border-primary' 
                                type="text" required 
                            />
                        </div>
                    )}
                    <div>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                            Email
                        </label>
                        <input 
                            id='email'
                            onChange={(e) => setEmail(e.target.value)} 
                            value={email} 
                            className='mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm
                                       focus:outline-none focus:ring-primary focus:border-primary' 
                            type="email" required 
                        />
                    </div>
                    <div>
                        <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                            Password
                        </label>
                        <input 
                            id='password'
                            onChange={(e) => setPassword(e.target.value)} 
                            value={password} 
                            className='mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm
                                       focus:outline-none focus:ring-primary focus:border-primary' 
                            type="password" required 
                        />
                    </div>
                </div>

                {/* --- Submit Button --- */}
                <button 
                    type='submit'
                    className='w-full bg-primary text-white py-3 px-4 rounded-lg text-base font-semibold shadow-lg
                               transition-all duration-300 ease-in-out
                               hover:bg-opacity-90 hover:shadow-xl'
                >
                    {state === 'Sign Up' ? 'Create account' : 'Login'}
                </button>

                {/* --- Toggle Link --- */}
                <p className='text-center text-sm text-gray-600'>
                    {state === 'Sign Up'
                        ? <>Already have an account? <span onClick={() => setState('Login')} className='font-medium text-primary hover:underline cursor-pointer'>Login here</span></>
                        : <>Don't have an account? <span onClick={() => setState('Sign Up')} className='font-medium text-primary hover:underline cursor-pointer'>Click here</span></>
                    }
                </p>
            </form>
        </div>
    )
}

export default Login